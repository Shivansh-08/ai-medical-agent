import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { sessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on the doctor AI Agent info and Conversation between AI Medical agent and user, generate a structured report.

CRITICAL: You must respond with ONLY valid JSON. No markdown, no explanations, no additional text.

Required JSON format:
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

Fields explanation:
- sessionId: unique session identifier
- agent: medical specialist name (e.g., "General Physician AI")
- user: patient name or "Anonymous" if not provided
- timestamp: current date and time in ISO format
- chiefComplaint: one-sentence summary of main health concern
- summary: 2-3 sentence summary of conversation, symptoms, and recommendations
- symptoms: array of symptoms mentioned by user
- duration: how long user has experienced symptoms
- severity: "mild", "moderate", or "severe"
- medicationsMentioned: array of any medicines mentioned
- recommendations: array of AI suggestions

Respond with ONLY the JSON object. No markdown code blocks, no explanations.`;

// Helper function to extract JSON from potentially malformed response
function extractJSON(text: string): string {
  // Remove markdown code blocks
  let cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '');
  
  // Remove any text before the first {
  const startIndex = cleaned.indexOf('{');
  if (startIndex !== -1) {
    cleaned = cleaned.substring(startIndex);
  }
  
  // Remove any text after the last }
  const endIndex = cleaned.lastIndexOf('}');
  if (endIndex !== -1) {
    cleaned = cleaned.substring(0, endIndex + 1);
  }
  
  return cleaned.trim();
}

// Helper function to validate JSON structure
function validateReportJSON(obj: any): boolean {
  const requiredFields = [
    'sessionId', 'agent', 'user', 'timestamp', 
    'chiefComplaint', 'summary', 'symptoms', 
    'duration', 'severity', 'medicationsMentioned', 'recommendations'
  ];
  
  return requiredFields.every(field => field in obj);
}

// Fallback report generator
function generateFallbackReport(sessionId: string, sessionDetail: any, messages: any[]): any {
  return {
    sessionId: sessionId,
    agent: sessionDetail?.agent || "Medical AI Assistant",
    user: sessionDetail?.user || "Anonymous",
    timestamp: new Date().toISOString(),
    chiefComplaint: "Unable to parse conversation details",
    summary: "The conversation could not be properly analyzed due to technical issues.",
    symptoms: [],
    duration: "Not specified",
    severity: "Unknown",
    medicationsMentioned: [],
    recommendations: ["Please consult with a healthcare professional", "Technical issue occurred during report generation"]
  };
}

export async function POST(req: NextRequest) {
  console.log("📩 API HIT: /api/medical-report");

  try {
    // Parse request body with error handling
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { sessionDetail, sessionId, messages } = requestBody;

    // Validate required fields
    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    console.log("📦 Received payload:", {
      sessionId,
      sessionDetail,
      messagesLength: messages.length,
    });

    const UserInput = `AI Doctor Agent Info: ${JSON.stringify(sessionDetail)}, Conversation: ${JSON.stringify(messages)}`;
    console.log("✉️ Sending request to DeepSeek R1 via OpenRouter...");

    try {
      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-r1:free",
        messages: [
          { role: "system", content: REPORT_GEN_PROMPT },
          { role: "user", content: UserInput },
        ],
        temperature: 0.3, // Lower temperature for more consistent JSON output
        max_tokens: 1000,
      });

      console.log("✅ Got OpenRouter completion.");

      const rawResp = completion.choices[0]?.message?.content;
      
      if (!rawResp) {
        throw new Error("Empty response from AI model");
      }

      console.log("🔍 Raw AI response:", rawResp);

      // Extract and clean JSON
      const cleanedResp = extractJSON(rawResp);
      console.log("🧹 Cleaned JSON string:", cleanedResp);

      // Validate JSON before parsing
      if (!cleanedResp.startsWith('{') || !cleanedResp.endsWith('}')) {
        throw new Error("Response is not valid JSON format");
      }

      let JSONResp;
      try {
        JSONResp = JSON.parse(cleanedResp);
      } catch (jsonError) {
        console.error("❌ JSON Parse Error:", jsonError);
        console.error("❌ Problematic JSON string:", cleanedResp);
        
        // Use fallback report
        console.log("🔄 Using fallback report generation...");
        JSONResp = generateFallbackReport(sessionId, sessionDetail, messages);
      }

      // Validate report structure
      if (!validateReportJSON(JSONResp)) {
        console.log("⚠️ Invalid report structure, using fallback...");
        JSONResp = generateFallbackReport(sessionId, sessionDetail, messages);
      }

      // Ensure sessionId matches
      JSONResp.sessionId = sessionId;
      JSONResp.timestamp = new Date().toISOString();

      console.log("📊 Final report object:", JSONResp);

      // Save to database
      const result = await db
        .update(sessionChatTable)
        .set({
          report: JSONResp,
          conversation: messages,
        })
        .where(eq(sessionChatTable.sessionId, sessionId));

      console.log("💾 Report successfully saved to DB.");
      return NextResponse.json(JSONResp);

    } catch (aiError) {
      console.error("❌ AI/OpenRouter Error:", aiError);
      
      // Generate fallback report for AI errors
      const fallbackReport = generateFallbackReport(sessionId, sessionDetail, messages);
      
      // Still save the fallback to database
      await db
        .update(sessionChatTable)
        .set({
          report: fallbackReport,
          conversation: messages,
        })
        .where(eq(sessionChatTable.sessionId, sessionId));

      return NextResponse.json(fallbackReport);
    }

  } catch (error: any) {
    console.error("❌ Unexpected error in /api/medical-report:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error?.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}
