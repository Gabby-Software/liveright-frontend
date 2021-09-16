import RecordRTC, { StereoAudioRecorder } from 'recordrtc'

declare global {
  interface Window {
    MediaRecorder: any
  }
}

if (!window.MediaRecorder) {
  import('audio-recorder-polyfill').then(
    (module) => (window.MediaRecorder = module.default)
  )
}

export const AUDIO_MIME = 'audio/wav'
export const AUDIO_EXTENSION = 'wav'

function getAudioName(): string {
  return `audio_${Date.now()}.${AUDIO_EXTENSION}`
}

export default class RecorderManager {
  mediaRecorder: RecordRTC | null = null
  stream: MediaStream | null = null

  public startRecord() {
    return navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new RecordRTC(stream, {
          type: 'audio',
          mimeType: AUDIO_MIME,
          recorderType: StereoAudioRecorder
        })
        this.stream = stream
        this.mediaRecorder.startRecording()
      })
      .catch((err) => alert('cannot start recording: ' + err.message))
  }

  public stopRecord(cb?: (file: File) => void) {
    this.mediaRecorder?.stopRecording(() => {
      const blob = this.mediaRecorder?.getBlob()
      if (blob) {
        const file = new File([blob], getAudioName(), {
          type: AUDIO_MIME
        })
        cb?.(file)
        this.stream?.getTracks()?.forEach((track) => track.stop())
      }
    })
  }

  public destroy() {
    this.mediaRecorder?.destroy()
  }
}
