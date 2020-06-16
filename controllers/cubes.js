const Cube = require('../models/cube')

const getAllCubes = async () => {
   const cubes = await Cube.find()

   return cubes;
}  

module.exports = {
    getAllCubes
}