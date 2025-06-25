import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";

type props={
    record:SessionDetail
}

function ViewReportDialog({ record }: props) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant={'link'} size={'sm'}>View Report</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="relative">
            <DialogTitle asChild>
              <div className="flex items-center justify-center relative">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <h2 className="text-center text-2xl font-semibold text-blue-600">
                    Medical AI Voice Agent Report
                  </h2>
                </div>
              </div>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="mt-6 space-y-6">
                {/* Session Info */}
                <div>
                  <h2 className="font-bold text-blue-500 text-lg border-b-2 border-blue-200 pb-1 mb-3">
                    Session Info
                  </h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-bold text-gray-700">Doctor:</span>
                      <span className="ml-2 text-gray-600">{record.selectedDoctor.specialist}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700">User:</span>
                      <span className="ml-2 text-gray-600">{(record as any).report?.user || 'Anonymous'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700">Consulted On:</span>
                      <span className="ml-2 text-gray-600">
                        {moment(new Date(record.createdOn)).format('MMMM Do YYYY, h:mm a')}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700">Agent:</span>
                      <span className="ml-2 text-gray-600">{(record as any).selectedDoctor.specialist} AI</span>
                    </div>
                  </div>
                </div>

                {/* Chief Complaint */}
                <div>
                  <h2 className="font-bold text-blue-500 text-lg border-b-2 border-blue-200 pb-1 mb-3">
                    Chief Complaint
                  </h2>
                  <p className="text-gray-700">{(record as any).report?.chiefComplaint}</p>
                </div>

                {/* Summary */}
                <div>
                  <h2 className="font-bold text-blue-500 text-lg border-b-2 border-blue-200 pb-1 mb-3">
                    Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{(record as any).report?.summary}</p>
                </div>

                {/* Symptoms */}
                <div>
                  <h2 className="font-bold text-blue-500 text-lg border-b-2 border-blue-200 pb-1 mb-3">
                    Symptoms
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    {(record as any).report?.symptoms?.map((symptom:any, index:number) => (
                      <li key={index} className="text-gray-700">{symptom}</li>
                    ))}
                  </ul>
                </div>

                {/* Duration & Severity */}
                <div>
                  <h2 className="font-bold text-blue-500 text-lg border-b-2 border-blue-200 pb-1 mb-3">
                    Duration & Severity
                  </h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-bold text-gray-700">Duration:</span>
                      <span className="ml-2 text-gray-600">{(record as any).report?.duration || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700">Severity:</span>
                      <span className="ml-2 text-gray-600">{(record as any).report?.severity || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                {/* Medications Mentioned */}
                <div>
                  <h2 className="font-bold text-blue-500 text-lg border-b-2 border-blue-200 pb-1 mb-3">
                    Medications Mentioned
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    {(record as any).report?.medicationsMentioned?.map((medication:any, index:number) => (
                      <li key={index} className="text-gray-700">{medication}</li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h2 className="font-bold text-blue-500 text-lg border-b-2 border-blue-200 pb-1 mb-3">
                    Recommendations
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {(record as any).report?.recommendations?.map((recommendation:any, index:number) => (
                      <li key={index} className="text-gray-700">{recommendation}</li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 flex items-center">
                    <span className="font-bold text-lg mr-1">ℹ</span>
                    This report was generated by an AI Medical Assistant for informational purposes only.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewReportDialog;
