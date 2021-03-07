/*
 * processFeed is the entrypoint to this test but feel free
 * to break up your code in whatever way makes sense to you
*/
const {transformCSVToProductsFile} = require("./service/input/CSVTransformerService");
const {ProductsFile} = require("./model/ProductsFile");
const {writeToCSV} = require("./service/output/CSVCreatorService");
const {writeReport} = require("./service/output/ReportWriterService");
const {generateMetadata} = require("./service/metadata/MetadataGeneratorService");
const {validateProducts} = require("./service/validation/ProductValidationService");

async function processFeed(inputPath, outputPath){
   const inputProductsFile = await transformCSVToProductsFile(inputPath);
   const validatedProductsFile = new ProductsFile(inputProductsFile.headers, validateProducts(inputProductsFile.products));

   writeToCSV(validatedProductsFile, outputPath);

   const metadata = generateMetadata(inputProductsFile.products, validatedProductsFile.products);
   writeReport(metadata);
}

processFeed(`${__dirname}\\commerce-feed.csv.gz`, `${__dirname}\\processed.csv.gz`)

module.exports = {
  processFeed
}
