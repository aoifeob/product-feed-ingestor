const fs = require('fs')
const {ProductsFile} = require("../model/ProductsFile");

function transformCSVToProductsFile(path){
    const csvData = readInputFile(path);
    return transformToProductsFile(csvData);
}

function readInputFile(path){
    return fs.createReadStream(path).toString()
        .split('\n')
        .map(e => e.split(','));
}

function transformToProductsFile(csvData){
    const products = csvData.shift();
    return new ProductsFile(csvData[0], products);
}

module.exports = {
    transformCSVToProductsFile
}
