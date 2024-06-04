import express from 'express'
import LinksController from '../Controllers/LinksController.js'

const LinksRouter = express.Router()

LinksRouter.get('/',LinksController.getLinks)
LinksRouter.get('/:alias',LinksController.getByAlias)
LinksRouter.post('/',LinksController.add)
LinksRouter.post('/:userId',LinksController.add)
LinksRouter.put('/:alias',LinksController.update)
LinksRouter.delete('/:alias',LinksController.delete)

export default LinksRouter;

