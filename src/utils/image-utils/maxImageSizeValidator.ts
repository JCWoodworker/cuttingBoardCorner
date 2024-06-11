import { FileError } from "react-dropzone"

export const maxImageSizeValidator = (file: File): FileError | null => {
  const maxSize: number = 5 * 1024 * 1024
  if (file.size > maxSize) {
    alert("File is too large, must be less than 5MB")
    return {
      code: "file-too-large",
      message: "File is too large, must be less than 5MB",
    }
  } else {
    return null
  }
}
