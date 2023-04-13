const searchProducts = (products) => {

    const query = window.productSearch.searchCriteria.query;
    if (query == null) return products;

    /**
     * We can use the Array.filter() function to filter the products array.
     * 
     * The filter function takes a callback function as a parameter.
     * The callback function will be called once for each element in the array.
     * 
     * The callback function should return true if the element should be included in the new array, or false if it should be excluded.
     * 
     * The filter function will return a new array containing only the elements for which the callback function returned true.
     * 
     * We can use the Array.includes() function to check if a string contains another string.
     * 
     * We can use the Array.toLowerCase() function to convert a string to lowercase.
     * 
     * We could also use the Array.toUpperCase() function to convert a string to uppercase.
     * 
     * We can use the Array.trim() function to remove whitespace from the start and end of a string.
     */
    return products.filter(product => 
        product.id.toString().includes(query.trim()) ||
        product.name.toLowerCase().includes(query.toLowerCase().trim()) ||
        product.type.toLowerCase().includes(query.toLowerCase().trim()) ||
        product.price.toString().includes(query.trim())
    );

}

window.productSearch.searchProducts = searchProducts;

document.addEventListener("DOMContentLoaded", () => {

    const searchInputElement = document.querySelector("input#products__search_input");
    
    if (searchInputElement == null) return;

    searchInputElement.addEventListener("input", (event) => {
        window.productSearch.searchCriteria.query = (event.target.value == null || event.target.value == '') ? null : event.target.value;
        window.productSearch.loadProducts();
    });

});