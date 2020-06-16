
const { getAllCubes } = require('../controllers/cubes')
const { getCube } = require('../controllers/database')
const Cube = require('../models/cube')

module.exports = (app) => {
    
    app.get('/', async (req, res) => {
        const cubes = await getAllCubes()
        res.render('index', {
            title: 'Cubes',
            cubes
        })
        
    })

    app.get('/about', (req, res) => {
        res.render('about', {
            title: 'About | Cubes'
        })
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

        const cube = new Cube({name, description, imageUrl, difficulty: difficultyLevel})

        cube.save((err) => {
            if(err) {
                console.error(err)
            } else {
                res.redirect('/')
            }
        })
    })

    app.get('/details/:id', (req, res) => {
        
        getCube(req.params.id, (cube) => {

            res.render('details', {
                title: 'Details | Cube details',
                cube
            })
        })
    })

    app.get('/*', (req, res) => {
        res.render('404', {
            title: '404 not found'
        })
    })
};