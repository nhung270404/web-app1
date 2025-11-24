import mongoose, { Document, Model, SchemaTypes } from 'mongoose';
import bcrypt from 'bcrypt';
import { IRole } from '@/models/role.model';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
  address: string[];
  roles: [IRole];
  createdAt: Date;
  updatedAt: Date;
  isGod: boolean;
  validPassword: (password: string) => Promise<boolean>;
  encryptPassword: (password: string) => Promise<string>;
}

const UserSchema = new mongoose.Schema<IUser>({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  isGod: {
    type: Boolean,
    required: true,
    default: true,
  },
  roles: {
    type: [SchemaTypes.ObjectId],
    required: true,
    ref: 'Role',
    default: null,
  },
  address: {
    type: [String],
  },
}, { timestamps: true });

UserSchema.methods.encryptPassword = async (password: string) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(10));
};
UserSchema.methods.validPassword = async function(password: string) {
  return bcrypt.compare(password, this.password);
};

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
