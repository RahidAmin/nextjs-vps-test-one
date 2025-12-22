import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
    name: string;
    age: number;
    gender: string;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
});

export default models.User || model<IUser>("User", UserSchema);
