//car is going to have an owner fields that is a user 

const mongoose = require('mongoose')

const { Schema, model } = mongoose

const carSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        make: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
    },{
        timestamps: true,
         // we're going to be adding virtuals to our model, the following lines will make sure that those virtuals are included whenever we return JSON or an Object
        toObject: { virtuals: true },
        toJSON: { virtuals: true }

    }
)


// virtuals go here
// these are virtual properties, that use existing data(saved in the database), to add a property whenever we retieve a document and convert it to JSON or an object.
carSchema.virtual('fullTitle').get(function () {
    // in here, we can do whatever javascripty things we want, to make sure we return some value that will be assigned to this virtual
    // fullTitle is going to combine the name and type to build a title
    return `${this.name} The ${this.year} ${this.make} ${this.model}`
})

carSchema.virtual('isALateModel').get(function () {
    if (this.year > 2017) {
        return "its new... but is it cool"
    } else if (this.year <= 2017 && this.year > 1997) {
        return "not old, but its getting cooler"
    } else {
        return "yeah its old, but damn its cool)"
    }
})


module.exports = model('car', carSchema)