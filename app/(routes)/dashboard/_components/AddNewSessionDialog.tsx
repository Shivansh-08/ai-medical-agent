"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import type { doctorAgent } from "./SuggestedDoctorCard";

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent | null>(null);
  const [step, setStep] = useState<"symptoms" | "doctors">("symptoms");
  const router = useRouter();

  const onClickNext = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/suggest-doctors", {
        notes: note,
      });
      setSuggestedDoctors(result.data);
      setStep("doctors"); // Move to doctor selection step
    } catch (error) {
      console.error("Error suggesting doctors:", error);
    }
    setLoading(false);
  };

  const onStartConsultation = async () => {
    if (!selectedDoctor) return;
    setLoading(true);
    try {
      const result = await axios.post("/api/session-chat", {
        notes: note,
        selectedDoctor: selectedDoctor,
      });

      if (result.data?.sessionId) {
        router.push('/dashboard/medical-agent/' + result.data.sessionId);
      }
    } catch (error) {
      console.error("Error starting consultation:", error);
    }
    setLoading(false);
  };

  const resetDialog = () => {
    setStep("symptoms");
    setNote("");
    setSuggestedDoctors([]);
    setSelectedDoctor(null);
    setLoading(false);
  };

  return (
    <div>
      <Dialog onOpenChange={(open) => !open && resetDialog()}>
        <DialogTrigger asChild>
          <Button className="mt-3">+ Start a Consultation</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Basic Details</DialogTitle>
            <DialogDescription>
              {step === "symptoms" 
                ? "Add Symptoms or Any Other Details"
                : "Select the doctor"
              }
            </DialogDescription>
          </DialogHeader>

          {/* Step 1: Symptoms Input */}
          {step === "symptoms" && (
            <>
              <div className="mt-4">
                <Textarea
                  placeholder="Add Detail here"
                  className="h-[200px] text-lg text-blue-800"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  disabled={!note.trim() || loading}
                  onClick={onClickNext}
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}

          {/* Step 2: Doctor Selection */}
          {step === "doctors" && (
            <>
              {/* Doctor Selection Cards */}
              {suggestedDoctors.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {suggestedDoctors.map((doctor) => (
                    <SuggestedDoctorCard
                      key={doctor.id}
                      doctorAgent={doctor}
                      selectedDoctor={selectedDoctor}
                      setSelectedDoctor={setSelectedDoctor}
                    />
                  ))}
                </div>
              )}

              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  disabled={!selectedDoctor || loading}
                  onClick={onStartConsultation}
                  
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                  Start Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewSessionDialog;