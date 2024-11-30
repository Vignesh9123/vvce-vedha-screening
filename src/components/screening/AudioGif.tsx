import Image from 'next/image'

import { cn } from '@/lib/utils'
import Audio_Gif from '@/assets/audio.webp'
import {Mic} from "lucide-react"

type AudioGifProps = {
  speaking?: boolean
  className?: string
}

const AudioGif = ({ speaking, className }: AudioGifProps) => {
  return (
    <div
      className={cn('bg-[#7a0d2e] flex justify-center items-center', className)}
    >
      {speaking ? (
        <Image
          src={Audio_Gif}
          alt="audio gif"
          className="object-fill w-full h-full rounded-xl"
          color="white"
          width={200}
          height={200}
        />
      ) : (
        <Mic className="h-full w-full rounded-xl p-10" />
      )}
    </div>
  )
}

export default AudioGif
