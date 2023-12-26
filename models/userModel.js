import mongoose from "mongoose";
import bcrypt from 'bcryptjs'



const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default : false,
        required: true
    },
    
}, {
    timestamps: true,
})

// check if the entered password matches the password that user had in the database while logging in;
UserSchema.methods.matchPassword = async function(enteredPassword)  {
    return await bcrypt.compare(enteredPassword, this.password)
}

// hash the user password before saving it to the database;
UserSchema.pre('save', async function(next) {
     if(!this.isModified('password')) {
        next()
     }
     const salt = await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User;
