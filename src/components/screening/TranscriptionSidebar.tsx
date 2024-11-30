"use client"

import { useInterviewStore } from "@/store/interviewStore"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TranscriptionSidebar() {
  const transcriptions = useInterviewStore((state) => state.transcriptions)

  return (
    <aside className="w-1/3 bg-secondary p-4">
      <h2 className="text-xl font-semibold mb-4">Transcriptions</h2>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        {transcriptions.map((transcription , i) => (
          <Card key={i} className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {transcription.speaker === 'user' ? 'You' : 'SkillConnect AI'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-justify">{transcription.text}</p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </aside>
  )
}

