const loadProducts = () => {

    /**
     * Makes the request to the file 'products.json' and waits for the response before continuing the 'then' callback function.
     */
    return fetch("products.json")

        /**
         * Converts the response to JSON and waits for the JSON data before continuing the 'then' callback function if there is one.
         */
        .then(response => response.json())

        /**
         * Convert the JSON array into a JavaScript array
         */
        .then(data => Array.from(data))

        /**
         * Store the JavaScript array in the global 'products' variable.
         */
        .then(productsArray => window.productSearch.products = productsArray)

        .then(window.productSearch.searchProducts)

        .then(window.productSearch.sortProducts)

        .then(window.productSearch.displayInTable)

        /**
         * If there is an error, it will be caught here.
         * 
         * We can use the console.error() function to log the error to the console.
         * If we want to show a friendly error message to the user, we can use the alert() function to show a dismissable popup message.
         */
        .catch(error => {
            console.error(error);
            alert("There was an error loading the products. Sowwy! :(");
        });

};

window.productSearch.loadProducts = loadProducts;