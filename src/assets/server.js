let express = require("express");
var cors = require('cors');

let app = express();
app.use(cors());

app.use(express.static('./model'));
app.listen(5000,()=>{
    console.log("5000");
})