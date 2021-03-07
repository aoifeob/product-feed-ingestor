function writeReport(metadata){

    console.log(`Total Row Count: ${metadata.totalRowCount}\n
    Removed Row Count: ${metadata.removedRowCount}\n
    Max Price: ${metadata.maxPrice}\n
    Min Price: ${metadata.minPrice}`)

}

module.exports = {
    writeReport
}
