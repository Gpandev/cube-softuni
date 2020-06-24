const env = process.env.NODE_ENV || 'development'

const config = require('../config/config')[env]
const { getCubeWithAccessories } = require('../controllers/cubes')
const Cube = require('../models/cube')
const jwt = require('jsonwebtoken')

module.exports = (app) => {

    app.get('/edit', (req, res) => {
        res.render('editCubePage')
    })

    app.get('/delete', (req, res) => {
        res.render('deleteCubePage')
    })

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

        const token = req.cookies['aid']
        const decodedObj = jwt.verify(token, config.privateKey)

        const cube = new Cube({name, description, imageUrl, difficulty: difficultyLevel, creatorId: decodedObj.userID})

        cube.save((err) => {
            if(err) {
                console.error(err)
                res.redirect('/create')
            } else {
                res.redirect('/')
            }
        })
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