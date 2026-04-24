// for connecting to mongodb instance, we need
// - url of the instance (to be connected to)
// - library (that has all the logic to connect to MongoDB)

// some popular libraries : mongodb, mongoose, prisma

// 📍 ORMs and ODMs
// - ORM stands for object relational mapper
// - ODM stands for object document mapper
// - both serve the same purpose
// - ORM is for relational DBs
// - ODM is for document based DBs

// - as developers, we don't like to write raw queries like 'SELECT * FROM table_name' or 'db.user.find()'
// - we like OOP based syntax

// - these libraries (ODMs and ORMs) provide us object oriented functions (so that we don't have to write raw queries)
// - the ODMs / ORMs will convert those object oriented functions into raw queries

import mongoose from "mongoose";
import {DB_URL} from "./serverConfig.js";
// 📝 in Standard Node.js ESM (ES Modules), we must include the file extension (like .js or .mjs) when importing local files.

export default async function connectDB() {
    try {
        console.log(`DB_URL is ${DB_URL}`);
        await mongoose.connect(DB_URL);
        console.log('connected to mongoDB');
    }
    catch(error) {
        console.log('something went wrong while connecting to mongoDB');
        console.log(error);
    }
};