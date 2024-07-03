import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At least 3 Character !"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At least 3 Character !"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid Email !"],
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone must contain 10 digits !"],
        maxLength: [10, "Phone must contain 10 digits !"],
    },
   nic: {
        type: String,
        required: true,
        minLength: [13, "NIC must contain 13 digits !"],
        maxLength: [13, "NIC must contain 13 digits !"],
    },
    dob: {
        type: Date,
        required: [true, "DOB is required !"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain 8 characters !"],
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    },
});

userSchema.pre("save", async function(next){
    if( !this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};



export const User = mongoose.model("User", userSchema);