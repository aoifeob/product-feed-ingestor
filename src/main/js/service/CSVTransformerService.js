const fs = require('fs')
const zlib = require('zlib');
const {Product} = require("../model/Product");
const {ProductsFile} = require("../model/ProductsFile");

async function transformCSVToProductsFile(path) {
    await unzipFile(path);
    const unzippedFilePath = path.replace('.gz', '');

    const csvData = readInputFile(unzippedFilePath);
    return transformToProductsFile(csvData);
}

function readInputFile(path){
    //NOTE: this function does not behave as expected
    return fs.createReadStream(path).toString()
        .split('\n')
        .map(e => e.split(','));
}

async function unzipFile(path){
    //NOTE: this function does not behave as expected
    const gunzip = zlib.createGunzip();
    const readStream = fs.createReadStream(path);
    const writeStream = fs.createWriteStream(path.replace('.gz', ''));
    return readStream.pipe(gunzip).pipe(writeStream);
}

function transformToProductsFile(csvData){
    const headers = csvData.shift();
    const products = getProductsFromCSVData(csvData);

    return new ProductsFile(headers, products);
}

function getProductsFromCSVData(csvData){
    const products = []

    for (let dataLine of csvData){
        const dataLineArray = dataLine.split(',');
        if (dataLineArray.length === 8) {
            const product = new Product(dataLineArray[0], dataLineArray[1], dataLineArray[2], dataLineArray[3], dataLineArray[4], dataLineArray[5], dataLineArray[6], dataLineArray[7], dataLineArray[8]);
            products.push(product);
        } else {
            console.log("Invalid number of columns present for row, skipping row")
        }
    }

    return products;
}

module.exports = {
    transformCSVToProductsFile, transformToProductsFile
}
