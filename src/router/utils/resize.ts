import sharp from 'sharp'
import path from 'path'

const resizeImage = async (
  fileName: string,
  fileWidth: number,
  fileHeight: number
): Promise<boolean> => {
  try {
    await sharp(path.resolve('./') + `/images/${fileName}.jpg`)
      .resize(Number(fileWidth), Number(fileHeight))
      .toFile(
        path.resolve('./') +
          `/images/output/${fileName}_${fileWidth}_${fileHeight}.jpg`
      )

    return true
  } catch (error) {
    return false
  }
}

export default resizeImage
