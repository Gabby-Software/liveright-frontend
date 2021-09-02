export const insertedLinks = (str: string) =>
  str.match(/\bhttps?:\/\/[^\b\s]+\.[a-zA-Z]{2,6}[^\b\s.]*/g)
