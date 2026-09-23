const fs = require('fs');
const path = require('path');

const src = 'C:/Users/RSM_F/.gemini/antigravity-ide/brain/8cef0900-b21d-4961-9218-87cc167105a2/media__1790094670652.png';
const dst1 = path.join(__dirname, 'assets', 'mahendra_seal_logo.png');
const dst2 = path.join(__dirname, 'assets', 'mahendra_seal.png');

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst1);
    fs.copyFileSync(src, dst2);
    console.log('✅ SUCCESS: Copied original seal image to assets/mahendra_seal_logo.png');
  } else {
    console.log('Src file not found at: ' + src);
  }
} catch (err) {
  console.error('Copy Error:', err);
}
