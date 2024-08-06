import mongoose, { Model } from "mongoose";

type UserDocument = mongoose.Document & {
    name: string;
    email: string;
    password: string;
    role: string;
    is_delete: boolean;
};

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
    is_delete: { type: Boolean, default: false }
}, { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } });

export interface IUserModel extends Model<UserDocument> {

}

const User = mongoose.model<UserDocument, IUserModel>(
    "User",
    userSchema
)

export default User;