import { Document, Schema, model, models } from 'mongoose';

interface IUser {
    email: string, 
    username: string,
    image?: string;
}

interface IUserModel extends IUser, Document {}

const UserSchema = new Schema<IUserModel>({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }
});

const User = models.User || model("User", UserSchema)

export default User