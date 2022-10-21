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
let tBodyProduct = document.getElementById('tBodyProduct');

let buttonCancelOrder = document.getElementById('btn-cancel');
let buttonSaveOrder = document.getElementById('btn-save');
let form = document.getElementById('formOrder');
let containerSetSave = document.getElementById('container-set-save');
let containerTotalOrder = document.getElementById('total-order');
let totalAmountOrder = document.getElementById('total-amount-order');

let tbodyOrders = document.getElementById('tBodyOrders');
let feedbackNoProductsOrder = document.getElementById('feedback-orders');
let buttonOrderStatus = document.getElementById('btn-status');

let deleteContainer = document.getElementById('container-delete');
let filterContainer = document.getElementById('container-filter');
let checkboxSelectAllOrders = document.getElementById('select-all-orders');

let buttonDeleteOrder = document.getElementById('btn-delete');

let selectChangeType = document.getElementById('select-filter-type');
let selectChangeStatus = document.getElementById('select-filter-status');

let buttonPrint = document.getElementById('btn-print');
let feedbackOrders = document.getElementById('feedback-show-order');
let messageFeedback = document.getElementById('feedback-message');
let buttonCloseFeedback = document.getElementById('close-feedback');

let productFound = {};
let arrayOrder = [];
let arrayOrders = [];
let numberOrder = 1000;
let checkedAll = false;

function changeSection() {
    sectionOrder.style.display = 'none';
    sectionNewOrder.style.display = 'flex';
}

function searchProduct(e) {
    e.preventDefault();
    let codeProduct = fieldSearchProduct.value;
    productFound = productList.find(product => codeProduct == product.codigo);
    if (productFound !== undefined) {
        fieldNameProduct.value = productFound.produto;
        fieldPriceProduct.value = formatPrice(productFound.preco);
        fieldAmountProduct.value = '1';
        buttonAddProduct.removeAttribute('disabled');
    } else {
        fieldNameProduct.value = '';
        fieldPriceProduct.value = '';
        buttonAddProduct.setAttribute('disabled', 'true');
        alert('Código do produto não encontrado');
    }
}

function addProductOnTable(e) {
    e.preventDefault();
    buttonSaveOrder.removeAttribute('disabled');
    buttonAddProduct.setAttribute('disabled', 'true');
    let codeProduct = fieldSearchProduct.value;
    let sameProduct = arrayOrder.find(produto => produto.codigo == codeProduct);
    let totalOrder = 0;

    productFound = {
        ...productFound,
        quantidade: Number(fieldAmountProduct.value),
        total: fieldAmountProduct.value * productFound.preco
    };

    if (sameProduct !== undefined) {
        arrayOrder.forEach(item => {
            if (item.codigo == sameProduct.codigo) {
                item.quantidade += Number(fieldAmountProduct.value);
                item.total = item.quantidade * item.preco;
            }
        });

        updateOrderList();

        totalOrder = arrayOrder.reduce((atual, item) => {
            return atual + item.quantidade * item.preco;
        }, 0);

        totalAmountOrder.innerHTML = `Total do pedido: ${formatPrice(
            totalOrder
        )}`;
        form.reset();
        return;
    }

    arrayOrder.push(productFound);

    totalOrder = arrayOrder.reduce((atual, item) => {
        return atual + item.quantidade * item.preco;
    }, 0);

    let trTds = `
    <tr>
        <td>${productFound.codigo}</td>
        <td>${productFound.produto}</td>
        <td>${productFound.quantidade}</td>
        <td>${formatPrice(productFound.total)}</td>
    </tr>`;

    tBodyProduct.innerHTML += trTds;
    feedbackNoProducts.style.display = 'none';
    containerTotalOrder.style.display = 'flex';
    totalAmountOrder.innerHTML = `Total do pedido: ${formatPrice(totalOrder)}`;
    form.reset();
}

