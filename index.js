/*
    nerd emoji fancam 🤓❤️
    https://www.youtube.com/watch?v=qO4u-mmZBVQ

*/

const fs = require('fs');
const ytdl = require('ytdl-core');
const FFmpeg = require('fluent-ffmpeg')
const path = "./video.mp4";

/*
fs.unlink(path, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("File removed:", path);
  }
});*/

// Iayze - Bend : https://www.youtube.com/watch?v=PeI07lpSpjM
// Iayze - Oh Lord : https://www.youtube.com/watch?v=77-JI9SiByg
// KanKan - AP Skelly : https://www.youtube.com/watch?v=hROtGsW1A-E
/*
ytdl('https://www.youtube.com/watch?v=77-JI9SiByg')
  .pipe(fs.createWriteStream('video2.mp4'))
  .on("finish", function() {
    console.log("Finished!");

});*/


const input0 = './video.mp4'
const input1 = './video2.mp4'

  
FFmpeg()
        .addInput(input0)
        .addInput(input1)
        .inputOption('-filter_complex vstack=inputs=2:shortest=1')
        .save('output.mp4'); 
  

//ffmpeg -i input0.mp4 -i input1.mp4 -filter_complex vstack=inputs=2 vertical-stack-output.mp4 