"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type messages = {
  role: string;
  text: string;
};

const MedicalAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [sessionLoading, setSessionLoading] = useState(true);
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRole, setCurrentRole] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    setSessionLoading(true);
    try {
      const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
      console.log("🔍 Session Details:", result.data);
      setSessionDetail(result.data);
    } catch (error) {
      console.error("❌ Error fetching session details:", error);
      toast.error("Failed to load session details");
    } finally {
      setSessionLoading(false);
    }
  };

  const StartCall = () => {
    // ✅ Add validation to ensure sessionDetail is loaded
    if (!sessionDetail || !sessionDetail.selectedDoctor) {
      console.error("❌ Session details not loaded yet");
      toast.error("Please wait for session to load");
      return;
    }
      
       setLoading(true);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);

    // ✅ Attach listeners BEFORE starting the call
    vapi.on("call-start", () => {
      console.log("📞 Call started");
      setCallStarted(true);
      setLoading(false);
    });

    vapi.on("call-end", () => {
      console.log("🔚 Call ended");
      setCallStarted(false);
    });

    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
        console.log(`${role}: ${transcript}`);
        if (transcriptType === "partial") {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType === "final") {
          setMessages((prev: any) => [...prev, { role, text: transcript }]);
          setLiveTranscript("");
          setCurrentRole(null);
        }
      }
    });

    vapi.on("speech-start", () => {
      console.log("🗣️ Assistant started speaking");
      setCurrentRole("assistant");
    });

    vapi.on("speech-end", () => {
      console.log("🛑 Assistant stopped speaking");
      setCurrentRole("user");
    });

    setVapiInstance(vapi);

    const VapiAgentConfig = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. I'm here to help you with any health questions or concerns you might have today. How are you feeling?",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "playht",
        voiceId: sessionDetail.selectedDoctor.voiceId, // ✅ Now guaranteed to exist
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: sessionDetail.selectedDoctor.agentPrompt, // ✅ Now guaranteed to exist
          },
        ],
      },
    };

    console.log("🚀 Starting call with config:", VapiAgentConfig);
    
    //@ts-ignore
    vapi.start(VapiAgentConfig);
  };

  const endCall = async () => {
    setLoading(true);
    try {
      const result = await GenerateReport();
      console.log("📄 Report generated:", result);
    } catch (err) {
      console.error("❌ Report generation failed:", err);
    }

    if (!vapiInstance) {
      setLoading(false);
      return;
    }

    try {
      vapiInstance.off?.("call-start");
      vapiInstance.off?.("call-end");
      vapiInstance.off?.("message");
      vapiInstance.off?.("speech-start");
      vapiInstance.off?.("speech-end");
      vapiInstance.stop?.(); // ✅ Actually stop the call

      vapiInstance.destroy?.(); 
    } catch (err) {
      console.warn("Error while removing listeners", err);
    }

    setCallStarted(false);
    setVapiInstance(null);
    setLoading(false);

    toast.success('Your report is generated!');
    router.replace('/dashboard');
  };

  const GenerateReport = async () => {
    console.log("📤 Calling /api/medical-report...");
    try {
      const result = await axios.post("/api/medical-report", {
        messages,
        sessionDetail,
        sessionId,
      });
      console.log("✅ Report Generated:", result.data);
      return result.data;
    } catch (error) {
      console.error("❌ Report generation error:", error);
      throw error;
    }
  };

  // Show loading state while session is loading
  if (sessionLoading) {
    return (
      <div className="p-5 border rounded-3xl bg-secondary">
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin h-8 w-8" />
          <span className="ml-2">Loading session details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected..." : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

      {sessionDetail && (
        <div className="flex items-center flex-col mt-10">
          <Image
            src={sessionDetail.selectedDoctor.image}
            alt={sessionDetail.selectedDoctor.specialist}
            width={120}
            height={120}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className="mt-2 text-lg">{sessionDetail.selectedDoctor.specialist}</h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages.slice(-4).map((msg, index) => (
              <h2 className="text-gray-400 p-2" key={index}>
                {msg.role}: {msg.text}
              </h2>
            ))}
            {liveTranscript && liveTranscript.length > 0 && (
              <h2 className="text-lg">{currentRole}: {liveTranscript}</h2>
            )}
          </div>

          {!callStarted ? (
            <Button 
              className="mt-20" 
              onClick={StartCall} 
              disabled={loading || !sessionDetail || sessionLoading}
            >
              {loading ? <Loader className="animate-spin" /> : <PhoneCall />}
              Start Call
            </Button>
          ) : (
            <Button variant={"destructive"} onClick={endCall} disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : <PhoneOff />}
              Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalAgent;