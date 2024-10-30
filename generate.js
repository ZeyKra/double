const reader = require("./src/reader.js");
const edit =  require('./src/edit.js');
const download = require("./src/download.js");

const config = require("./config.json");
let data = reader.getData("download.yml");

const log = (text) => console.log(text); 

( async () => {

    
    let codecs;

    codecs = await download.getAvailableCodecs(data.videos.top.url, data.videos.top.quality); 
    let topItag = await download.getItag(codecs, "avc1");
    await download.download(data.videos.top.url, "./temp/top.mp4", topItag);
    console.log("Top Video downloaded");

    codecs = await download.getAvailableCodecs(data.videos.bottom.url, data.videos.bottom.quality); 
    let bottomItags = await download.getItag(codecs, "avc1");
    await download.download(data.videos.bottom.url, "./temp/bottom.mp4", bottomItags);
    console.log("bottom Video downloaded"); 

    download.audioDownload(data.videos.top.url, data.videos.top.start, data.videos.top.duration, "./temp/");
 

    await edit.crop(config.temp.top, config.temp.crop_up)
      .catch( (error) => console.error(error))
      .then( (result) => { console.log(result)});
      
    await edit.crop(config.temp.bottom, config.temp.crop_down)
      .catch( (error) => console.error(error))
      .then( (result) => { console.log(result)}); 

    
    await edit.stack(config.temp.crop_up, config.temp.crop_down, config.temp.stack)
      .catch( (error) => console.error(error))
      .then( (result) => { console.log(result)});  
    
    await edit.audio(config.temp.stack, config.temp.audio, config.out.render);  
      


  

    /*
    await download
      .getAvailableCodecs(data.videos.bottom.url, data.videos.bottom.quality)
      .then((result) => {

        let itag = download.getItag(result, "avc1");
        download.download(data.videos.bottom.url, "./temp/bottom.mp4", itag)

      });
    console.log("finished")*/




})();