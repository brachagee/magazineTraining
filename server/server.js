const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express();
const dotenv = require('dotenv')
const router = require("./routes/api")
dotenv.config();

app.use(cors())

app.use(bodyParser.json())
    // parse requests from application to string
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router)


app.use(function(req, res, next) {
    console.log("server is working")
    next();
})

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {

        console.log("connected to db")
    })
    .catch((err) => {
        console.log(`error connected ${err}`);
    });


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})