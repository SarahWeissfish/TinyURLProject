import LinkModel from '../Models/LinkModel.js'
import UserModel from '../Models/UserModel.js'

const getShortLink = (link) => {
    return `${req.protocol}://${req.get('host')}/${link.alias}?${link.targetParamName}=`
}

const LinksController = {
    getLinks: async (req, res) => {
        try {
            const links = await LinkModel.find();        
                res.json(links);
                } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getByAlias: async (req, res) => {
        const { alias } = req.params
        try {
            const link = await LinkModel.findOne({ alias: alias });
                        res.json(link);
                } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    add: async (req, res) => {
        const { userId } = req.params
        const { alias } = req.body
        try {
            const existLink = await LinkModel.findOne({ alias: alias })
            if (existLink) {
                return res.status(409).json({ message: 'alias is not available' })
            }
            const newLink = await LinkModel.create({ targetParamName: 'target', ...(req.body) })
            if (userId) {
                const user = await UserModel.findById(userId)
                user.links.push(newLink)
                await user.save()
            }
            res.send(getShortLink(newLink))
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    update: async (req, res) => {
        const { alias } = req.params
        try {
            const updatedLink = await LinkModel.findOneAndUpdate(
                { alias: alias },
                req.body,
                { new: true }
            )
            if (!updatedLink) {
                return res.status(404).json({ message: 'Link not found' })
            }
            res.send(getShortLink(updatedLink))
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    delete: async (req, res) => {
        const { alias } = req.params
        try {
            const deletedLink = await LinkModel.findOneAndDelete({ alias: alias })
            if (!deletedLink) {
                return res.status(404).json({ message: 'Link not found' })
            }
            res.status(200).json({ message: 'Link deleted successfully' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
};

export default LinksController