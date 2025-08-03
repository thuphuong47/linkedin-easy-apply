import dotenv from 'dotenv';
dotenv.config();

export const users = [
  {
    username: process.env.USERNAME1!,
    password: process.env.PASSWORD1!,
    storagePath: 'storage/user1.json'
  },
  {
    username: process.env.USERNAME2!,
    password: process.env.PASSWORD2!,
    storagePath: 'storage/user2.json'
  }
];