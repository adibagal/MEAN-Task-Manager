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
    })
    
});

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
    })
});

app.delete('/lists/:id',(req,res)=>{
    List.findByIdAndDelete({_id: req.params.id},{

    }).then((removedListDoc)=>{
        res.send(removedListDoc);

    })
});






/**
 * Creating Get, post, patch , delete request for task in specific list
 */

 app.get('./lists/:listId/tasks',(req,res)=>{
    Task.find({
        _listId: req.params.listId

    }).then((tasks)=>{
        res.send(tasks);
    })

 });

 app.get('/lists/:listId/tasks',(req,res)=>{
     Task.findOne({
         _id:req.params.tasksId,
         _listId:req.params.listId
     }).then((task)=>{
         res.send(task);
     })
 });

 app.post('/lists/:listId/tasks',(req,res)=>{
     let newTask =new Task({
        title:req.body.title,
        _listId: req.params.listId
     });
     newTask.save().then((newTaskDoc)=>{
         res.send(newTaskDoc);
     })
 });


 app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findByIdAndUpdate({
        _id:req.params.tasksId,
        _listId:req.params.listId
    
    },{$set: req.body}).then(()=>{
        res.sendStatus(200);
    })
    
 });

 app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findByIdAndRemove({
        _id:req.params.tasksId,
        _listId:req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    })
 }); 


app.listen(3000,()=>{
    console.log('server is listening on port 3000');
});
