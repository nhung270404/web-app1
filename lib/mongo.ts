// import mongoose from 'mongoose';
//
// if (!process.env['MONGODB_URI']) {
//   throw new Error('Vui lòng đặt biến môi trường MONGODB_URI trong .env.local');
// }
//
// const uri = process.env['MONGODB_URI'];
//
// /**
//  * Cached connection for MongoDB.
//  */
// let cached = global.mongoose;
//
// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }
//
// async function dbConnect() {
//   if (cached) {
//     if (cached.conn) {
//       return cached.conn;
//     }
//
//     if (!cached.promise) {
//       console.log('Connecting to MongoDB...', uri);
//       cached.promise = mongoose.connect(uri).then((mongoose) => {
//         return mongoose;
//       });
//     }
//     cached.conn = await cached.promise;
//     return cached.conn;
//   }
// }
//
// export default dbConnect;


import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// eslint-disable-next-line no-var
declare global {
  var mongoose: MongooseCache | undefined;
}

const globalForMongoose = global as typeof global & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache =
  globalForMongoose.mongoose ?? { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  globalForMongoose.mongoose = cached;

  return cached.conn;
}
