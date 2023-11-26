import multer from 'multer';
import fs from 'fs';

// Define ImageFolder globally
const destinationFolder = 'images_assets/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the folder 
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const uploaded = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'productImage', maxCount: 8 },
]);
