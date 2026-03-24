import { mongoose } from 'mongoose';
import { GENDER, STATUS, USER_ROLES } from '../../Utils/index.js';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim:true,
        minLength:[3, 'First Name Must Be At Least 3 Characters Long.'],
        maxLength:[50, 'Last Name Must Be Less Than 50 Characters Long.']
    },
    lastName: {
        type: String,
        required: true,
        trim:true,
        minLength:[3, 'First Name Must Be At Least 3 Characters Long.'],
        maxLength:[50, 'Last Name Must Be Less Than 50 Characters Long.']

    },
    email: {
        type: String,
        required: true,
        index:{
            name:'email_unique',
            unique:true
        }
    },
    Password: { 
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:Object.values(USER_ROLES)
    },
    gender:{
        type:String,
        enum:Object.values(GENDER)
    },
    status:{
        type:String,
        enum:Object.values(STATUS),
        default:STATUS.ACTIVE
    },
    Phone: { 
        type: String,
        required: false
    },
    age: {
        type: Number,
        min: [18, 'Age must be at least 18'], // Must be between 18 and 60
        max: [60, 'Age cannot exceed 60']
    }
}, {
    toJSON:{getters:true},
    toObject:{getters:true}
});

userSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
})

const User =  mongoose.model('User', userSchema)

export default User
