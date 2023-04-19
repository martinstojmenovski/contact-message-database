const express = require('express')
const router = express.Router()
const Content = require('../models/content.js')




//Getting all
router.get('/', async (req, res) => {
    try {
        const content = await Content.find()
        res.json(content)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//Getting one
router.get('/:id', getContent, (req, res) => {
    res.json(res.content)
})
//Creating one 
router.post('/', async (req, res) => {
    const content = new Content({
        recipientEmail: req.body.recipientEmail,
        recipientText: req.body.recipientText
    })
    try {
        const newContent = await content.save()
        res.status(201).json(newContent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//Updating one
router.patch('/:id', getContent, async (req, res) => {
    if(req.body.recipientEmail != null) {
        res.content.recipientEmail = req.body.recipientEmail
    }
    if(req.body.recipientText != null) {
        res.content.recipientText = req.body.recipientText
    }
    try{
        const updatedContent = await res.content.save()
        res.json(updatedContent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }   
})
//Deleting one
router.delete('/:id', getContent, async (req, res) => {
    
    try {
        await res.content.deleteOne()
        res.json({ message: 'Deleted Email' })
    } catch (err) {
        res.status(500).json({ message: err.message }) 
    }
})





//Function middleware
async function getContent(req, res, next) {
    let content
    try {
        content = await Content.findById(req.params.id)
        if (content == null) {
            return res.status(404).json({ message: 'Cannot find email' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.content = content
    next()
}

module.exports = router