function updateOrderList() {
    let trTds = '';
    arrayOrder.forEach(pedido => {
        trTds += `
            <tr>
                <td>${pedido.codigo}</td>
                <td>${pedido.produto}</td>
                <td>${pedido.quantidade}</td>
                <td>${formatPrice(pedido.total)}</td>
            </tr>`;
    });

    tBodyProduct.innerHTML = trTds;
}

function cancelOrder() {
    form.reset();
    buttonSaveOrder.setAttribute('disabled', 'true');
    buttonAddProduct.setAttribute('disabled', 'true');
    tBodyProduct.innerHTML = '';
    feedbackNoProducts.style.display = 'flex';
    containerTotalOrder.style.display = 'none';
    arrayOrder = [];
}

function saveOrder() {
    let typeRequest = document.querySelector(
        'input[name="type-request"]:checked'
    ).value;

    let statusOrder = 'Recebido';
    let totalOrder = arrayOrder.reduce((atual, item) => {
        return atual + item.quantidade * item.preco;
    }, 0);

    let itensOrder = arrayOrder.map(item => {
        return {
            produto: item.produto,
            quantidade: item.quantidade
        };
    });

    let order = {
        numero: numberOrder,
        itens: itensOrder,
        tipo: typeRequest,
        valor: totalOrder,
        status: statusOrder
    };

    arrayOrders.push(order);

    showOrder(order);
    feedbackNoProductsOrder.style.display = 'none';

    numberOrder++;
    cancelOrder();

    setTimeout(() => {
        messageFeedback.textContent = 'O pedido foi recebido.';
        feedbackOrders.style.right = '100px';
    }, 800);
    setTimeout(() => {
        feedbackOrders.style.right = '-300px';
    }, 5000);
}

function showOrder(order) {
    sectionOrder.style.display = 'block';
    sectionNewOrder.style.display = 'none';

    let trTds = '';

    trTds += `
            <tr>
                <td><input type="checkbox" onclick="selectCheckbox()"> ${
                    order.numero
                }</td>
                <td>
                ${order.itens
                    .map(item => `${item.quantidade} - ${item.produto} </br>`)
                    .join('')}
                </td>
                <td>${order.tipo}</td>
                <td>${formatPrice(order.valor)}</td>
                <td><button class="button-order-status" onclick="changeOrderStatus(${
                    order.numero
                })">${order.status}</button></td>
            </tr>`;

    tbodyOrders.innerHTML += trTds;
}

function updateAllOrders(array = arrayOrders) {
    let trTds = '';
    array.forEach(order => {
        trTds += `
        <tr>
            <td><input type="checkbox" onclick="selectCheckbox()"> ${
                order.numero
            } </td>
            <td>
                ${order.itens
                    .map(item => `${item.quantidade} - ${item.produto} </br>`)
                    .join('')}
            </td>
            <td>${order.tipo}</td>
            <td>${formatPrice(order.valor)}</td>
            <td><button class="button-order-status ${
                order.status == 'Recebido'
                    ? ''
                    : order.status === 'Pronto'
                    ? 'ready'
                    : 'delivered'
            }" onclick="changeOrderStatus(${order.numero})">${
            order.status
        }</button></td>
        </tr>`;
    });

    tbodyOrders.innerHTML = trTds;
}

function changeOrderStatus(orderNumero) {
    arrayOrders = arrayOrders.map(order => {
        if (order.numero == orderNumero) {
            if (order.status == 'Recebido') {
                order.status = 'Pronto';
            } else if (order.status == 'Pronto') {
                order.status = 'Entregue';
            }
        }
        return order;
    });
    updateAllOrders();
}

function showEditDelete(checked = false) {
    if (checkedAll || checked) {
        filterContainer.style.display = 'none';
        deleteContainer.style.display = 'flex';
    } else {
        filterContainer.style.display = 'flex';
        deleteContainer.style.display = 'none';
    }
}

