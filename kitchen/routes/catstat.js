const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Cat = require("../models/cat");
const checkAuthorization = require('./checkauth');

router.post("/create", jsonParser, async (req, res) => {
    const gato = new Cat(req.body);
    try {
        await gato.save();
        res.send(gato);
    } catch (err) {
        res.send(err);
    }
});

router.post("/stat", checkAuthorization, jsonParser, async (req, res) => {
    const owner = req.user.name
    const catStat = req.body.stats

    try{
        await Cat.findOneAndUpdate({user: owner}, {stats: catStat})
        res.send("Updated")
    }
    catch (err) {
        res.send(err)
    }
})

router.post("/upCat/", checkAuthorization, jsonParser, async (req, res) => {
    const owner = req.user.name;
    const catImg = req.body.image;
    try{
        await Cat.findOneAndUpdate({user: owner}, {image: catImg})
        res.send("Updated")
    }
    catch (err) {
        res.send(err)
    }
})

router.post("/upCatName", checkAuthorization, jsonParser, async (req, res) => {
    const owner = req.user.name;
    const newName = req.body.newName
    try{
        await Cat.findOneAndUpdate({user: owner}, {name: newName})
        res.send("Updated")
    }
    catch (err) {
        res.send(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const gatos = await Cat.find();
        res.send(gatos);
    } catch (err) {
        res.send(err);
    }
});

router.get("/getStat", checkAuthorization, async (req, res) => {
    const owner = req.user.name
    try {
        const cat = await Cat.findOne({user: owner})
        res.send(cat.stats)
    }  catch (err) {
        res.send(err)
    }
})

router.get("/getCat", checkAuthorization, async (req, res) => {
    const owner = req.user.name
    try {
        const cat = await Cat.findOne({user: owner})
        res.send(cat)
    }  catch (err) {
        res.send(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const gatos = await Cat.find();
        res.send(gatos);
    } catch (err) {
        res.send(err);
    }
});

router.get("/getCatImage", checkAuthorization, async (req, res) => {
    const owner = req.user.name
    try {
        const catImg = await Cat.findOne({user: owner})
        res.send(catImg.image)
    }  catch (err) {
        res.send(err)
    }
})
router.delete("/delete", async (req, res) => {
    try {
       await Cat.deleteMany({});
       res.send("Deleted")
    } catch (err) {
        res.send(err)
    }
});


module.exports = router;