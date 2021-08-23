const express =require("express");
const path = require("path");

const router = express.Router()

router.get("/", (req,res) => res.sendFile(path.join(__dirname, "/views/build/index.html")))

router.get("/:filename", (req,res)=> {
    const filename = req.params.filename
    res.sendFile(path.join(__dirname, `/views/build/${filename}`))
})

router.get("/static/css/:filename", (req,res)=> {
    const filename = req.params.filename

    res.sendFile(path.join(__dirname, `/views/build/static/css/${filename}`))
})
router.get("/static/js/:filename", (req,res)=> {
    const filename = req.params.filename
    res.sendFile(path.join(__dirname, `/views/build/static/js/${filename}`))
})
router.get("/static/media/:filename", (req,res)=> {
    const filename = req.params.filename
    res.sendFile(path.join(__dirname, `/views/build/static/media/${filename}`))
})

module.exports = router