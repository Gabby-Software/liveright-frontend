export class Formatter {
  private formats: ((val: string) => string)[] = []
  public format(value: string): string {
    return this.formats.reduce((a, b) => b(a), value)
  }
  public number() {
    this.formats.push((val: string) => val.replace(/\D/g, ''))
    return this
  }
  public min(x: number) {
    this.formats.push((val: string) => val && String(Math.max(x, +val)))
    return this
  }
  public max(x: number) {
    this.formats.push((val: string) => val && String(Math.min(x, +val)))
    return this
  }
}
const formatter = () => new Formatter()
export default formatter
