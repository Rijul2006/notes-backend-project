const express = require("express")
const noteModel = require('../models/notes.models')
const app = express()
 
app.use(express.json())

app.post('/notes', async (req, res) => {
    const data = req.body
    await noteModel.create(
        {
            title: data.title,
            description: data.description
        }
    )
     res.status(201).json({
        message:"Note created"
     })
})

app.get('/notes', async (req, res) => {
    const notes = await noteModel.find() // return an array of object.. if no obj is present it returns an empty array..
    //findOne: returns an object.. if no obj is present it returns null..
    res.status(200).json({
        message:"Notes fetched",
        notes: notes
    })
})

app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id
    await noteModel.findOneAndDelete({
        _id : id
    })
    res.status(200).json({
        message:"Note deleted.."
    })
})

app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id
    const description = req.body.description
    const note = await noteModel.findOneAndUpdate({
        _id : id
    }, {
          description : description
    })
    
    res.status(200).json({
        message : "Note updated"
    })
})

module.exports = app