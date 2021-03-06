const mongoose=  require('mongoose');

var ListSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        index: true, 
        unique:true
    }
})

const List =mongoose.model('List',ListSchema)

module.exports ={List};