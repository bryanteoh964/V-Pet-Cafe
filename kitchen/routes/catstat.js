const express = require('express')
const router = express.Router()
const jsonParser = require('body-parser').json()
const Cat = require("../models/cat")

router.post("/create", jsonParser, async (req, res) => {
    const gato = new Cat(req.body);
    try {
        await gato.save();
        res.send(gato);
    } catch (err) {
        res.send(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const gatos = await Cat.find();
        res.send(gatos);
    } catch (err) {
        res.send(err);
    }
});

router.delete("/delete", async (req, res) => {
    try {
       await Cat.deleteMany({});
       res.send("Deleted")
    } catch (err) {
        res.send(err)
    }
});

router.post("/upCat/:catId&:catImg", async (req, res) => {
    const cat = req.params.catId.split("=")[1]
    const catImg = req.params.catImg.split("=")[1]
    console.log(cat)
    try{
        await Cat.findOneAndUpdate({name: cat}, {image: catImg})
        res.send("Updated")
    }
    catch (err) {
        res.send(err)
    }
})

router.get("/getCat/:owner", async (req, res) => {
    const owner = req.params.owner
    try {
        const cat = await Cat.findOne({user: owner})
        res.send(cat)
    }  catch (err) {
        res.send(err)
    }
})
module.exports = router;