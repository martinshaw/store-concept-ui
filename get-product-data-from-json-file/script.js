/**
 * Because we are going to make changes to the HTML, we should wait until the browser has finished rendering the page.
 * 
 * We can do this by listening to the document's "DOMContentLoaded" event.
 */
document.addEventListener("DOMContentLoaded", () => {
    
    /**
     * We can use the document.getElementById() function (as you have done in your code) to get a reference to the element with the ID provided.
     * or we can use the document.querySelector() function to get a reference to the element with the CSS selector provided.
     */
    const loadingElement = document.querySelector("#products__loading");
    const productsTableElement = document.querySelector("#products__table");
    const productsTableBodyElement = document.querySelector("#products__table tbody");

    /**
     * We need to check that there are actually two elements with the IDs provided.
     * If there are not, then the whole script will fail and the page will break.
     */

    if (loadingElement == null || productsTableElement == null) return;

    /**
     * Now we will write the function which will display a product in the table.
     * 
     * A fast way to add alot of HTML to a page is to use a JavaScript template literal.
     * This is like a string, but you can add variables inside it using ${variableName} and it starts/ends with backticks (`) instead of quotes.
     * 
     * Then, we can use the += operator to add the HTML content to the innerHTML of the product table element.
     */
    const addProductToTable = (product, index) => {

        /**
         * Why do I add 'data-index="${index}"' to the row element?
         * 
         * Because we want to be able to get the position of the product in the array when the user clicks on the row.
         * We can use the dataset property of the element to get the values of custom attributes with the 'data-' prefix.
         */
        const newProductHTML = `
            <tr data-index="${index}">
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.type}</td>
                <td>${product.price}</td>
                <td>
                    <img src="${product.image}" alt="${product.name}" />
                </td>
            </tr>
        `;

        // productsTableBodyElement.innerHTML = productsTableBodyElement.innerHTML + newProductHTML;
        productsTableBodyElement.innerHTML += newProductHTML;

    }

    /**
     * Now we will write the function which will hide the loading element and show the products table.
     */
    const showProductsTable = () => {
        loadingElement.classList.remove('visible');
        loadingElement.classList.add('hidden');

        productsTableElement.classList.remove('hidden');
        productsTableElement.classList.add('visible');
    };

    /**
     * Now we will write the function which will add a click event listener to rows in the table.
     */
    const addClickEventListenersToTableRows = () => {
        productsTableBodyElement.addEventListener("click", (event) => {

            /**
             * This event listener will be called when the user clicks on any element inside the products table body element,
             *   so we need to check that the element clicked on is a row or is a child element of the row element.
             */
            const rowElement = event.target.tagName === 'TR' ? event.target : event.target.closest("tr");

            /**
             * If there are no products in the stored array, then we cannot find the product information for the row clicked, so we return early.
             */
            if (products.length < 1) return;

            /**
             * If we cannot find the product information for the row clicked, use the first product in the array (counting in arrays start at 0).
             */
            const product = products[rowElement.dataset.index || 0];

            alert(`You clicked on ${product.name} with ID of ${product.id}!`);

        });
    };

    /**
     * We will store a list of products in this array, so that we can use it later when the user clicks on a row.
     * 
     * Unlike variables which are declared with 'const', variables declared with 'let' can be changed.
     */
    let products = [];

    /**
     * Now we will write the function which gets the JSON data from the file 'products.json'.
     * 
     * We will use the fetch() function to get the data from the file.
     * You can also use it to load data from an API, a database or any other backend source of information.
     * 
     * It is an asynchronous function, which means that it will not stop the rest of the script from running (it will run in the background).
     */
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
             * Store the JavaScript array in the 'products' variable.
             */
            .then(productsArray => products = productsArray)

            /**
             * Then use the 'forEach' array function to loop through each product.
             */
            .then(() => products.forEach(addProductToTable))

            /**
             * Then add a click event listener to each row in the table.
             */
            .then(() => addClickEventListenersToTableRows())

            /**
             * Finally we want to hide the loading element and show the products table regardless of whether there was an error or not.
             */
            .finally(() => showProductsTable())

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

    /**
     * Run the loadProducts() function.
     */
    loadProducts();
});