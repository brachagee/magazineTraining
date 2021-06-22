const User = require('../Models/UserModel')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

dotenv.config();

const register = async(req, res) => {
    console.log("enter to register")
    try {
        let result = await User.findOne({
            email: req.body.email
        });

        if (result) {
            console.log(`email in use ${result}`)
            res.status(400).json({ message: "Failed! Email is already in use!" });
        } else {
            let newUser = new User(req.body)
            console.log(`new user ${newUser}`)
            await newUser.save()
            console.log("succes " + newUser)
            let token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET)
            let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            console.log(`token ${token}`)
            console.log(`decoded ${decoded}`)
            res.status(200).json({ "user": newUser, message: "user was registerd succesfuly", "token": token })
        }
    } catch (err) {
        console.log("error from catch" + err)
        res.status(500).json({ error: err.message, message: "cannot create new user" })
    }

}



const signIn = async(req, res) => {
    try {
        console.log("enter to sign in")
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        if (user) {
            console.log(user)
            let token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET)
            let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            console.log(`token ${token}  decoded ${decoded}`)
            res.status(200).json({ "user": user, "token": token, message: "user was logged in succesfully" })
        } else
            res.status(400).json({ message: "Failed! Email does not exist pleese register first!" })
    } catch {
        (err) => {
            console.log(err + "catch sign in user")
            res.status(500).json({ error: err, message: "cannot sign in user " })
        }

    }
}

async function getMagazines(req, res) {
    try {
        console.log("enter to getMagazines")
        let user = await User.findOne({ email: req.params.email })
        if (!user)
            res.status(400).send("no such email try again")
        console.log("user " + user)
        console.log("recepies length" + user.magazines.length)
        if (user.magazines.length == 0)
            res.status(200).send(`There is no magazines for user ${user.name}`)
        console.log(user.magazines.populate('magazines'))
        res.status(200).json(user.magazines.populate('magazines'))
    } catch {
        (err) => {
            res.status(500).send({ error: err, message: "An error occurd while finding user magazines " })
        }
    }

}



async function updateUser(req, res) {
    console.log("enter to updateUser")
    try {
        User.findByIdAndUpdate(req.body._id, req.body, { new: true })
            .then((updateuser) => {
                res.status(200).json(updateuser)
            })
    } catch (error) {
        res.status(500).json({ "message": "canot update user", error: error })
    }
}
module.exports = { register, signIn, updateUser, getMagazines }