function selectAllCheckbox() {
    let checkboxs = document.querySelectorAll(
        'input[type="checkbox"]:not([id=select-all-orders])'
    );

    checkboxs.forEach(checkbox => {
        checkbox.checked = checkedAll ? false : true;
    });

    checkedAll = checkedAll ? false : true;

    if (checkboxs.length > 0) {
        showEditDelete();
    }
}

function selectCheckbox() {
    let checked = false;

    let checkboxs = document.querySelectorAll(
        'input[type="checkbox"]:checked:not([id=select-all-orders])'
    );

    if (checkboxs.length >= 1) {
        checked = true;
    }

    showEditDelete(checked);
}

function deleteOrder() {
    let message = 'Deseja realmente excluir o pedido?';
    let checkboxs = document.querySelectorAll(
        'input[type="checkbox"]:checked:not([id=select-all-orders])'
    );

    if (checkboxs.length > 1) {
        message = 'Deseja realmente excluir os pedidos?';
    }

    if (confirm(message) == true) {
        checkboxs.forEach(item => {
            arrayOrders = arrayOrders.filter(
                order => order.numero != item.parentNode.textContent
            );
        });

        updateAllOrders();

        if (arrayOrders.length === 0) {
            feedbackNoProductsOrder.style.display = 'flex';
        }

        filterContainer.style.display = 'flex';
        deleteContainer.style.display = 'none';

        if (checkboxs.length > 1) {
            messageFeedback.textContent = 'Os pedidos foram excluídos.';
        } else {
            messageFeedback.textContent = 'O pedido foi excluído.';
        }

        setTimeout(() => {
            feedbackOrders.style.right = '100px';
        }, 800);
        setTimeout(() => {
            feedbackOrders.style.right = '-300px';
        }, 5000);
    }
}

function filterOrdersByType() {
    let arrayFiltered = [];
    if (selectChangeType.value == '') {
        updateAllOrders();
    } else if (selectChangeType.value == 'Delivery') {
        arrayFiltered = arrayOrders.filter(order => order.tipo == 'Delivery');
        updateAllOrders(arrayFiltered);
    } else if (selectChangeType.value == 'Salão') {
        arrayFiltered = arrayOrders.filter(order => order.tipo == 'Salão');
        updateAllOrders(arrayFiltered);
    }
}

function filterOrdersByStatus() {
    let arrayFiltered = [];
    if (selectChangeStatus.value == '') {
        updateAllOrders();
    } else if (selectChangeStatus.value == 'Recebido') {
        arrayFiltered = arrayOrders.filter(order => order.status == 'Recebido');
        updateAllOrders(arrayFiltered);
    } else if (selectChangeStatus.value == 'Pronto') {
        arrayFiltered = arrayOrders.filter(order => order.status == 'Pronto');
        updateAllOrders(arrayFiltered);
    } else if (selectChangeStatus.value == 'Entregue') {
        arrayFiltered = arrayOrders.filter(order => order.status == 'Entregue');
        updateAllOrders(arrayFiltered);
    }
}

function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function printOrders() {
    window.print();
}

function closeFeedback() {
    feedbackOrders.style.right = '-300px';
}

buttonAddNewOrder.addEventListener('click', changeSection);
buttonSearchProduct.addEventListener('click', searchProduct);
buttonAddProduct.addEventListener('click', addProductOnTable);
buttonCancelOrder.addEventListener('click', cancelOrder);
buttonSaveOrder.addEventListener('click', saveOrder);
checkboxSelectAllOrders.addEventListener('click', selectAllCheckbox);
buttonDeleteOrder.addEventListener('click', deleteOrder);
selectChangeType.addEventListener('change', filterOrdersByType);
selectChangeStatus.addEventListener('change', filterOrdersByStatus);
buttonPrint.addEventListener('click', printOrders);
buttonCloseFeedback.addEventListener('click', closeFeedback);
