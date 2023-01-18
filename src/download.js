const { info } = require("console");
const fs = require("fs");
const { format, resolve } = require("path");
const ytdl = require("ytdl-core");
const ytmp3 = require('youtube-mp3-converter')



/**
 * ffads
 *
 * @param {download} chemin de la video
 *
 */
async function runSimilar(url1, url2) {
  let num = 0;
  let prom1, prom2;
  getFormat(url1).then((res) => {
    (prom1 = res), num++;
    if (num == 2) getSimilar(prom1, prom2);
  });

  getFormat(url2)
    .then((res) => {
      (prom2 = res), num++;
      if (num == 2) getSimilar(prom1, prom2);
    })

    [(url1, url2)].forEach(async (link) => {
      let info = await ytdl.getInfo(link);
      let formats = [];
      info.formats.forEach(async (format) => {
        formats.push({
          itag: format.itag,
          mimeType: format.mimeType,
          qualityLabel: format.qualityLabel,
        });
      });
      return formats;
    });
}

/**
 * Renvoie les codecs mp4 disponibles pour une video
 *
 * @param {string} link lien youtube de la vidéo
 * @param {string} label qualité (ex:  1080p, 720p)
 *
 * @return les codecs(mp4) disponibles
 */
async function getAvailableCodecs(link, label) {
  let info = await ytdl.getInfo(link);
  let formats = [];

  info.formats.forEach(async (format) => {
    if (
      format.mimeType.includes("mp4") &&
      format.qualityLabel != null &&
      format.qualityLabel.includes(label)
    ) {
      formats.push({
        itag: format.itag,
        mimeType: format.mimeType,
        qualityLabel: format.qualityLabel,
      });
    }
  });

  return formats;
}

/**
 * recupéré le meilleur Itag pour une resolution
 *
 * @param {string} url lien youtube de la vidéo 
 * @param {string} label qualité (ex:  1080p, 720p)
 * @param {}
 *
 * @return {number} l'itag
 */
function getItag(avaiable, codec) {
  let res = "no itag found !"

  avaiable.forEach((elm) => {
    if(elm.mimeType.includes(codec)) res = elm.itag
  })

  return res
} 

/**
 * Telecharge une video au chemin voulue
 *
 * @param {string} url lien youtube de la vidéo
 * @param {string} path chemin de sauvegarde
 * @param {number} itag default 399
 *
 * @return video
 */
function download(url, path, itag=399) {

  return new Promise(function (resolve, reject) {
    let result = ytdl(url, { quality: itag })
      .pipe(fs.createWriteStream(path))
      .on("finish", () => {
        resolve(result);
      });
  });

}

/**
 * Telecharge un audio(mp3) au chemin voulue
 *
 * @param {string} url lien youtube de l'audio
 * @param {string} start_time timestamp de départ
 * @param {number} duration longueur de l'audio
 * @param {string} path chemin de sauvegarde
 *
 * @return audio (.mp3)
 */
async function audioDownload(url, start_time, duration, path) {

  const convertLinkToMp3 = ytmp3(path)


    const pathToMp3 = await convertLinkToMp3(url, {
        startTime: start_time, // from where in the video the mp3 should start
        duration: duration, // Length of mp3 in seconds (from start point)
        title: 'audio.mp3' // The tile of the mp3 file, undefined it takes the youtube title
    })

    return await pathToMp3


   

}


module.exports = {
  download,
  getAvailableCodecs: getAvailableCodecs,
  getItag,
  audioDownload
};
