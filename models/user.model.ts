import mongoose, { Document, Model, SchemaTypes } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IRole } from '@/models/role.model';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  password: string;
  email?: string;
  phone: string;
  address?: string[];
  roles: SchemaTypes.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isGod: boolean;
  validPassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    isGod: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [SchemaTypes.ObjectId],
      ref: 'Role',
      default: [],
    },
    address: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

UserSchema.methods.validPassword = async function (
  password: string
) {
  return bcrypt.compare(password, this.password);
};

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
