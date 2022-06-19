import mongoose from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  socketId: string;
  profileImage: string;
}

const userSchema = new mongoose.Schema<IUser>({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  socketId: { type: String, unique: true, required: true },
  profileImage: { type: String, default: null },
});

export const userModel = mongoose.model<IUser>("user", userSchema);

// [{
//   "_id": {
//     "$oid": "62ab7429fc13ae0ee1000898"
//   },
//   "socketId": "41bb2efb-f381-4362-bf48-158b887ea903",
//   "firstName": "Alberta",
//   "lastName": "Giron",
//   "email": "agiron0@trellian.com",
//   "username": "agiron0",
//   "password": "1SvvyykvylG",
//   "profileImage": "http://dummyimage.com/282x299.png/dddddd/000000"
// }]
