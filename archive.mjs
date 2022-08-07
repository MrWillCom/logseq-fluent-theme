import JSZip from "jszip";
import fs from 'fs';
import path from 'path';
import url from 'url';
import ProgressBar from "progress";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const info = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')))

var archive = new JSZip();

const files = ['README.md', 'LICENSE', 'package.json', 'dist/custom.css']

var bar = new ProgressBar('[:bar] :current/:total files archived', { total: files.length })

files.forEach((file) => {
    archive.file(file, fs.readFileSync(path.join(__dirname, file)))
    bar.tick()
})

archive.generateAsync({ type: 'nodebuffer' }).then((data) => {
    fs.writeFile(`${info.name}-${info.version}.zip`, data, (err) => {
        console.log('saved.')
        if (err) { throw err }
    })
})
