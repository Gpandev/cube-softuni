const Cube = require('../models/cube')

const newCube = new Cube('Rubik\'s Cube', 'This is Cube of Rubik', 'https://i2.offnews.bg/events/2014/05/19/337144/1400500076_4.jpg', 'Hard')

console.log(newCube)


newCube.save();