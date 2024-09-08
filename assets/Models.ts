import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
    userName: string;
    password: string;
    email: string;
    profilePic: string;
    chats: any[];
}

const UserSchema: Schema<IUser> = new Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    chats: { type: [Object], default: [] },
    profilePic: { type: String, default: '' },
});


const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;