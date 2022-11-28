const fs = require("fs");
const path = require("path");

console.log("Reorder Sprite");

const moveFrom = "./from";
const moveTo = "./to";

// Make an async function that gets executed immediately
(async () => {
  // Our starting point
  try {
    // Get the files as an array
    const files = await fs.promises.readdir(moveFrom);

    // Loop them all with the new for...of
    for (const file of files) {
      // Get the full paths
      const fromPath = path.join(moveFrom, file);
      //const toPath = path.join(moveTo, file);

      // Stat the file to see if we have a file or dir
      const stat = await fs.promises.stat(fromPath);

      if (stat.isFile()) {
        //console.log("'%s' is a file.", fromPath);
        const newFileNumber = getNewFileNumber(file);
        if (newFileNumber !== undefined) {
          console.log("file = ", file, newFileNumber);
          const toPath = path.join(moveTo, `${newFileNumber}.png`);
          await fs.promises.copyFile( fromPath, toPath );
          console.log( "Moved '%s'->'%s'", fromPath, toPath );
        }

      }

      // // Now move async
      // await fs.promises.rename( fromPath, toPath );
      //
      // // Log because we're crazy
      // console.log( "Moved '%s'->'%s'", fromPath, toPath );
    } // End for...of
  } catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
})(); // Wrap in parenthesis and call now

function getFileNumber(file) {
  return file.split("_")[1];
}

function getNewFileNumber(file, i) {
  const numberString = getFileNumber(file);
  const number = parseInt(numberString, 10);
  if (number < 48) {
    if (number < 48 && number % 6 === 0) {
      return number / 6;
    }

    if (number % 6 === 1) {
      return Math.round(number / 6 + 8);
    } else if (number % 6 === 2) {
      return Math.round(number / 6 + 16);
    } else if (number % 6 === 3) {
      return Math.round(number / 6 + 24);
    } else if (number % 6 === 4) {
      return Math.round(number / 6 + 32);
    } else if (number % 6 === 5) {
      return Math.round(number / 6 + 40);
    }
  } else {
    if (number % 6 === 1) {
      return Math.round(number / 6 + 8+48);
    } else if (number % 6 === 2) {
      return Math.round(number / 6 + 16+48);
    } else if (number % 6 === 3) {
      return Math.round(number / 6 + 24+48);
    } else if (number % 6 === 4) {
      return Math.round(number / 6 + 32+48);
    } else if (number % 6 === 5) {
      return Math.round(number / 6 + 40+48);
    }
  }

  // else if (number % 6 === 2) {
  //   return 8* number + 4;
  // } else if (number % 6 === 3) {
  //   return number + 3;
  // }
  // else if (number % 6 === 4) {
  //   return number + 2;
  // } else if (number % 6 === 5) {
  //   return number + 1;
  // }

  //return number / 6;

  // if (number % 6 === 0) {
  //     return number;
  //
  // }
}
