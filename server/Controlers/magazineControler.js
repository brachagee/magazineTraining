const Magazine = require('../Models/MagazineModel')
const User = require('../Models/UserModel')
const Category = require('../Models/CategoryModel')
const Post = require('../Models/PostModel')

async function addNewMagazine(req, res) {
    try {
        console.log("addNewMagazine")
        let newMagazine = new Magazine(req.body)
        console.log(newMagazine)
        let currentUser = await User.findById(req.body.user)
        console.log(currentUser)
        await currentUser.magazines.push(newMagazine._id)
        console.log("recepies length " + currentUser.magazines.length + " newMagazine._id " + newMagazine._id)
        await newMagazine.save()
        await currentUser.save()

        console.log("new magazine " + newMagazine)
        res.status(200).json({ newMagazine: newMagazine, currentUser: currentUser })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function addNewPost(req, res) {
    try {
        //push to:new magazine
        //new category
        console.log("enter to addNewPost")
        const newPost = new Post(req.body)
        console.log(newPost)
        postMagazine = await Magazine.findById(req.body.magazine)
        PostCategory = await Category.findById(req.body.category)
        postMagazine.posts.push(newPost._id)
        PostCategory.posts.push(newPost._id)
        await newPost.save()
        res.status(200).json({ newPost: newPost })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function addNewCategory(req, res) {
    try {
        console.log("addNewCategory");
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json({ newCategory: newCategory })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function editPost(req, res) {
    console.log("editPost")
    let post = await Post.findByIdAndUpdate(req.body._id, req.body)
    if(post)
    post.save()
        .then(() => {
            res.status(200).json(post)
        })
        .catch((err) => {
            res.status(500).send(err.message)
        })
        else
        res.status(400).send("no such post id")
}

async function deleteMagazine(req, res) {
    try {
        console.log("deleteMagazine")
        console.log(req.params.magazine_id)
        //delete from user and from post
        let magazineIdToDelete = req.params.magazine_id
        const maga = await Magazine.findById(req.params.magazine_id)
        await User.findByIdAndUpdate(maga.user, { $pull: { magazines: maga._id } })
        await Post.deleteMany({ _id: { $in: maga.posts } })
        await maga.remove()
        res.status(200).send(magazineIdToDelete + " id deleted succesfuly")

    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    deleteMagazine,
    editPost,
    addNewMagazine,
    addNewPost,
    addNewCategory
}