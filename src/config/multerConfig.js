import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./awsConfig.js";
import {AWS_BUCKET_NAME} from "./serverConfig.js";

// - multer() function returns a middleware
// - we can plug-in this uploader middleware, wherever needed
// - the configuration for the working of the uploader middleware will be passed as an object to the multer() function
// - using multer we can either store the incoming image on our server or on AWS S3 using the multer-s3 package
// - the 'storage' key tells where to store the file
// - acl stands for Access Control List
export const s3Uploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        // acl: "public-read",
        key: function(req, file, cb){
            console.log("File object down:")
            console.log(file);
            if(!file){
                console.log("File not found")
                return cb(new Error('File not found'));
            } // this section doesn't get triggered even if the request doesn't contain any image file, why?
            if(file.mimetype != "image/png" && file.mimetype != "image/jpeg"){
                return cb(new Error("File type not supported"));
            }
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // to make sure the key is unique
            cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split('/')[1]);
        }
    })
});