function writeReport(metadata){

    console.log(`Total Row Count: ${metadata.totalRowCount}\nRemoved Row Count: ${metadata.removedRowCount}\nMax Price: ${metadata.maxPrice}\nMin Price: ${metadata.minPrice}`)

}

module.exports = {
    writeReport
}
