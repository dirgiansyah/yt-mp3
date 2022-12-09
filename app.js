const readline = require('readline');
const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')

if (process.argv.length > 2) {
    let args = process.argv
    args.filter((d,i) => i > 1).map((d) => {
        let stream = ytdl(d, {
            quality: 'highestaudio',
        });
          
        let start = Date.now();
        ffmpeg(stream)
            .audioBitrate(128)
            .save(`${__dirname}/${d}.mp3`)
            .on('progress', p => {
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`${p.targetSize}kb downloaded`);
            })
            .on('end', () => {
                console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
            });
    })
} else {
    console.log("Id not found")
}