'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const path_1 = __importDefault(require('path'))
const sharp_1 = __importDefault(require('sharp'))
const imageResize = (req, res, next) => {
  const fileName = req.query.filename
  const fileWidth = req.query.width
  const fileHeight = req.query.height
  const filePath = path_1.default.resolve('./') + `/images/${fileName}.jpg`
  const outputFile =
    path_1.default.resolve('./') +
    `/images/output/${fileName}_${fileWidth}_${fileHeight}.jpg`
  ;(0, sharp_1.default)(filePath)
    .resize({
      width: parseInt(`${fileWidth}`),
      height: parseInt(`${fileHeight}`),
      position: 'center',
    })
    .toFormat('jpg')
    .toFile(outputFile)
  next()
}
exports.default = imageResize
