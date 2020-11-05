const express =require('express');
const bodyParser = require('body-parser');
const mongoose =require('./db/mongoose');



var app = express();
app.use(bodyParser.json());


const {List,Task} =require('./db/models');

app.get('/lists',(req,res)=>{
    List.find().then((lists) => {
        res.send(lists);

    }).catch((e)=>{
        res.send(e);
    });
    
})

app.post('/lists',(req,res)=>{
    let title=req.body.title;
    let newList=new List({
        title
    });

    newList.save().then((listDoc)=>{
        res.send(listDoc);
    })
});

app.patch('/lists/:id',(req,res)=>{
    List.findByIdAndUpdate({_id: req.params.id},{
        $set: req.body

    }).then(()=>{
        req.sendStatus(200);
    });
})

app.delete('/lists/:id',(req,res)=>{
    List.findByIdAndDelete({_id: req.params.id},{

    }).then((removedListDoc)=>{
        res.send(removedListDoc);

    });
})
app.listen(3000,()=>{
    console.log('server is listening on port 3000');
})
