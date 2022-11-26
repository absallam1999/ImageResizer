import express from 'express'
import router from './router/index'
import logger from './router/utils/logger'

const app = express()
const port = 3000

app.get('/', logger, (req: express.Request, res: express.Response): void => {
  res.send('<h1> <center> Welcom to Image Resizer! </center> </h1>')
})

app.use(
  '/api',
  logger,
  router,
  (req: express.Request, res: express.Response): void => {
    res.send('<h1> <center> Main API Endpoint! </center> </h1>')
  }
)

app.use(
  '/:images',
  logger,
  router,
  (req: express.Request, res: express.Response): void => {
    res.send('<h1> <center> Enter Avalid URL! </center> </h1>')
  }
)

app.listen(port, (): void => {
  console.log(`Server Started at http://localhost:${port}`)
})

export default app
