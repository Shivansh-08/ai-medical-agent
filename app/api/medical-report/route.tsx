import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel"; // Make sure this uses OpenRouter
import { sessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on the doctor AI Agent info and Conversation between AI Medical agent and user, generate a structured report with the following fields:

sessionId: a unique session identifier
agent: the medical specialist name (e.g., "General Physician AI")
user: name of the patient or "Anonymous" if not provided
timestamp: current date and time in ISO format
chiefComplaint: one-sentence summary of the main health concern
summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
symptoms: list of symptoms mentioned by the user
duration: how long the user has experienced the symptoms
severity: mild, moderate, or severe
medicationsMentioned: list of any medicines mentioned
recommendations: list of AI suggestions (e.g., rest, see a doctor)

Return the result in this JSON format:
{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}
Only include valid fields. Respond with nothing else.`;

export async function POST(req: NextRequest) {
  console.log("📩 API HIT: /api/medical-report");

  try {
    const { sessionDetail, sessionId, messages } = await req.json();
    console.log("📦 Received payload:", {
      sessionId,
      sessionDetail,
      messagesLength: messages.length,
    });

    const UserInput = `AI Doctor Agent Info: ${JSON.stringify(sessionDetail)}, Conversation: ${JSON.stringify(messages)}`;
    console.log("✉️ Sending request to DeepSeek R1 via OpenRouter...");

    const completion = await openai.chat.completions.create({
      model: "google/gemini-pro", 
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        { role: "user", content: UserInput },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log("✅ Got OpenRouter completion.");

    const rawResp = completion.choices[0].message;

    //@ts-ignore
    const Resp = rawResp.content.trim().replace("```json", "").replace("```", "");
    console.log("🧪 Raw JSON string:", Resp);

    const JSONResp = JSON.parse(Resp);
    console.log("📊 Parsed report object:", JSONResp);

    const result = await db
      .update(sessionChatTable)
      .set({
        report: JSONResp,
        conversation: messages,
      })
      .where(eq(sessionChatTable.sessionId, sessionId));

    console.log("💾 Report successfully saved to DB.");
    return NextResponse.json(JSONResp);
  } catch (error: any) {
    console.error("❌ Error in /api/medical-report:", error?.toString() || error);
    return NextResponse.json(
      { error: error?.toString() || "Unknown error" },
      { status: 500 }
    );
  }
}
