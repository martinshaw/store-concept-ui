/**
 * Every property in the `window` object is available to us in the global scope, meaning we can access it from anywhere in our code.
 * 
 * We will use this `window.productSearch` object to store functions and variables related to product search which we want to be accessible from other files.
 */
window.productSearch = {
    searchCriteria: {
        query: null,
        sort: ['id', 'asc'],
    },
    products: [],
    loadProducts: () => {},
    searchProducts: () => {},
    sortProducts: () => {},
    displayInTable: () => {},
};

/**
 * Because we are going to make changes to the HTML, we should wait until the browser has finished rendering the page.
 * 
 * We can do this by listening to the document's "DOMContentLoaded" event.
 */
document.addEventListener("DOMContentLoaded", () => {

    window.productSearch.loadProducts();
    
});