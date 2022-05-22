const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');

const writableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Введите текст\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') process.exit();
  writableStream.write(data);
});

process.on('exit', () => stdout.write('Выполнение завершено. Всего доброго!'));
process.on('SIGINT', () => process.exit());