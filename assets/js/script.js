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
    },
    {
        codigo: 1004,
        produto: 'Combo Econômico SMACH Char 1 - Pão com Carne',
        preco: 15
    },
    {
        codigo: 1005,
        produto: 'Especial SMACH CSS - Hambúrguer colorido e alinhado',
        preco: 65
    },
    {
        codigo: 2001,
        produto: 'Refrigerante 350 ml',
        preco: 8
    },
    {
        codigo: 2002,
        produto: 'Água 500 ml',
        preco: 5
    },
    {
        codigo: 2003,
        produto: 'Suco 350 ml',
        preco: 7
    },
    {
        codigo: 3001,
        produto: 'Sorvete 300 ml',
        preco: 15
    },
    {
        codigo: 3002,
        produto: 'Sobremesa doce SMACH ARRAY',
        preco: 50
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
let tBody = document.getElementById('tBodyProduct');

let buttonCancelOrder = document.getElementById('btn-cancel');
let form = document.getElementById('formOrder');
let containerTotalOrder = document.getElementById('total-order');
let totalAmountOrder = document.getElementById('total-amount-order');

let productFound = {};
let arrayOrder = [];


function changeSection(){
    sectionOrder.style.display = 'none';
    sectionNewOrder.style.display = 'flex';
}

function searchProduct(){
    let codeProduct = fieldSearchProduct.value;
    productFound = productList.find((product) => codeProduct == product.codigo);
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
    let totalAmount = fieldAmountProduct.value * productFound.preco;
    let trTds = `
    <tr>
        <td>${productFound.codigo}</td>
        <td>${productFound.produto}</td>
        <td>${fieldAmountProduct.value}</td>
        <td>${totalAmount}</td>
    </tr>`;
    productFound = {
        ...productFound, quantidade: fieldAmountProduct.value
    }
    arrayOrder.push(productFound);
    let totalOrder = arrayOrder.reduce((atual, item) => {return atual + (item.quantidade * item.preco)}, 0);
    tBody.innerHTML += trTds;
    feedbackNoProducts.style.display = 'none';
    containerTotalOrder.style.display = 'block';
    totalAmountOrder.innerHTML = `Total do pedido: R$ ${totalOrder}`;
}

function cancelOrder(){
    form.reset();
    tBody.innerHTML = '';
    feedbackNoProducts.style.display = 'flex';
    containerTotalOrder.style.display = 'none';
    arrayOrder = [];
}

buttonAddNewOrder.addEventListener('click', changeSection);
buttonSearchProduct.addEventListener('click', searchProduct);
buttonAddProduct.addEventListener('click', addProductOnTable);
buttonCancelOrder.addEventListener('click', cancelOrder)


