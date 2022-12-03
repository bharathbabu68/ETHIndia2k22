const express = require("express")
const app = express();
const bodyparser=require("body-parser");
const mongoose = require("mongoose")
var cors = require('cors')
require("dotenv").config()


// Mongo-DB Configs
const uri = process.env.MONGODB_CONNECTION_STRING
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB connection established successfully. ")
})

const apiRouter = require("./routes/apiRoutes")

app.use(bodyparser.json());
app.use(express.static("public"));
app.use(cors());
app.use(logger)


app.get("/", (req, res) => {
    res.send("Hello World")
})


app.use("/api", apiRouter)


function logger(req, res, next) {
    console.log(`Calling ${req.method} ${req.url} with body: %o`, req.body)
    next()
}

app.listen(process.env.PORT,()=>{
    console.log(`Listening at port ${process.env.PORT}`);
})