const Accessory = require('../models/accessory')

const getAccessories = async () => {
    const accessorise = await Accessory.find().lean()

    return accessorise
}

module.exports = {
    getAccessories
}