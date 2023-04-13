const sortProducts = (products) => {

    const sort = window.productSearch.searchCriteria.sort;
    if (sort == null) return products;

    /**
     * We can use the Array.sort() function to sort the products array.
     * 
     * The sort function takes a callback function as a parameter.
     * 
     * The callback function will be called once for each element in the array.
     * 
     * The callback function should return a negative number if the first element should be sorted before the second element.
     * The callback function should return a positive number if the first element should be sorted after the second element.
     * The callback function should return 0 if the two elements are equal.
     * 
     * The sort function will return a new array containing the elements in the correct order.
     */
    return products.sort((a, b) => {
        
        if (sort[1] == 'asc') {
            if (a[sort[0]] < b[sort[0]]) return -1;
            if (a[sort[0]] > b[sort[0]]) return 1;
        } else {
            if (a[sort[0]] > b[sort[0]]) return -1;
            if (a[sort[0]] < b[sort[0]]) return 1;
        }

        return 0;

    });

}

window.productSearch.sortProducts = sortProducts;

document.addEventListener("DOMContentLoaded", () => {

    const searchSortElement = document.querySelector("#products__search_sort");
    
    if (searchSortElement == null) return;

    searchSortElement.addEventListener("change", (event) => {
        window.productSearch.searchCriteria.sort = event.target.value.split('-');
        window.productSearch.loadProducts();
    });

});