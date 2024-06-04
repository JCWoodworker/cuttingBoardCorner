// create a function that checks a string, and if it ends with an "s" add a "'" at the end, if not add "'s"

export const pluralNoun = (noun: string) => {
  if (noun.endsWith("s")) {
    return `${noun}'`
  } else {
    return `${noun}'s`
  }
}