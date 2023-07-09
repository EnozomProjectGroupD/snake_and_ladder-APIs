import multer from "multer";

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    const buffer = file.buffer;
    // reture buffer to controller
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
var storage = multer.memoryStorage();
var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

export default uploadFile;
