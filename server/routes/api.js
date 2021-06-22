const router = require("express").Router();
const user = require("../Controlers/userControler")
const magazine = require("../Controlers/magazineControler");

router.post('/register', user.register);
router.get('/signIn', user.signIn);
router.patch('/updateUser', user.updateUser);
router.get('/getMagazines/:email', user.getMagazines);

router.post('/addNewMagazine', magazine.addNewMagazine);
router.post('/addNewPost', magazine.addNewPost);
router.post('/addNewCategory', magazine.addNewCategory);
router.patch('/editPost', magazine.editPost);
router.delete('/deleteMagazine/:magazine_id', magazine.deleteMagazine);


module.exports = router;