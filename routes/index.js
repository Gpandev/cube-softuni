// TODO: Require Controllers...

module.exports = (app) => {
    
    app.get('/', (req, res) => {
        res.render('index', {
            title: 'Cubes'
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

    app.get('/details/:id', (req, res) => {
        res.render('details', {
            title: 'Details | Cube details'
        })
    })

    app.get('/*', (req, res) => {
        res.render('404', {
            title: '404 not found'
        })
    })
};