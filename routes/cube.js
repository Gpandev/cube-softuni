const express = require('express')
const { getCubeWithAccessories } = require('../controllers/cubes')
const Cube = require('../models/cube')

module.exports = (app) => {

    app.get('/create', (req, res) => {
        res.render('create', {
            title: 'Create | Cube'
        })
    })

    app.post('/create', (req, res) => {
        const {
            name,
            description,
            imageUrl,
            difficultyLevel
        } = req.body

        const cube = new Cube({name, description, imageUrl, difficulty: difficultyLevel})

        cube.save((err) => {
            if(err) {
                console.error(err)
                res.redirect('/create')
            } else {
                res.redirect('/')
            }
        })
    })

    app.get('/edit', (req, res) => {
        res.render('editCubePage')
    })

    app.get('/delete', (req, res) => {
        res.render('deleteCubePage')
    })

    app.get('/details/:id', async (req, res) => {
        
        const cube = await getCubeWithAccessories(req.params.id)
        
        res.render('details', {
            title: 'Details | Cube details',
            ...cube,
            cube
        })
    })
}