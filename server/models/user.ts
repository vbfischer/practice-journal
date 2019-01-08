import { Schema, Document, Model, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { PassportLocalSchema, PassportLocalDocument } from "mongoose";

export interface IUserDocument extends Document {
  username: string;
  active: boolean;
}

export interface IUser extends IUserDocument {}

export interface IUserModel extends Model<IUser> {}

export const userSchema: PassportLocalSchema = new Schema({
  username: String,
  active: Boolean
});

userSchema.plugin(passportLocalMongoose, {
  usernameUnique: false,

  findByUsername: (model: any, queryParameters: any) => {
    queryParameters.active = true;
    return model.findOne(queryParameters);
  }
});

export interface UserInfo {
  _id: string;
  username: string;
  active: boolean;
}

export const User: IUserModel = model<IUser, IUserModel>("User", userSchema);
export default User;
