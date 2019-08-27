import app from './app';
import * as https from 'https';
import * as fs from 'fs';
const PORT = 3000;
const httpsOptions = {
    key: fs.readFileSync('./congr/config/key.pem'),
    cert: fs.readFileSync('./congr/config/cert.pem')
}
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})