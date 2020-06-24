const { getAllCubes } = require('../controllers/cubes')

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

    app.get('/*', (req, res) => {
        res.render('404', {
            title: '404 not found'
        })
    })
};