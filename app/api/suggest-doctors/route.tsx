import { NextRequest, NextResponse } from "next/server";
import { AIDoctorAgents } from "@/shared/list"; // ✅ Change the path if needed

// Keywords mapped to specialists
const keywordMap: Record<string, string> = {
  heart: "Cardiologist",
  skin: "Dermatologist",
  mental: "Psychologist",
  diet: "Nutritionist",
  teeth: "Dentist",
  tooth: "Dentist",
  ear: "ENT Specialist",
  throat: "ENT Specialist",
  bone: "Orthopedic",
  joint: "Orthopedic",
  pain: "Orthopedic",
  period: "Gynecologist",
  pregnancy: "Gynecologist",
  child: "Pediatrician",
  baby: "Pediatrician"
};

// POST method handler
export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  if (!notes || typeof notes !== "string") {
    return NextResponse.json({ error: "Invalid note provided." }, { status: 400 });
  }

  // Always suggest General Physician
  const suggestions = [
    AIDoctorAgents.find(agent => agent.specialist === "General Physician")!
  ];

  // Match specialist based on note
  const lowerCaseNote = notes.toLowerCase();
  const matchedKeyword = Object.keys(keywordMap).find(keyword =>
    lowerCaseNote.includes(keyword)
  );

  if (matchedKeyword) {
    const matchedSpecialist = keywordMap[matchedKeyword];
    const specialistDoctor = AIDoctorAgents.find(agent =>
      agent.specialist === matchedSpecialist
    );
    if (specialistDoctor) {
      suggestions.push(specialistDoctor);
    }
  }

  // Return doctor suggestions
  return NextResponse.json(suggestions);
}
