"use client"

import { useEffect } from "react"
import { useInterviewStore } from "@/store/interviewStore"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

const MAX = 2

export default function Proctoring() {
  const router = useRouter()
  const { tabSwitches, incrementTabSwitches, setIsFullScreen } = useInterviewStore()

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        incrementTabSwitches()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [incrementTabSwitches])

  useEffect(() => {
    const enterFullScreen = () => {
      if (!document.fullscreenElement) {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
          });
        }
      }
    };

    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    enterFullScreen();
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [setIsFullScreen]);

  const handleCloseWarning = () => {
    // Reset tab switches or handle as needed
    router.replace("/courses")
  }

  return (
    <AlertDialog open={tabSwitches >= MAX}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Warning: Excessive Tab Switching</AlertDialogTitle>
          <AlertDialogDescription>
            You have switched tabs {MAX} times. This behavior may be flagged as suspicious.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleCloseWarning}>Acknowledge</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

