const reader = require("../src/reader.js");
const edit =  require('../src/edit.js');
const download = require("../src/download.js");

let data = reader.getData("download.yml");

//download.download(data.videos.top.url , "./temp/top.mp4");
//download.download(data.videos.bottom.url , "./temp/bottom.mp4");

/*
function downloadEach() {
    return new Promise(function (resolve, reject) {
        var resolveCount = 0;
        download
          .getAvailableCodecs(data.videos.top.url, data.videos.top.quality)
          .then((result) => {
              let itag = download.getItag(result, "avc1");
              download.download(data.videos.top.url, "./temp/top.mp4", itag)
                  .then((result) => {
                      resolveCount++;
                      console.log(resolveCount)
                      if(resolve == 2) resolve("fini les deux dl");
                });
          });

        download
          .getAvailableCodecs(data.videos.bottom.url, data.videos.bottom.quality)
          .then((result) => {
              let itag = download.getItag(result, "avc1");
              download.download(data.videos.bottom.url, "./temp/bottom.mp4", itag)
                  .then((result) => {
                      resolveCount++;
                      console.log(resolveCount)
                      if(resolve == 2) resolve("fini les deux dl");
                });
          });
    });
}*/

// downloadEach().then((res) => console.log(res))




/*    
download.getAvailableCodecs(data.videos.bottom.url, data.videos.bottom.quality)
    .then( (result) => { console.log("Bottom :", result) }); */

/*
download.download(data.videos.top.url, `./temp/${data.videos.top.name}`)
    .then( (res) => { console.log("Hello squidgame butternut ! :" + res)}) */

//console.log(formats)

download.audioDownload("https://www.youtube.com/watch?v=_cyND_1y1k0", "00:00:10", 20, "./temp/");