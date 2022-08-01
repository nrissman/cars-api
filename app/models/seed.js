// seed.js is going to be the file we run, whenever we want to seed our database, we'll create a bunch of cars at once.

// we want to be careful with this, because when we run it, it'll delete all of the cars in the db. 

// we can modify this later, to only delete cars that don't have an owner already, but we'll keep it simple for now.

const mongoose = require('mongoose')
const Car = require('./car')
const db = require('../../config/db')


const startCars = [
    { name: 'Lynn', make: 'Toyota', model: 'Supra Turbo', year: 1998 },
    { name: 'Tina', make: 'Porsche', model: '996', year: 1999 },
    { name: 'Shannon', make: 'Plymouth', model: 'Hemi Cuda', year: 1971 },
    { name: 'Anne', make: 'Ford', model: 'F-350 7.3L Turbo', year: 1990 }
]

// first we need to connect to the database
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // first we remove all of the cars
        Car.deleteMany({owner: null})
            .then(deletedCars => {
                console.log('deletedCars', deletedCars)
                // the next step is to use our startcars array to create our seeded cars
                Car.create(startCars)
                    .then(newCars => {
                        console.log('the new cars', newCars)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })