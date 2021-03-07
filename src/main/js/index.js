/*
 * processFeed is the entrypoint to this test but feel free
 * to break up your code in whatever way makes sense to you
*/
const fs = require("fs");
const {transformCSVToProductsFile} = require("./service/CSVTransformerService");
const {ProductsFile} = require("./model/ProductsFile");
const {writeToCSV} = require("./service/CSVCreatorService");
const {writeReport} = require("./service/ReportWriterService");
const {generateMetadata} = require("./service/MetadataGeneratorService");
const {validateProducts} = require("./service/ProductValidationService");

async function processFeed(inputPath, outputPath){
   const inputProductsFile = transformCSVToProductsFile(inputPath);
   const validatedProductsFile = new ProductsFile(inputProductsFile.headers, validateProducts(inputProductsFile.products));

   writeToCSV(validatedProductsFile, outputPath);

   const metadata = generateMetadata(inputProductsFile.products, validatedProductsFile.products);
   writeReport(metadata);
}

processFeed(`${__dirname}/commerce-feed.csv.gz`, `${__dirname}/processed.csv.gz`)

module.exports = {
  processFeed
}
