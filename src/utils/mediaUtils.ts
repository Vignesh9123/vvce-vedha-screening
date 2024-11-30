export const requestPermission = async (
  type: "camera" | "microphone" | "screen"
) => {
  try {
    if (type === "screen") {
      await navigator.mediaDevices.getDisplayMedia({ video: true });
    } else {
      await navigator.mediaDevices.getUserMedia({
        video: type === "camera",
        audio: type === "microphone",
      });
    }
    return true;
  } catch (error) {
    console.error(`Error requesting ${type} permission:`, error);
    return false;
  }
};

export const startRecording = async (
  stream: MediaStream,
  onDataAvailable: (blob: Blob) => void
) => {
  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      const blob = new Blob([event.data], { type: "audio/wav" });
      onDataAvailable(blob);
    }
  };

  mediaRecorder.start();
  return mediaRecorder;
};
