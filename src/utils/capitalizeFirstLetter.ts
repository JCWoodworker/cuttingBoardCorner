export const capitalizeFirstLetterAndRemoveUnderscore = (str: string) => {
  const capitalized =  str.charAt(0).toUpperCase() + str.slice(1)
  return capitalized.replace(/_/g, ' ')
}