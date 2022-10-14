let productList = [
    {
        codigo: 1001,
        produto: 'Super SMACH COMBO Programado - Hambúrguer + fritas',
        preco: 55
    },
    {
        codigo: 1002,
        produto: 'SMACH VariávelBurguer - Hambúrguer com Bacon',
        preco: 45
    },
    {
        codigo: 1003,
        produto: 'SMACH BUG EM PROD - Hambúrguer meio torto',
        preco: 25
    }
];

let buttonSearchProduct = document.getElementById('btn-search');
let fieldSearchProduct = document.getElementById('codeProduct');
let fieldNameProduct = document.getElementById('nameProduct');
let fieldPriceProduct = document.getElementById('priceProduct');

let buttonAddNewOrder = document.getElementById('btn-newOrder');
let sectionOrder = document.getElementById('orders');
let sectionNewOrder = document.getElementById('new-order');

let buttonAddProduct = document.getElementById('btn-addProduct');
let fieldAmountProduct = document.getElementById('amountProduct');
let feedbackNoProducts = document.getElementById('feedback-order');
let productFound = {};

function changeSection(){
    sectionOrder.style.display = 'none';
    sectionNewOrder.style.display = 'flex';
}

function searchProduct(){
    let codeProduct = fieldSearchProduct.value;
    productFound = productList.find((product) => codeProduct == product.codigo);
    console.log(productFound);
    if (productFound !== undefined){
        fieldNameProduct.value = productFound.produto;
        fieldPriceProduct.value = productFound.preco;
        fieldAmountProduct.value = '1';
        buttonAddProduct.removeAttribute('disabled');
    } else {
        fieldNameProduct.value = '';
        fieldPriceProduct.value = '';
        buttonAddProduct.setAttribute('disabled', 'true');
        alert('Código do produto não encontrado');
    };
}

function addProductOnTable(){
    let tBody = document.getElementById('tBodyProduct');
    let totalAmount = fieldAmountProduct.value * productFound.preco;
    let trTds = `
    <tr>
        <td>${productFound.codigo}</td>
        <td>${productFound.produto}</td>
        <td>${fieldAmountProduct.value}</td>
        <td>${totalAmount}</td>
    </tr>`;
    tBody.innerHTML += trTds;
    feedbackNoProducts.style.display = 'none';
}

buttonAddNewOrder.addEventListener('click', changeSection);
buttonSearchProduct.addEventListener('click', searchProduct);
buttonAddProduct.addEventListener('click', addProductOnTable);


