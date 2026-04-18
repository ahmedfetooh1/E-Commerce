const exress = require('express');
const app = exress();


app.get('/',(req,res)=>{
    res.send('hello API !')
})

app.listen(3000,()=>{
    console.log("server is running http://localhost:3000");
})