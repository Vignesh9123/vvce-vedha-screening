"use client"

import { useEffect } from "react"
import { useInterviewStore } from "@/store/interviewStore"
import { requestPermission } from "@/utils/mediaUtils"
import { CheckCircle, XCircle } from 'lucide-react'

export default function PermissionCheck() {
  const { permissions, setPermission } = useInterviewStore()

  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermission = await requestPermission('camera')
      setPermission('camera', cameraPermission)

      const audioPermission = await requestPermission('microphone')
      setPermission('audio', audioPermission)

      const screenPermission = await requestPermission('screen')
      setPermission('screen', screenPermission)
    }

    checkPermissions()
  }, [setPermission])

  return (
    <div className="mt-4 space-y-2">
      <PermissionStatus type="Camera" granted={permissions.camera} />
      <PermissionStatus type="Microphone" granted={permissions.audio} />
      <PermissionStatus type="Screen Sharing" granted={permissions.screen} />
    </div>
  )
}

function PermissionStatus({ type, granted }: { type: string; granted: boolean }) {
  return (
    <div className="flex items-center">
      {granted ? (
        <CheckCircle className="text-green-500 mr-2" />
      ) : (
        <XCircle className="text-red-500 mr-2" />
      )}
      <span>{type} permission: {granted ? "Granted" : "Not granted"}</span>
    </div>
  )
}

