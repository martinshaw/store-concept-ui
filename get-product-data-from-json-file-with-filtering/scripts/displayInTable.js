const clearRowsFromTable = (productsTableBodyElement) => {
    productsTableBodyElement.innerHTML = "";
};

const addProductToTable = (product, index, productsTableBodyElement) => {

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

    productsTableBodyElement.innerHTML += newProductHTML;

};

let rowOnClickHandlerHasBeenAdded = false;
const addClickEventListenersToTableRows = (productsTableBodyElement) => {

    const rowOnClickHandler = (event) => {

        const rowElement = event.target.tagName === 'TR' ? event.target : event.target.closest("tr");
        if (window.productSearch.products.length < 1) return;

        const product = window.productSearch.products[rowElement.dataset.index || 0];

        alert(`You clicked on ${product.name} with ID of ${product.id}!`);

    };

    if (rowOnClickHandlerHasBeenAdded) return;
    rowOnClickHandlerHasBeenAdded = true;

    productsTableBodyElement.addEventListener("click", rowOnClickHandler);

};

const showProductsTable = (loadingElement, productsTableElement) => {
    loadingElement.classList.remove('visible');
    loadingElement.classList.add('hidden');

    productsTableElement.classList.remove('hidden');
    productsTableElement.classList.add('visible');
};

const hideProductsTable = (loadingElement, productsTableElement) => {
    loadingElement.classList.remove('hidden');
    loadingElement.classList.add('visible');

    productsTableElement.classList.remove('visible');
    productsTableElement.classList.add('hidden');
};

const displayInTable = (products) => {

    const loadingElement = document.querySelector("#products__loading");
    const productsTableElement = document.querySelector("#products__table");
    const productsTableBodyElement = document.querySelector("#products__table tbody");
    if (loadingElement == null || productsTableElement == null || productsTableBodyElement == null) return;

    hideProductsTable(loadingElement, productsTableElement);

    clearRowsFromTable(productsTableBodyElement);

    products.forEach((product, index) => addProductToTable(product, index, productsTableBodyElement));

    addClickEventListenersToTableRows(productsTableBodyElement);

    // Waits for 500 milliseconds (half a second) before showing the table. Loading from a local file 
    //   is very fast, so we need to wait a little bit to see the loading animation.
    setTimeout(() => showProductsTable(loadingElement, productsTableElement), 500);

};

window.productSearch.displayInTable = displayInTable;