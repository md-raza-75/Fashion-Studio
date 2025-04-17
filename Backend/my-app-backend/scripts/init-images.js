const fs = require('fs');
const path = require('path');
const https = require('https');

// Directory to save images
const imagesDir = path.join(__dirname, '../public/images');

// Make sure directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('Created images directory');
}

// Sample image URLs
const images = {
  'p1.jpg': 'https://rukminim2.flixcart.com/image/850/1000/xif0q/kurta/i/g/e/xxl-black-kurta-101-jaffry-fashion-original-imag4kgbsfsadkku-bb.jpeg',
  'k2.jpg': 'https://rukminim2.flixcart.com/image/850/1000/kt8zb0w0/kurta/g/l/a/s-w-kurtaa-s-style-sky-original-imag6n4exha7knhw.jpeg',
  's1.jpg': 'https://rukminim2.flixcart.com/image/850/1000/xif0q/sari/r/g/c/free-mfs-103-madshe-fashion-unstitched-original-imagcuefhh5htsmg-bb.jpeg',
  'k3.jpg': 'https://rukminim2.flixcart.com/image/850/1000/kaijgy80/gown/k/h/r/free-free-dlpink-dlpink-original-imafs2dh5z7kbvg8.jpeg',
  's8.jpg': 'https://rukminim2.flixcart.com/image/850/1000/xif0q/necklace-chain/d/j/7/1-gold-nckdmnd103-mahi-18-original-imagh45pyrgmxfum.jpeg',
  'default-product.jpg': 'https://rukminim2.flixcart.com/image/850/1000/ktyp8cw0/dress/h/b/y/m-ttj6006079-tokyo-talkies-original-imag76qz8ytshvzn.jpeg',
  'default-category.jpg': 'https://rukminim2.flixcart.com/image/850/1000/l26hdow0/fabric/j/c/y/yes-2-35-m-unstitched-na-nkrbp43-vriksh-original-imagdkmhfgjx9hmt.jpeg',
  'model1.jpg': 'https://rukminim2.flixcart.com/image/850/1000/ksgehsw0/dress/m/6/f/l-ttj1022-tokyo-talkies-original-imag6yc4yfvnfg5j.jpeg',
  'model2.jpg': 'https://rukminim2.flixcart.com/image/850/1000/k0plpjk0/sari/9/h/s/free-kanjivaram-silk-saree-ejoty-fashion-original-imafkg5yesdvydxc.jpeg',
  'model3.jpg': 'https://rukminim2.flixcart.com/image/850/1000/kpmy8i80/sari/s/q/m/free-kanjivaram-silk-saree-ejoty-fashion-unstitched-original-imag3tzfcnqke9u8.jpeg'
};

// Download function
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`File ${filename} already exists`);
      resolve();
      return;
    }
    
    console.log(`Downloading ${filename}...`);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file on error
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
}

// Download all images concurrently
async function downloadAllImages() {
  try {
    const promises = Object.entries(images).map(([filename, url]) => 
      downloadImage(url, filename)
    );
    
    await Promise.all(promises);
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

// Start download
downloadAllImages(); 