const express=require('express');
const app=express();
const logger=require('./logger.js');


app.use(express.json());

app.use(logger);

app.use(function(req,res,next){
    console.log('Authenticating...');
    next();
})

const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
]

app.get('/',(req,res)=>{
    res.send('hello wrld');
});
 
app.get('/api/courses',(req,res)=>{
    res.send([1,2,3]);
});
app.get('/api/courses/:id',(req,res)=>{
    let course=courses.find(c=>c.id==req.params.id);
    if(!course) res.status(404).send('the code is not there');
    res.send(course);
});

app.post('/api/courses',(req,res)=>{
    const course={
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log('server is woring'+port));