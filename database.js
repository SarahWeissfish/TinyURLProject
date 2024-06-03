import mongoose from "mongoose";

const uri = 
"mongodb+srv://sarah_weissfish:ZExHV7EjEBcDVVAz@cluster0.ggi2ncg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async ()=>{
    await mongoose.connect(uri);
};

const database = mongoose.connection;

mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
  });
  
database.on('error',(error)=>{console.log(error);})

database.once('connected',()=>{
    console.log('Datatbase Connected');
})

export default connectDB;