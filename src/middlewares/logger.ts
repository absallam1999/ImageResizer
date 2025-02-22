import express, {NextFunction} from 'express'

const logger = (
  req: express.Request,
  _res: express.Response,
  next: NextFunction
): void => {
  const url = req.url
  console.log(`${url} \n was visted!`)
  next()
}

export default logger
