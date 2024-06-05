
import express from 'express'
import RedirectController from '../Controllers/RedirectController.js'

const RedirectRouter = express.Router()

RedirectRouter.get('/:alias', RedirectController.redirect)
RedirectRouter.get('/seg/:alias', RedirectController.dataSegmentation);

export default RedirectRouter