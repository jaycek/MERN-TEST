import multer from 'multer'


// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, image, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, image, cb) => {
    
    cb(null, Date.now() + '-' + image.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

export {upload}
