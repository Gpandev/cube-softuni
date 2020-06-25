const { getAllCubes } = require('../controllers/cubes')
const { getUserStatus } = require('../controllers/user')

module.exports = (app) => {
    
    app.get('/', getUserStatus,  async (req, res) => {
        const cubes = await getAllCubes()
        res.render('index', {
            title: 'Cubes',
            cubes,
            isLoggedIn: req.isLoggedIn
        })
    })

    app.get('/about', getUserStatus, (req, res) => {
        res.render('about', {
            title: 'About | Cubes',
            isLoggedIn: req.isLoggedIn
        })
    })

    app.get('/logout', (req, res) => {
        res.clearCookie('aid')

        res.redirect('/')
    })

    app.get('/*', (req, res) => {
        res.render('404', {
            title: '404 not found'
        })
    })
};