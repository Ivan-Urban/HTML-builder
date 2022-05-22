const { copyFile, mkdir, readdir, unlink } = require('fs/promises');
const path = require('path');

mkdir(path.join(__dirname, 'files-copy'), {recursive: true});

readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true}).then(res => {
  res.forEach(el => {
    unlink(path.join(__dirname, 'files-copy', el.name));
  });
});

readdir(path.join(__dirname, 'files'), {withFileTypes: true}).then(res => {
  res.forEach(el => {
    copyFile(path.join(__dirname, 'files', el.name), path.join(__dirname, 'files-copy', el.name));  
  });
});
