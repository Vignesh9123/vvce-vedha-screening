import Header from "@/components/screening/Header";
import TranscriptionSidebar from "@/components/screening/TranscriptionSidebar";
import InterviewMain from "@/components/screening/InterviewMain";
import Proctoring from "@/components/screening/Proctoring";

export default function ScreeningPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <InterviewMain />
        <TranscriptionSidebar />
      </div>
      <Proctoring />
    </div>
  );
}
