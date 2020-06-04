const fs = require('fs')
const path = require('path')

const databaseFile = path.join(__dirname, '..', 'config/database.json')

const saveCube = (cube) => {
    getCubes((cubes) => {
        
        cubes.push(cube)
    
        fs.writeFile(databaseFile, JSON.stringify(cubes), err => {
            if(err) {
                throw err;
            }
            console.log('New cube is successfully stored in DB')
        })
    })
}

const getCube = (id, cb) => {
    getCubes(cubes => {
       const cube = cubes.filter(c => c.id === id)[0]
       cb(cube)
    })
}

const getCubes = (callback) => {

    fs.readFile(databaseFile, (err, readData) => {
        if(err) {
            throw err
        }
        const cubes = JSON.parse(readData)
        callback(cubes)
    })  
}

module.exports = {
    getCube,
    getCubes,
    saveCube
}