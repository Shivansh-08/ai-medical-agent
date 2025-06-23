import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/config/db";// assuming you have db setup with something like Kysely or Drizzle
import { sessionChatTable } from "@/config/schema"; // assuming this is your table schema
import { currentUser } from "@clerk/nextjs/server"; // or your own auth
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();
  const user = await currentUser();

  try {
    const sessionId = uuidv4();

    const result = await db.insert(sessionChatTable).values({
      sessionId: sessionId,
      createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
      notes: notes,
      selectedDoctor: selectedDoctor,
      createdOn: new Date().toString(),
    })
    // @ts-ignore
    .returning({ sessionChatTable });

    return NextResponse.json(result[0]?.sessionChatTable);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // 1. Get sessionId from URL params
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    
    // 2. Validate sessionId exists
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' }, 
        { status: 400 }
      );
    }

    // 3. Get current user (await the function call)
    const user = await currentUser();
    
    // 4. Optional: Check if user is authenticated
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // 5. Query database
    const result = await db
      .select()
      .from(sessionChatTable)
      .where(eq(sessionChatTable.sessionId, sessionId));

    // 6. Handle case where no session is found
    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: 'Session not found' }, 
        { status: 404 }
      );
    }

    // 7. Return the session data
    return NextResponse.json(result[0]);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}