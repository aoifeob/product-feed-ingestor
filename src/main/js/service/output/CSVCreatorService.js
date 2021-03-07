const fs = require('fs')
const zlib = require('zlib')

async function writeToCSV(productFile, path) {

    const formattedData = getFormattedData(productFile);

    if ('' !== formattedData) {

        const unzippedCSVPath = path.replace('.gz', '');

        await writeToUnzippedCSV(formattedData, unzippedCSVPath);
        gzipCSV(unzippedCSVPath, path)

    } else {
        console.log("No product data found, CSV creation will be skipped")
    }

}

async function writeToUnzippedCSV(formattedData, path){
    return fs.writeFile(path, formattedData, 'utf8', function (writeError) {
        if (writeError) {
            console.log('Error occurred while attempting to write to CSV.');
        }
    });
}

function gzipCSV(readPath, writePath) {
    const gzip = zlib.createGzip();
    const readStream = fs.createReadStream(readPath);
    const writeStream = fs.createWriteStream(writePath);
    readStream.pipe(gzip).pipe(writeStream);
}

function getFormattedData(productFile) {
    if (productFile === null) {
        console.log("Product file was null.")
        return '';
    }

    let csvData = [];

    csvData.push(productFile.headers);
    csvData = addProductsToCSVData(csvData, productFile.products);

    return csvData.join("\r\n");
}

function addProductsToCSVData(csvData, products) {
    if (null !== products) {
        for (let product of products) {
            csvData.push(productToCSVColumn(product));
        }
    }

    return csvData;
}

function productToCSVColumn(product) {
    if (product === null) {
        return '';
    }
    return `${product.id},${product.title},${product.description},${product.link},${product.image_link},${product.brand},${product.price},${product.availability}`;
}

module.exports = {
    writeToCSV, getFormattedData
}
