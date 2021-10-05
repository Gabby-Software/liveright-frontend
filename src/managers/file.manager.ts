import logger from './logger.manager'

class FileManager {
  public urlToImage(url: string): Promise<HTMLImageElement> {
    return new Promise((res) => {
      const img = new Image()
      img.onload = () => res(img)
      img.src = url
    })
  }
  public canvasToFile(canvas: HTMLCanvasElement): Promise<File> {
    return new Promise((res) => {
      canvas.toBlob(
        (blob) => {
          res(new File([blob as Blob], `image_${new Date().getTime()}.jpg`))
        },
        'image/jpeg',
        0.95
      )
    })
  }
  public urlToFile(dataUrl: string): Promise<File> {
    return new Promise((res) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      this.urlToImage(dataUrl).then((img) => {
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        ctx?.drawImage(img, 0, 0)
        this.canvasToFile(canvas).then(res)
      })
    })
  }
  public readAsUrl(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(String(reader.result))
      }
      reader.readAsDataURL(file)
    })
  }
  public resize(file: File, maxWidth: number): Promise<[string, File]> {
    return new Promise((res) => {
      this.readAsUrl(file).then((url) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        this.urlToImage(url)
          .then((img) => {
            const width = Math.min(maxWidth, img.naturalWidth)
            const ratio = width / img.naturalWidth
            canvas.width = img.naturalWidth * ratio
            canvas.height = img.naturalHeight * ratio
            logger.info('image size', canvas.width, canvas.height)
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
            const smallerUrl = canvas.toDataURL('jpg', 80)
            return [smallerUrl, canvas] as [string, HTMLCanvasElement]
          })
          .then(([url, canvas]) =>
            this.canvasToFile(canvas).then((file) => res([url, file]))
          )
      })
    })
  }
  public aspectRatio(file: File, ratio: number): Promise<[string, File]> {
    return new Promise((res) => {
      this.readAsUrl(file).then((url) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        this.urlToImage(url).then((img) => {
          let w, h
          if (img.naturalHeight * ratio > img.naturalWidth) {
            w = img.naturalWidth
            h = img.naturalWidth / ratio
          } else {
            h = img.naturalHeight
            w = img.naturalHeight * ratio
          }
          canvas.width = w
          canvas.height = h
          ctx?.drawImage(
            img,
            (img.naturalWidth - w) / 2,
            (img.naturalHeight - h) / 2,
            w,
            h,
            0,
            0,
            w,
            h
          )
          this.canvasToFile(canvas).then((file) => res([url, file]))
        })
      })
    })
  }

  /**
   * Download files using a Blob or File
   *
   * @param blob A blob or file to be downloaded
   * @param filename A name for the downloaded file
   */
  download(blob: Blob | File, filename = 'image.jpg') {
    const url = URL.createObjectURL(blob)
    this.downloadUrl(url, filename)
  }

  /**
   * Download files using a URL
   *
   * @param url URL for the file to be downloaded
   * @param filename A name for the downloaded file
   */
  downloadUrl(url: string, filename = 'file.txt') {
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.setAttribute('download', filename)
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }
}
const fileManager = new FileManager()
export default fileManager
