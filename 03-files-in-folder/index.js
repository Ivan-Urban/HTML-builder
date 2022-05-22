const { readdir, stat } = require('fs/promises');
const path = require('path');


readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}).then(res => {
  res.forEach(el => {
    stat(path.join(__dirname, 'secret-folder', el.name)).then(stats => {
      if (el.isFile()) console.log(`${path.basename(el.name, path.extname(el.name))} - ${path.extname(el.name).slice(1)} - ${stats.size}b`);
    });
  });
});
