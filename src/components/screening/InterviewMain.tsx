"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useInterviewStore } from "@/store/interviewStore";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff, Maximize, Minimize } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { startRecording } from "@/utils/mediaUtils";
import { ApiResponse, Generate } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import AudioGif from "./AudioGif";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { InitMessage } from "@/utils/speechUtils";
import {
  clearInterviewHistory,
  getInterviewHistory,
  saveInterviewHistory,
} from "@/utils/storageUtils";
import { generateInterviewReport } from "@/utils/reportUtils";
import { generatePDF, downloadPDF } from "@/utils/pdfUtils";
import { Content } from "@google/generative-ai";
import { getCurrentUser } from "@/lib/auth";

export default function InterviewMain() {
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const router = useRouter();
  const {
    isRecording,
    setIsRecording,
    addTranscription,
    isFullScreen,
    setIsFullScreen,
  } = useInterviewStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { speak, speaking } = useSpeechSynthesis();

  const searchparams = useSearchParams();

  const username = getCurrentUser()?.username;
  const course = searchparams.get("course");

  const stopMediaStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true;
          videoRef.current
            .play()
            .catch((error) => console.error("Error playing video:", error));
          addTranscription("ai", InitMessage(username!));
          speak(InitMessage(username!));
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    return () => {
      stopMediaStream();
    };
  }, []);

  const generate = async (text: string) => {
    try {
      const history = getInterviewHistory();
      const response = await axios.post<ApiResponse<Generate>>(
        "/api/generate",
        {
          text,
          history,
          username,
          course,
        }
      );

      const { data } = response.data;

      // Update history in localStorage
      const updatedHistory: Content[] = [
        ...history,
        { role: "user", parts: [{ text: data.user }] },
        { role: "model", parts: [{ text: data.model }] },
      ];
      saveInterviewHistory(updatedHistory);

      return data;
    } catch (error) {
      console.log("Chat completion error : ", error);
    }
  };

  const handleRecordToggle = async () => {
    if (isRecording) {
      setIsRecording(false);
      mediaRecorderRef.current?.stop();
    } else {
      try {
        const stream = videoRef.current?.srcObject as MediaStream | null;
        if (stream) {
          setIsRecording(true);
          mediaRecorderRef.current = await startRecording(
            stream,
            async (blob) => {
              const formData = new FormData();
              formData.append("file", blob, "audio.wav");
              try {
                const response = await axios.post(
                  `http://localhost:5000/transcribe`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );

                const transcribedText = response.data.text;
                const generated = await generate(transcribedText);
                if (generated) {
                  addTranscription("user", generated.user);
                  addTranscription("ai", generated.model);
                  speak(generated.model);
                }
              } catch (error) {
                console.log("Transcribe error: ", error);
              }
            }
          );
        } else {
          console.error("No media stream available");
        }
      } catch (error) {
        console.error("Error starting recording:", error);
      }
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullScreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message}`
          );
        });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        });
      }
    }
  };

  const handleEndCall = () => {
    setShowEndDialog(true);
  };

  const handleEndInterview = async () => {
    setIsGeneratingReport(true);
    try {
      const history = getInterviewHistory();
      const report = await generateInterviewReport(history);

      // Generate and download PDF
      const pdfBlob = await generatePDF(report);
      downloadPDF(pdfBlob);

      // Store the report in localStorage for the completion page
      localStorage.removeItem("interview_report"); //remove existing
      localStorage.setItem("interview_report", report);

      setShowEndDialog(false);
      stopMediaStream();
      router.replace("/completion");
    } catch (error) {
      console.error("Failed to generate report:", error);
    } finally {
      setIsGeneratingReport(false);
      clearInterviewHistory();
    }
  };

  return (
    <main className="flex-1 p-4">
      <div className="flex justify-between mb-4 gap-4">
        <AudioGif speaking={speaking} className="w-1/2 h-[30ch] rounded-lg" />
        <div className="w-1/2 h-[30ch] bg-gray-200 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          onClick={handleRecordToggle}
          variant={isRecording ? "destructive" : "default"}
          disabled={isGeneratingReport}
        >
          {isRecording ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        <Button
          onClick={handleEndCall}
          variant="outline"
          disabled={isGeneratingReport}
        >
          <PhoneOff className="mr-2" />
          End Call
        </Button>
        <Button
          onClick={toggleFullScreen}
          variant="outline"
          disabled={isGeneratingReport}
        >
          {isFullScreen ? (
            <Minimize className="mr-2" />
          ) : (
            <Maximize className="mr-2" />
          )}
          {isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
        </Button>
      </div>

      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to end the interview?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isGeneratingReport
                ? "Generating final report..."
                : "This action cannot be undone. All recordings will be saved and the interview will be concluded."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isGeneratingReport}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEndInterview}
              disabled={isGeneratingReport}
            >
              End Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
