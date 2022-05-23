const fs = require('fs');
const { mkdir, readdir, readFile, copyFile, unlink } = require('fs/promises');
const path = require('path');

mkdir(path.join(__dirname, 'project-dist'), {recursive: true});

const writableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));

let htmlIndex = '';

readdir(path.join(__dirname, 'components'), {withFileTypes: true}).then(async (components) => {
  htmlIndex = await readFile(path.join(__dirname, 'template.html'), 'utf-8');
  for (const component of components) {
    const componentName = component.name.slice(0, -5);
    const componentHTML = await readFile(path.join(__dirname, 'components', component.name));
    htmlIndex = htmlIndex.replace(`{{${componentName}}}`, componentHTML);
  }
}).then(() => {writableStream.write(htmlIndex);});

const writableStyle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, res) => {
  res.forEach((el) => {
    if (path.extname(el.name) === '.css') {
      const readableStream = fs.createReadStream(path.join(__dirname, 'styles', el.name), 'utf-8');
      readableStream.on('data', chunk => writableStyle.write(chunk));
    }
  });
});

mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true});

function deleteAssets(dest) {
  readdir(dest, {withFileTypes: true}).then(res => {
    res.forEach(el => {
      if (el.isDirectory()) {
        // mkdir(path.join(dest, el.name), {recursive: true});
        deleteAssets(path.join(dest, el.name));
      } else {
        unlink(path.join(dest, el.name)); 
      } 
    });
  });
}

deleteAssets(path.join(__dirname, 'project-dist', 'assets'));

function copyAssets(src, dest) {
  readdir(src, {withFileTypes: true}).then(res => {
    res.forEach(el => {
      if (el.isDirectory()) {
        mkdir(path.join(dest, el.name), {recursive: true});
        copyAssets(path.join(src, el.name), path.join(dest, el.name));
      } else {
        copyFile(path.join(src, el.name), path.join(dest, el.name)); 
      } 
    });
  });
}

copyAssets(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
