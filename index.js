process.stdout.write("*** Imports/Exports society XspeedIt *** \n");
process.stdout.write(" \n");
process.stdout.write(" Add the Line items:");
process.stdin.on('data', function(data){
    
    //Preparing Incoming Item Line
    const inputArticulesLine = data.toString().trim();

    /**
     * Convert the item to be packed from String to number.
     * @param elem: Item to pack
     * @return Number.
     */
    const mapFnToNumber = elem => Number(elem);

    /**
     * [articulesLine] represents the line of incoming items Ej: 163841689525773
     * for development purposes converted to: [1,6,3,8,4,1,6,8,9,5,2,5,7,7,3]
     * - The item to be packed is represented in an integer -
     * @param inputArticulesLine: incoming items
     * @return Number[].
     */
    let articulesLine = Array.from(inputArticulesLine,mapFnToNumber);       
    /**
     * Final line of packed items.
     */
    let itemPacker = "";
    /**
     * Make up the box, its final destination will be to pack it in [itemPacker].
     */
    let accumulator = 0;
    let _i = 0
    
    /**
     *                     .: Explanation of the internal workings of the algorithm :.
     * 
     *  Once the line of incoming articles is ready [articlesLine] it will proceed to iterate its articles
     * and form the respective boxes [accumulator] complying with the premise of putting the greatest amount of
     * Items per box, when the box is full it is passed to the final line of packed items [itemPacker].
     * When the article is passed to the box [accumulator] it leaves the line of incoming articles [articlesLine].
     */
    while ( articulesLine.length ) {
        
        //This section is in charge of "cleaning the box" and dividing the articles("/") added to the packaging.
        if( accumulator == 10 || _i >= articulesLine.length ) {

            accumulator = 0;
            itemPacker = itemPacker.concat("/");
            _i = 0;

        }
        // check if the box can assimilate more articles, 
        //if it can, it continues searching and adding them to the box (as long as they fit).
        if ( accumulator + articulesLine[ _i ] <= 10 ){
            
            accumulator +=  articulesLine[ _i ];
            itemPacker = itemPacker.concat( articulesLine[ _i ].toString() );
            articulesLine.splice( _i, 1 );

        }else {

            _i++;

        }
    }
   
    process.stdout.write(` 
                |---|     
                |b d|     
                |_u_|     
           }--. /--o/ .--{
              " |___| "   
                (_|_)     
                (o|o) 
|----------------------------------------------------|
|----- Response from packaging robot algorithm. -----|
    \n`);
    let totalPackPerLine = itemPacker.split('/').length
    process.stdout.write(` Line of packed items: ${itemPacker} \n`);
    process.stdout.write(`\n`);
    process.stdout.write(` Total package per line: ${totalPackPerLine}`);
    process.stdout.write(`\n`);
    process.exit();

})