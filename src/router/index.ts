import express from 'express'
import path from 'path'
import fs from 'fs'
import { promises as fsPromises } from 'fs'
import resizeImage from './utils/resize'
import checkImage from './utils/array'
import logger from './utils/logger'

const router = express.Router()

router.get(
  '/images',
  logger,
  async (req: express.Request, res: express.Response): Promise<unknown> => {
    const fileName: string = req.query.filename as string
    const fileWidth: number = req.query.width as unknown as number
    const fileHeight: number = req.query.height as unknown as number
    const outputFile =
      path.resolve('./') +
      `/images/output/${fileName}_${fileWidth}_${fileHeight}.jpg`
    const checkIfImage = checkImage.includes(fileName)

    if (
      fileName === undefined ||
      fileWidth === undefined ||
      fileHeight === undefined
    ) {
      return res
        .status(400)
        .send('<h1> <center> Some Queries are MISSING! </center> </h1>')
    } else if (isNaN(fileWidth) || isNaN(fileHeight)) {
      return res
        .status(400)
        .send(
          '<h1> <center> Please Enter Avalid Width & Height Values! </center> </h1>'
        )
    } else if (fileName !== '' && fileWidth >= 10 && fileHeight >= 10) {
      try {
        if (fs.existsSync(outputFile)) {
          return res.status(200).sendFile(outputFile)
        } else if (checkIfImage === false) {
          return res.status(400).send('<h1> <center> File Name is NOT Exist!')
        } else {
          resizeImage(
            fileName as string,
            fileWidth as number,
            fileHeight as number
          )
            .then(() => {
              fsPromises.readFile(outputFile, 'utf-8')
            })
            .then(() => {
              res.status(200).sendFile(outputFile)
            })
        }
      } catch (error) {
        Error('There Is an Error according Process!')
      }
    } else {
      return res
        .status(400)
        .send('<h1> <center> Please Enter A Valid URL! </center> </h1>')
    }
  }
)

export default router
