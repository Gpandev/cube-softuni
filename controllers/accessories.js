const Accessory = require('../models/accessory')
const Cube = require('../models/cube')

const getAccessories = async () => {
    const accessories = await Accessory.find().lean()

    return accessories
}

const attachedAccesories = async (cubeId) => {
    try {
        const cube = await Cube.findById(cubeId).lean()
        const accessories = await Accessory.find({ cubes: {$nin: cubeId}})
        return { cube, accessories }
    } catch (error) {
        return error
    }
}

module.exports = {
    getAccessories,
    attachedAccesories
}