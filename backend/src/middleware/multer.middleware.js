import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")

    },
    filename: function (req, file, cb) {

        cb(null, `${Date.now()}-${file.originalname}`);
    }
})


const upload = multer({ storage: storage });


// const storage = multer.memoryStorage(); // store file in memory as buffer
// const upload = multer({ storage });



export default upload;