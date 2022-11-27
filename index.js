/*
    nerd emoji fancam 🤓❤️
    https://www.youtube.com/watch?v=qO4u-mmZBVQ

*/

const fs = require('fs');
const ytdl = require('ytdl-core');
const FFmpeg = require('fluent-ffmpeg')


const path = "./video.mp4";

/* 
  Importing Local modules
*/ 
const reader = require("./src/reader.js");
const edit =  require('./src/edit.js');
const download = require("./src/download.js")

let data = reader.getData('download.yml');
console.log(data);

console.log(data.videos.bottom.url);