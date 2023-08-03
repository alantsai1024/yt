const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});



app.post('/download', (req, res) => {
    const url = req.body.urlinput;
    const downloadType = req.body.downloadtype;

    try {
        
        const pythonProcess = spawn('python', ['a.py', url, downloadType]);

        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
            res.redirect('/');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error downloading the video/audio');
    }
});


app.listen(3000, () => {
    console.log(`服務器運行為 http://localhost:3000`);
});
