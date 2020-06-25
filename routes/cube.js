const env = process.env.NODE_ENV || 'development'

const config = require('../config/config')[env]
const { getCubeWithAccessories } = require('../controllers/cubes')
const Cube = require('../models/cube')
const jwt = require('jsonwebtoken')
const { authAccess, getUserStatus, authAccessJSON } = require('../controllers/user')

module.exports = (app) => {

    app.get('/edit', authAccess, getUserStatus, (req, res) => {
        res.render('editCubePage', {
            isLoggedIn: req.isLoggedIn
        })
    })

    app.get('/delete', authAccess, getUserStatus,  (req, res) => {
        res.render('deleteCubePage', {
            
            isLoggedIn: req.isLoggedIn
        })
    })

    app.get('/create', authAccess, getUserStatus, (req, res) => {
        res.render('create', {
            title: 'Create | Cube',
            isLoggedIn: req.isLoggedIn
        })
    })

    app.post('/create', authAccessJSON, (req, res) => {
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

    app.get('/details/:id',getUserStatus, async (req, res) => {
        
        const cube = await getCubeWithAccessories(req.params.id)
        
        res.render('details', {
            title: 'Details | Cube details',
            ...cube,
            cube,
            isLoggedIn: req.isLoggedIn
        })
    })
}