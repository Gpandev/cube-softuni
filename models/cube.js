const { v4 } = require('uuid');
const fs = require('fs')
const path = require('path')

const databaseFile = path.join(__dirname, '..', 'config/database.json')

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4()
        this.name = name || 'Name missing'
        this.description = description 
        this.imageUrl = imageUrl || 'placeholder'
        this.difficulty = difficulty || 0
    }

    save() {
        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }

        fs.readFile(databaseFile, (err, readData) => {
            if(err) {
                throw err
            }
            const cubes = JSON.parse(readData)
            cubes.push(newCube)

            fs.writeFile(databaseFile, JSON.stringify(cubes), err => {
                if(err) {
                    throw err;
                }
                console.log('New cube is successfully stored in DB')
            })
        })  
    }
}


module.exports = Cube