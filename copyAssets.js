const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const dist = path.join(__dirname, 'dist');

const drawLine = () => console.log('-------------------------------------------------------------');
const mkDir = dir => {
    const dirPath = path.join(dist, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
    }
    return dirPath;
};

drawLine();
console.log('Copying assets ...');
console.log('');


try {
    console.log('Copying manifest.json ...');

    fs.copyFileSync('manifest.json', path.join(dist, 'manifest.json'));

    console.log('Successfully copied manifest.json!');
} catch (error) {
    console.log('Something went wrong on manifest.json copying!\n', error);
}


try {
    console.log('Copying popup assets ...');

    const popupDist = mkDir('popup');

    fs.copyFileSync('src/popup/popup.html', path.join(popupDist, 'popup.html'));

    ['popup.js', 'popup.css'].forEach(file => {
        fs.renameSync(path.join(dist, file), path.join(popupDist, file));
    });

    console.log('Successfully copied popup assets!');
} catch (error) {
    console.log('Something went wrong on popup assets copying!\n', error);
}


try {
    console.log('Moving content assets ...');

    const contentDist = mkDir('content');

    ['content.js', 'content.css'].forEach(file => {
        fs.renameSync(path.join(dist, file), path.join(contentDist, file));
    });

    console.log('Successfully moved content assets!');
} catch (error) {
    console.log('Something went wrong on content assets moving!\n', error);
}


try {
    console.log('Copying locales ...');

    const localesDist = mkDir('_locales');
    fsExtra.copySync(path.join(__dirname, 'src/_locales'), localesDist);

    console.log('Successfully copied locales!');
} catch (error) {
    console.log('Something went wrong on locales copying!\n', error);
}


try {
    console.log('Copying imges ...');

    const localesDist = mkDir('images');
    fsExtra.copySync(path.join(__dirname, 'src/images'), localesDist);

    console.log('Successfully copied images!');
} catch (error) {
    console.log('Something went wrong on images copying!\n', error);
}


console.log('');
console.log('Assets copying completed!');
drawLine();