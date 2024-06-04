
import express from 'express'
import RedirectController from '../Controllers/RedirectController.js'

const RedirectRouter = express.Router()

RedirectRouter.get('/:alias', RedirectController.redirect)

export default RedirectRouter