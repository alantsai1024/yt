const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const contentDisposition = require('content-disposition');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/download', async (req, res) => {
    let url = req.body.urlinput;
    const downloadType = req.body.downloadtype;
   
    try {
        // 對 URL 進行解碼
        url = decodeURIComponent(url);

        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        if (downloadType === 'MP3') {
            const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
            const fileName = `${title}.mp3`;
            res.set('Content-Disposition', contentDisposition(fileName));
            ytdl(url, { format: audioFormat }).pipe(res);
            
        } else if (downloadType === 'MP4') {
            const videoFormat = ytdl.chooseFormat(info.formats, { filter: 'audioandvideo', quality: 'highestvideo' });
            const fileName = `${title}.mp4`;
            res.set('Content-Disposition', contentDisposition(fileName));
            ytdl(url, { format: videoFormat }).pipe(res);

        } else {
            res.status(400).send('Invalid download type');
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error downloading the video/audio');
    }
});


app.listen(3000, () => {
    console.log(`服務器運行為 http://localhost:3000`);
});
