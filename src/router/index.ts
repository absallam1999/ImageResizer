import express from 'express'
import logger from './../middlewares/logger'
import handler from './../handler/index'

const router = express.Router()

router.get('/images', logger, handler)

export default router
