// 🕰️ OLD CODE

// import express from "express";
// import connectDB from "./config/dbConfig.js";
// import { createPost } from "./controllers/postController.js";
// import { s3Uploader } from "./config/multerConfig.js";
// // 📝 in Standard Node.js ESM (ES Modules), we must include the file extension (like .js or .mjs) when importing local files.

// const PORT = 3000;

// const app = express();

// // 📍 adding express provided middlewares to deserialize data
// app.use(express.json());
// app.use(express.text());
// app.use(express.urlencoded());

// // app.get('/ping',(req, res)=>{
// //     return res.json({message: 'pong'});
// // });
// // 📍 testing url params
// // app.get('/ping/:name',(req, res)=>{
// //     const name = req.params.name;
// //     return res.json({message: 'pong' + " " + name});
// // });
// // 📍 testing query params
// // app.get('/ping/:name',(req, res)=>{
// //     const name = req.params.name;
// //     console.log(req.query);
// //     return res.json({message: 'pong' + " " + name});
// // });
// // 📍 testing request body
// app.get('/ping/:name',(req, res)=>{
//     const name = req.params.name;
//     console.log(req.query);
//     console.log(req.body);
//     return res.json({message: 'pong' + " " + name});
// });

// function m1(req, res, next){
//     console.log('middleware m1');
//     next();
// }
// function m2(req, res, next){
//     console.log('middleware m2');
//     next();
// }
// function m3(req, res, next){
//     console.log('middleware m3');
//     next();
// }

// // 📍 testing middleware chaining
// // app.post('/posts', m1, m2, m3, createPost);
// // - another way to chain middlewares is to use an array of middlewares
// // app.post('/posts', [m1, m2, m3], createPost);

// // 📍 testing the s3Uploader middleware
// app.post('/posts', s3Uploader.single('image'), createPost);
// // - we used .single() because we want to upload a single file

// // app.post('/posts', createPost);

// app.listen(PORT, ()=>{
//     console.log(`Server running at ${PORT}`);
//     connectDB();
// });

// 🕰️ NEW CODE

// PHASE 1️⃣

// import express from "express";
// import connectDB from "./config/dbConfig.js";
// import postRouter from "./routers/post.js";
// import userRouter from "./routers/user.js";

// const PORT = 3000;

// const app = express();

// app.use(express.json());
// app.use(express.text());
// app.use(express.urlencoded());

// app.get('/ping/:name',(req, res)=>{
//     const name = req.params.name;
//     console.log(req.params);
//     console.log(req.query);
//     console.log(req.body);
//     return res.json({message: 'pong' + " " + name});
// });

// // - configuring server to use postRouter for handling requests hitting /posts
// app.use('/posts', postRouter); 

// app.use('/users', userRouter); 

// app.listen(PORT, ()=>{
//     console.log(`Server running at ${PORT}`);
//     connectDB();
// });

// PHASE 2️⃣

import express from "express";
import connectDB from "./config/dbConfig.js";
import apiRouter from "./routers/apiRouter.js";
import { isAuthenticated } from "./middlewares/authMiddleware.js";
import ip from 'ip';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

// app.get('/ping/:name',(req, res)=>{
//     const name = req.params.name;
//     console.log(req.params);
//     console.log(req.query);
//     console.log(req.body);
//     return res.json({message: 'pong' + " " + name});
// });

// 📍 authenticated ping
app.get('/ping', isAuthenticated,(req, res)=>{
// app.get('/ping/:name', isAuthenticated,(req, res)=>{
    // const name = req.params.name;
    // console.log("req.params : ");
    // console.log(req.params);
    // console.log("req.query : ");
    // console.log(req.query);
    // console.log("req.body : ");
    // console.log(req.body);
    // console.log("req.user : ");
    // console.log(req.user);
    const ipAddress = ip.address();
    return res.json({message: 'pong ' + ipAddress});
});

app.use('/api', apiRouter);

app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`);
    connectDB();
});