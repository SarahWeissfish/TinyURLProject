import LinkModel from "../Models/LinkModel.js";




const RedirectController={

    redirect: async(req,res)=>{
        const {alias}= req.params
        try{
            const link= await LinkModel.findOne({alias:alias});
            if(!link){
                return res.status(404).json({message:'Link not found'});
            }
            const click = {
                insertedAt:new Date(),
                ipAdress:req.ip
            }
            link.clicks.push(click);
            await link.save();
            res.redirect(link.originalUrl);
        }
        catch(e)
        {
            res.status(400).json({message:e.message})
        }
    }

}
export default RedirectController;