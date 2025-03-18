const express=require('express');
const path=require('path');
const morgan=require('morgan');
const handlebars=require('express-handlebars');
const app=express();
const port=3000;


const route=require('./routes');


//HTttp loggern
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,'public')));

//Template engine
app.engine('hbs',handlebars.engine({
    extname:'.hbs'
}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'resources','views'));

//Route init:Khoi tao tuyn duong
route(app);



app.listen(port,()=> console.log(`Server is running on port at http://localhost:${port}`));
