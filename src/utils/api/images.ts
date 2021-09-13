export const FAILED_IMAGES: string[] = []

export function addFailedImage(src: string): void {
  FAILED_IMAGES.push(src)
}

export function checkFailedImage(src: string): boolean {
  return FAILED_IMAGES.includes(src)
}
