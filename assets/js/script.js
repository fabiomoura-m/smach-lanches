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
        buttonAddProduct.removeAttribute('disabled');
    } else {
        fieldNameProduct.value = '';
        fieldPriceProduct.value = '';
        buttonAddProduct.setAttribute('disabled', 'true');
        alert('Código do produto não encontrado');
    };
}

buttonAddNewOrder.addEventListener('click', changeSection);
buttonSearchProduct.addEventListener('click', searchProduct);


