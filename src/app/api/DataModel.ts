import mongoose from "mongoose";
const { Schema } =mongoose

const userSchema = new Schema({
    id: Number,
    userName: String,
    chats: Array<Object>,
    profilePicture: String,
})

const messageSchema = new Schema({

})

export default userSchema