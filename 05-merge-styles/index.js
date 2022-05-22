const fs = require('fs');
const path = require('path');

const writableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, res) => {
  res.forEach((el) => {
    if (path.extname(el.name) === '.css') {
      const readableStream = fs.createReadStream(path.join(__dirname, 'styles', el.name), 'utf-8');
      readableStream.on('data', chunk => writableStream.write(chunk));
    }
  });
});