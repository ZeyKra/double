const fs = require('fs');
const FFmpeg = require('fluent-ffmpeg');
const { log } = require('console');
const cliProgress = require('cli-progress');
const colors = require('ansi-colors');

const reader = require('./reader.js');
const { on } = require('events');

const config = require("../config.json");




//le premier crop va enchainer les autres actions
var step = 0;

//crop(config.in.input_up, config.temp.crop_up)
//crop(config.in.input_up, config.temp.input_up)

//nextStep()

///audio(config.temp.stack, config.in.audio, config.out.render);

//audio("./stack-working.mp4", "./audio.mp3", "./output.mp4")


/**
 * Rognage de video format (1080x960)
 *  
 * @param {string} video chemin de la video
 * @param {string} path chemin de sortie
 * 
 */
function crop(video, path) {
    console.log(`» Cropping "${video}"`)

    var crop_bar = new cliProgress.SingleBar({
        format: 'Crop Progress |' + colors.yellowBright('{bar}') + '| {eta}s restantes',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: false
    });

    crop_bar.start(100, 0);

    return new Promise(function (resolve, reject) {
      FFmpeg()
        .addInput(video)
        .videoFilter("crop=1080:960")
        .on("progress", (progress) => {
          crop_bar.update(Math.round(progress.percent));
        })
        .on("end", () => {
          crop_bar.stop();
          resolve(`» Saved → "${path}"`);
        })
        .save(path);
    });

}

/**
 * Stackage des deux videos indiqués
 *  
 * @param {string} video_up chemin de la video_up
 * @param {string} video_down chemin de la video_down
 * @param {string} path chemin de sortie
 * 
 */
function stack(video_up, video_down, path) {
    console.log("Stacking ", video_up, "on", video_down);

    var stack_bar = new cliProgress.SingleBar({
        format: 'Stackbar Progress |' + colors.greenBright('{bar}') + '| {eta}s restantes',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: false
    });

    stack_bar.start(100, 0);

      
    return new Promise(function (resolve, reject) {
      FFmpeg()
        .addInput(video_up)
        .addInput(video_down)
        .inputOptions("-filter_complex vstack=inputs=2:shortest=1")
        .addOutputOption("-fps_mode vfr")

        .on("progress", (progress) => {
          stack_bar.update(Math.round(progress.percent));
        })
        .on("end", () => {
          stack_bar.stop();
          resolve(`» Saved → "${path}"`);
        })
        .save(path);
    });

        
}

/**
 * Ajout d'un audio sur un video 
 *  
 * @param {string} video chemin de la video
 * @param {string} audio chemin de l'audio
 * @param {string} render chemin de sortie
 * 
 */
function audio(video, audio, render) {
    //ffmpeg -i video.mp4 -i audio.wav -c:v copy -c:a aac output.mp4

    var audio_bar = new cliProgress.SingleBar({
        format: 'Audio Progress |' + colors.magenta('{bar}') + '| {eta}s restantes',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: false
    });

    audio_bar.start(100, 0);

    FFmpeg()
        .addInput(video)
        .addInput(audio)
        /* ffmpeg \
    -i video1.mp4 -i audio1.mp3 \
    -c:v copy \
    -map 0:v -map 1:a \
    -shortest \
    -y output.mp4 */
        .output(render) //your output path
        .outputOptions(['-map 0:v', '-map 1:a', '-c:v copy', '-shortest'])
        .on('progress', (progress) => {
            //log('percent:', Math.round(progress.percent))
            audio_bar.update(Math.round(progress.percent));
        })
        .on('end', () => {
            audio_bar.stop()
            console.log(`» Saved → "${render}"`);
        })
        .on('error', (err) => 
        {
            console.error(err);
        })
        .run()
        //.save(render);
        
}


/**
 * Fonction qui sequence les actions 
 * 
 */
function action() {
    switch (step) {
        //Roniage de la top video
        case 0:
            crop(path, config.temp.crop_up);
            break;
        //Roniage de la down video
        case 1:
            crop(config.in.input_down, config.temp.crop_down);
            break;
        //stackage des deux video    
        case 2:
            stack(config.temp.crop_up, config.temp.crop_down, config.temp.stack);
            break;
        //application de l'audio sur la video
        case 3:
            audio(config.temp.stack, config.in.audio, config.out.render);
            break;
        default:
            break;
    }
}

/**
 * permet de passer a la prochaine action
 */
function nextStep() {
    step += 1;
    console.log(" ");
    //action();
}

function resize(video) {
    console.log('resizing', video);

    const resize_bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    resize_bar.start(100, 0);

    FFmpeg()
        .addInput(video)
        .videoFilter('scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:-1:-1,setsar=1')

        .on('progress', (progress) => {
            //log('percent:', Math.round(progress.percent))
            resize_bar.update(Math.round(progress.percent));
        })
        .on('end', () => {
            resize_bar.stop();
        })

        .save('./data/resize.mp4')
}

module.exports = {
    crop: crop,
    stack: stack,
    audio: audio
}