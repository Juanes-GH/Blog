const express = require('express');
const app = express();


app.get("/", (req, res)=>{
    console.log('hello wolrd')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});