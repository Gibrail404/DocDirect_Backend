import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
        minLength: [10, "Must contain at least 10 characters !"],
    },
});

export const Message = mongoose.model("Message", messageSchema);