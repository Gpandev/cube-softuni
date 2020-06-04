const Cube = require('../models/cube')

const newCube = new Cube('Rubik\'s Cube', 'This is Cube of Rubik', 'https://i2.offnews.bg/events/2014/05/19/337144/1400500076_4.jpg', 'Hard')
const newCube2 = new Cube('Rubik\'s Cube 2', 'This is Cube of Rubik 2', 'https://i2.offnews.bg/events/2014/05/19/337144/1400500076_4.jpg', 'Easy')
const newCube3 = new Cube('Rubik\'s Cube 3', 'This is Cube of Rubik 3', 'https://i2.offnews.bg/events/2014/05/19/337144/1400500076_4.jpg', 'Hard')
const newCube4 = new Cube('Rubik\'s Cube 4', 'This is Cube of Rubik 4', 'https://i2.offnews.bg/events/2014/05/19/337144/1400500076_4.jpg', 'Medium')



// newCube.save();
// newCube2.save();
// newCube3.save();
newCube4.save();