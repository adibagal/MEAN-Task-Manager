const mongoose=require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TaskManager',{useNewUrlParser: true}).then(()=> {
    console.log("connected to MongoDB successfully:");
}).catch((e)=>{
    console.log("Error while connecting to MongoDB");
    console.log(e);
});

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

module.exports ={
    mongoose
};