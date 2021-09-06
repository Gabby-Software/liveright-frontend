import AudioRecorder from 'audio-recorder-polyfill'
declare global {
  interface Window {
    MediaRecorder: any
  }
}
// if (!window.MediaRecorder) {
//   import('audio-recorder-polyfill').then(
//     (module) => (window.MediaRecorder = module.default)
//   )
// }
window.MediaRecorder = AudioRecorder
declare const MediaRecorder: any
export default class RecorderManager {
  mediaRecorder: typeof MediaRecorder = null
  stream: MediaStream | null = null
  recordedChunks: BlobPart[] = []

  // getStream() {
  //   return this.stream
  // }
  static videoMime() {
    if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
      return 'video/webm; codecs=vp9'
    } else {
      return 'video/webm; codecs=vp8'
    }
  }
  static audioMime() {
    return 'audio/webm'
  }
  public startRecord(video: boolean, audio: boolean, mimeType: string) {
    return navigator.mediaDevices
      .getUserMedia({ audio, video })
      .then((stream) => {
        const options = { mimeType }
        this.stream = stream
        this.mediaRecorder = new MediaRecorder(stream, options)
        this.recordedChunks = []
        this.mediaRecorder.addEventListener(
          'dataavailable',
          (e: { data: ArrayBuffer & { size: number } }) => {
            console.log('chunk data', e.data)
            if (e.data.size > 0) {
              this.recordedChunks.push(e.data)
            }
          }
        )
        this.mediaRecorder.start(100)
        return stream
      })
  }
  public stopRecord(): null | Promise<Blob> {
    if (this.mediaRecorder?.state !== 'recording') return null
    try {
      this.mediaRecorder?.stop()
      this.stream?.getTracks()?.forEach((track) => track.stop())
    } catch (e) {
      alert('unable to close stream: ' + e.message)
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new Blob(this.recordedChunks))
      })
    })
  }
  upload() {}
  download(filename: string, blob = new Blob(this.recordedChunks)) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }
}
