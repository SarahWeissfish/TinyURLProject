import LinkModel from "../Models/LinkModel.js";


const RedirectController={

redirect :async (req, res) => {
    const { alais } = req.params;

    try {
        const link = await Link.findById(alias);
        if (!link) {
            return res.status(404).send({ message: 'Link not found' });
        }
        const targetParamName = link.targetParamName;
        const targetParamValue = req.query[targetParamName] || "";
        link.clicks.push({ ipAddress: req.ip, targetParamValue });
        await link.save();
        // בדוק אם ה-URL המקורי כולל את הפרוטוקול, אם לא, הוסף אותו
        let originalUrl = link.originalUrl;
        if (!/^https?:\/\//i.test(originalUrl)) {
            originalUrl = 'http://' + originalUrl;
        }
        res.redirect(301, originalUrl);
        }
        catch(e)
        {
            res.status(400).json({message:e.message})
        }
    },


    dataSegmentation : async (req, res) => {
        const { alias } = req.params;
        try {
            const link = await Link.findById(alias);
            if (!link) {
                return res.status(404).send({ message: 'Link not found' });
            }
            let dict = {};
            link.clicks.forEach(element => {
                if (dict[element.targetParamValue] == undefined)
                    dict[element.targetParamValue] = 1;
                else
                    dict[element.targetParamValue] += 1;
            });
            res.send(dict)
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    }
}
export default RedirectController