import UserModel from "../Models/UserModel.js"

const UsersController = {
  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find().select('-links');//ללא סינון
      //const filtered1 = await UserSchema.find({ complete: true });//סינון 1
      //const filtered2 = await TaskModel.where('isComplete', false);//סינון 2
      res.json( users);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id).populate({
        path:'links',
        select:'OriginalUrl -_id'
      }).lean()
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    
        try {
    const newUser = await UserModel.create(req.body)
    res.json(newUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true
      });
     res.json(updatedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await TaskModel.findByIdAndDelete(id);
      res.json(deletedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default UsersController;
