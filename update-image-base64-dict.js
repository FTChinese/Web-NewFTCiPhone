const imageToBase64 = require('image-to-base64');
const fs = require('fs');

const extensionMap = {
    svg: 'svg+xml',
    gif: 'gif',
    jpg: 'jpg',
    png: 'png'
}

async function run() {
    let dict = {};
    const dictFilePath = 'image-dict.json';
    if (fs.existsSync(dictFilePath)) {
        const dictString = fs.readFileSync(dictFilePath, 'utf-8');
        dict = JSON.parse(dictString);
    }
    const stylePath = 'dist/styles/';
    const cssFiles = fs.readdirSync(stylePath);
    for (const file of cssFiles) {
        const filePath = `${stylePath}${file}`;
        let css = fs.readFileSync(filePath, 'utf8');
        const reg = new RegExp(`https://[A-Za-z0-9]+\\.cloudfront\\.[A-Za-z0-9\\.\\-\\_\\/]+\\.(svg|png|jpg|gif)`, 'g');
        const matches = css.match(reg);
        if (!matches) {
            console.log(`skip ${filePath}`);
            continue;
        }
        for (const url of matches) {
            let baseCode;
            if (dict[url]) {
                baseCode = dict[url];
            } else {
                baseCode = await imageToBase64(url);
                dict[url] = baseCode;
                console.log(`Updating ${url} with base 64: ${baseCode}`);
            }
            const extension = url.replace(/^.*\.([a-z]+)$/g, '$1');
            const imageCode = extensionMap[extension];
            while (css.indexOf(url) >= 0) {
                css = css.replace(url, `data:image/${imageCode};base64,${baseCode}`);
            }
        }
        fs.writeFileSync(filePath, css, {encoding: "utf8"});
        console.log(`Updated ${filePath}`);
    }
    const dictString = JSON.stringify(dict);
    fs.writeFileSync(dictFilePath, dictString, {encoding: "utf8"});
}

(async () => {
    // await run();
})();

module.exports.run = run;