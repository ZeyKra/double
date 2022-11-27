const fs = require('fs');
const ytdl = require('ytdl-core');

// Iayze - Bend : https://www.youtube.com/watch?v=PeI07lpSpjM
// Iayze - No GTA : https://www.youtube.com/watch?v=77-JI9SiByg

//soap
var name = 'video'

download('https://www.youtube.com/watch?v=PeI07lpSpjM', './soap.mp4')

/**
 * Ajout d'un audio sur un video 
 *  
 * @param {download}  chemin de la video
 * 
 */
function download(link, path) 
{
  ytdl(link, { quality: '137' })
    .pipe(fs.createWriteStream(path))
    .on("finish", function() 
    {
      console.log("!");
  
  });
}
