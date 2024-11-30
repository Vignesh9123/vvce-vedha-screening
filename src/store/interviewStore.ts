import { InitMessage } from "@/utils/speechUtils";
import { create } from "zustand";

interface InterviewState {
  permissions: {
    camera: boolean;
    audio: boolean;
    screen: boolean;
  };
  transcriptions: {
    id: string;
    speaker: "user" | "ai";
    text: string;
  }[];
  stream: MediaStream | null;
  setStream: (stream: MediaStream) => void;
  isRecording: boolean;
  setPermission: (type: "camera" | "audio" | "screen", value: boolean) => void;
  addTranscription: (speaker: "user" | "ai", text: string) => void;
  setIsRecording: (value: boolean) => void;
  tabSwitches: number;
  isFullScreen: boolean;
  incrementTabSwitches: () => void;
  setIsFullScreen: (value: boolean) => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  permissions: {
    camera: false,
    audio: false,
    screen: false,
  },
  transcriptions: [],
  isRecording: false,
  stream: null,
  setPermission: (type, value) =>
    set((state) => ({
      permissions: { ...state.permissions, [type]: value },
    })),
  addTranscription: (speaker, text) =>
    set((state) => ({
      transcriptions: [
        ...state.transcriptions,
        { id: Date.now().toString(), speaker, text },
      ],
    })),
  setIsRecording: (value) => set({ isRecording: value }),
  tabSwitches: 0,
  isFullScreen: false,
  incrementTabSwitches: () =>
    set((state) => ({ tabSwitches: state.tabSwitches + 1 })),
  setIsFullScreen: (value) => set({ isFullScreen: value }),
  setStream: (stream) => {
    set((state) => ({ ...state, stream }));
  },
}));
