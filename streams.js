const fs = require("fs");

// reading a file

// fs.readFile("./docs/blog.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// });

// fs.writeFile("./docs/blog.txt", "Hey bro!", () => {
//   console.log("Completed wrting into file");
// });

const readStream = fs.createReadStream("./docs/me.jpg");
const writeStream = fs.createWriteStream("./docs/mecopy.jpg");

readStream.pipe(writeStream);
