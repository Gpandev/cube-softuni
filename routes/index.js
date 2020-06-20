
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require('../controllers/cubes')
const { getAccessories } = require('../controllers/accessories')
const Cube = require('../models/cube')
const Accessory = require('../models/accessory')

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

    app.get('/create/accessory', (req, res) => {
        res.render('createAccessory', {
            title: 'Create accessory'
        }) 
    })

    app.post('/create/accessory', async (req, res) => {
        const {
            name,
            description,
            imageUrl
        } = req.body

        const accessory = new Accessory({name, description, imageUrl})

        await accessory.save()

        res.redirect('/create/accessory')
    })

    app.get('/attach/accessory/:id', async (req, res) => {

        const cube = await getCube(req.params.id)
        const accessories = await getAccessories()

        const cubeAccessories = cube.accessories.map(acc => acc._id.valueOf().toString())

        const notAttachedAccessories = accessories.filter(acc => {
          const accString = acc._id.valueOf().toString()
          return !cubeAccessories.includes(accString)  
        })  

        const canAttachAccessory =cube.accessories.length !== accessories.length &&  accessories.length > 0

        res.render('attachAccessory', {
            title: 'Attach accessory',
            cube, 
            accessories: notAttachedAccessories,
            canAttachAccessory
        }) 
    })

    app.post('/attach/accessory/:id', async (req, res) => {
        const {
            accessory
        } = req.body
        
        await updateCube(req.params.id, accessory)

        res.redirect(`/details/${req.params.id}`)
    })

    app.get('/*', (req, res) => {
        res.render('404', {
            title: '404 not found'
        })
    })
};