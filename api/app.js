const express =require('express');
const bodyParser = require('body-parser');
const mongoose =require('./db/mongoose');




var app = express();
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    req.header("Access-Control-Allow-Methods","GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {List,Task} =require('./db/models');
const { User } = require('./db/models');
const e = require('express');

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
        title,
    });

    newList.save().then((listDoc)=>{
        res.send(listDoc);
    })
});

app.patch('/lists/:id',(req,res)=>{
    List.findByIdAndUpdate({_id: req.params.id},{
        $set: req.body

    }).then(()=>{
        req.send({message:'Updated Succefully'});
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


 /* user routes */

 /* post for signup */

 app.post('/users',(req,res)=>{

    let body=req.body;
    let newUser=new User(body);

    newUser.save().then(()=>{
        return newUser.createSession();

    }).then((refreshToken)=>{


        return generateAccessAuthToken.then((accessToken)=>{

            return{accessToken,refreshToken}
        });
    }).then((authTokens)=>{

        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e)=>{
        res.status(400).send(e);
    })
 })

 /* login route */

 app.post('/users/login',(req,res)=>{

    let email= req.body.email
    let password=req.body.password;

    User.findByCredentials(email,password).then((user)=>{
        return user.createSession().then((refreshToken)=>{

            return user.generateAccessAuthToken().then((accessToken)=>{

                return{accessToken, refreshToken}
            
            });

        }).then((authTokens)=>{
            res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(User);
        })
    }).catch((e)=>{
        res.status(400).send(e);
    });
 })

app.listen(3000,()=>{
    console.log('server is listening on port 3000');
});
