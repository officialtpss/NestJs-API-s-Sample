import { Document } from 'mongoose';

export interface UserData extends Document {
  readonly name: string;
  readonly _id: string;
  readonly email: string;
}
