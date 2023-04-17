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

module.exports = router;