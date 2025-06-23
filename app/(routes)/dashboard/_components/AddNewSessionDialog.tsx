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
import { ArrowRight } from "lucide-react";

import React, { useState } from "react";

function AddNewSessionDialog() {
    const [note,setNote] =useState<String>();
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
            <Button className='mt-3'>+ Start a Consultation</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Basic Details</DialogTitle>
            <DialogDescription asChild>
              <div>
                    <h2>Add Symptoms or Any Other Details </h2>
                    <Textarea placeholder="Add Detail here" className="h-[200px] mt-1 text-3xl text-blue-800" onChange ={(e)=>setNote(e.target.value)} />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant={'outline'}>Cancel</Button>
            </DialogClose>
            
            <Button disabled={!note}>Next <ArrowRight/></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewSessionDialog;
