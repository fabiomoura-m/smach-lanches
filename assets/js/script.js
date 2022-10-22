let productList = [
    {
        code: 1001,
        productName: 'Super SMACH COMBO Programado - Hambúrguer + fritas',
        price: 55
    },
    {
        code: 1002,
        productName: 'SMACH VariávelBurguer - Hambúrguer com Bacon',
        price: 45
    },
    {
        code: 1003,
        productName: 'SMACH BUG EM PROD - Hambúrguer meio torto',
        price: 25
    },
    {
        code: 1004,
        productName: 'Combo Econômico SMACH Char 1 - Pão com Carne',
        price: 15
    },
    {
        code: 1005,
        productName: 'Especial SMACH CSS - Hambúrguer colorido e alinhado',
        price: 65
    },
    {
        code: 2001,
        productName: 'Refrigerante 350 ml',
        price: 8
    },
    {
        code: 2002,
        productName: 'Água 500 ml',
        price: 5
    },
    {
        code: 2003,
        productName: 'Suco 350 ml',
        price: 7
    },
    {
        code: 3001,
        productName: 'Sorvete 300 ml',
        price: 15
    },
    {
        code: 3002,
        productName: 'Sobremesa doce SMACH ARRAY',
        price: 50
    }
];

const buttonSearchProduct = document.getElementById('btn-search');
const fieldSearchProduct = document.getElementById('codeProduct');
const fieldNameProduct = document.getElementById('nameProduct');
const fieldPriceProduct = document.getElementById('priceProduct');

const buttonAddNewOrder = document.getElementById('btn-newOrder');
const sectionOrder = document.getElementById('orders');
const sectionNewOrder = document.getElementById('new-order');

const buttonAddProduct = document.getElementById('btn-addProduct');
const fieldAmountProduct = document.getElementById('amountProduct');
const feedbackNoProducts = document.getElementById('feedback-order');
const tBodyProduct = document.getElementById('tBodyProduct');

const buttonCancelOrder = document.getElementById('btn-cancel');
const buttonSaveOrder = document.getElementById('btn-save');
const form = document.getElementById('formOrder');
const containerSetSave = document.getElementById('container-set-save');
const containerTotalOrder = document.getElementById('total-order');
const totalAmountOrder = document.getElementById('total-amount-order');

const tbodyOrders = document.getElementById('tBodyOrders');
const feedbackNoProductsOrder = document.getElementById('feedback-orders');
const buttonOrderStatus = document.getElementById('btn-status');

const deleteContainer = document.getElementById('container-delete');
const filterContainer = document.getElementById('container-filter');
const checkboxSelectAllOrders = document.getElementById('select-all-orders');

const buttonDeleteOrder = document.getElementById('btn-delete');

const selectChangeType = document.getElementById('select-filter-type');
const selectChangeStatus = document.getElementById('select-filter-status');

const buttonPrint = document.getElementById('btn-print');
const feedbackOrders = document.getElementById('feedback-show-order');
const messageFeedback = document.getElementById('feedback-message');
const buttonCloseFeedback = document.getElementById('close-feedback');

const date = document.getElementById('date');
const time = document.getElementById('hour');

let productFound = {};
let arrayOrder = [];
let arrayOrders = [];
let arrayFilteredByType = [];
let arrayFilteredByStatus = [];
let numberOrder = 1000;
let checkedAll = false;

function changeSection() {
    sectionOrder.style.display = 'none';
    sectionNewOrder.style.display = 'flex';
}

function searchProduct(e) {
    e.preventDefault();
    let codeProduct = fieldSearchProduct.value;
    productFound = productList.find(product => codeProduct == product.code);
    if (productFound !== undefined) {
        fieldNameProduct.value = productFound.productName;
        fieldPriceProduct.value = formatPrice(productFound.price);
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
    let sameProduct = arrayOrder.find(product => product.code == codeProduct);
    let totalOrder = 0;

    productFound = {
        ...productFound,
        amount: Number(fieldAmountProduct.value),
        total: fieldAmountProduct.value * productFound.price
    };

    if (sameProduct !== undefined) {
        arrayOrder.forEach(item => {
            if (item.code == sameProduct.code) {
                item.amount += Number(fieldAmountProduct.value);
                item.total = item.amount * item.price;
            }
        });

        updateOrderList();

        totalOrder = arrayOrder.reduce((atual, item) => {
            return atual + item.amount * item.price;
        }, 0);

        totalAmountOrder.innerHTML = `Total do pedido: <span class="total-order-bold">${formatPrice(
            totalOrder
        )}<span>`;
        form.reset();
        return;
    }

    arrayOrder.push(productFound);

    totalOrder = arrayOrder.reduce((current, item) => {
        return current + item.amount * item.price;
    }, 0);

    let trTds = `
    <tr>
        <td>${productFound.code}</td>
        <td>${productFound.productName}</td>
        <td>${productFound.amount}</td>
        <td>${formatPrice(productFound.total)}</td>
    </tr>`;

    tBodyProduct.innerHTML += trTds;
    feedbackNoProducts.style.display = 'none';
    containerTotalOrder.style.display = 'flex';
    containerSetSave.style.justifyContent = 'space-between';
    totalAmountOrder.innerHTML = `Total do pedido: <span class="total-order-bold">${formatPrice(
        totalOrder
    )}<span>`;
    form.reset();
}

function updateOrderList() {
    let trTds = '';
    arrayOrder.forEach(order => {
        trTds += `
            <tr>
                <td>${order.code}</td>
                <td>${order.productName}</td>
                <td>${order.amount}</td>
                <td>${formatPrice(order.total)}</td>
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
    containerSetSave.style.justifyContent = 'flex-end';
    arrayOrder = [];
}

function saveOrder() {
    let typeRequest = document.querySelector(
        'input[name="type-request"]:checked'
    ).value;

    let statusOrder = 'Recebido';
    let totalOrder = arrayOrder.reduce((current, item) => {
        return current + item.amount * item.price;
    }, 0);

    let itensOrder = arrayOrder.map(item => {
        return {
            product: item.productName,
            amount: item.amount
        };
    });

    let order = {
        number: numberOrder,
        items: itensOrder,
        type: typeRequest,
        price: totalOrder,
        status: statusOrder
    };

    arrayOrders.push(order);

    showOrder(order);
    feedbackNoProductsOrder.style.display = 'none';

    numberOrder++;
    cancelOrder();

    feedbackOrders.style.display = 'flex';
    setTimeout(() => {
        messageFeedback.textContent = 'O pedido foi recebido.';
        if (document.body.clientWidth < 500) {
            feedbackOrders.style.right = '5px';
            feedbackOrders.style.top = '330px';
        } else if (document.body.clientWidth < 820) {
            feedbackOrders.style.right = '5px';
            feedbackOrders.style.top = '55px';
        } else {
            feedbackOrders.style.top = '50px';
            feedbackOrders.style.right = '100px';
        }
    }, 800);
    setTimeout(() => {
        feedbackOrders.style.right = '-300px';
        setTimeout(() => {
            feedbackOrders.style.display = 'none';
        }, 200);
    }, 5000);
}

function showOrder(order) {
    sectionOrder.style.display = 'block';
    sectionNewOrder.style.display = 'none';

    let trTds = '';

    trTds += `
            <tr>
                <td>
                    <div class="checkbox-wrapper">
                        <input type="checkbox" class="checkbox" id="${
                            order.number
                        }" onclick="selectCheckbox()">
                        <label class="checkbox-label order" for="${
                            order.number
                        }">${order.number}</label>
                    </div>
                </td>
                <td>
                ${order.items
                    .map(item => `${item.amount} - ${item.product} </br>`)
                    .join('')}
                </td>
                <td>${order.type}</td>
                <td>${formatPrice(order.price)}</td>
                <td><button class="button-order-status" onclick="changeOrderStatus(${
                    order.number
                })">${order.status}</button></td>
            </tr>`;

    tbodyOrders.innerHTML += trTds;
}

function updateAllOrders(array = arrayOrders) {
    let trTds = '';
    array.forEach(order => {
        trTds += `
        <tr>
            <td>
                <div class="checkbox-wrapper">
                    <input type="checkbox" class="checkbox" id="${
                        order.number
                    }" onclick="selectCheckbox()">
                    <label class="checkbox-label order" for="${order.number}">${
            order.number
        }</label>
                </div>              
            </td>
            <td>
                ${order.items
                    .map(item => `${item.amount} - ${item.product} </br>`)
                    .join('')}
            </td>
            <td>${order.type}</td>
            <td>${formatPrice(order.price)}</td>
            <td><button class="button-order-status ${
                order.status == 'Recebido'
                    ? ''
                    : order.status === 'Pronto'
                    ? 'ready'
                    : 'delivered'
            }" onclick="changeOrderStatus(${order.number})">${
            order.status
        }</button></td>
        </tr>`;
    });

    tbodyOrders.innerHTML = trTds;
}

function changeOrderStatus(orderNumber) {
    arrayOrders = arrayOrders.map(order => {
        if (order.number == orderNumber) {
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
                order => order.number != item.parentNode.textContent
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

        feedbackOrders.style.display = 'flex';
        setTimeout(() => {
            if (document.body.clientWidth < 500) {
                feedbackOrders.style.right = '5px';
                feedbackOrders.style.top = '340px';
            } else if (document.body.clientWidth < 820) {
                feedbackOrders.style.right = '5px';
                feedbackOrders.style.top = '55px';
            } else {
                feedbackOrders.style.top = '50px';
                feedbackOrders.style.right = '100px';
            }
        }, 800);
        setTimeout(() => {
            feedbackOrders.style.right = '-300px';
            setTimeout(() => {
                feedbackOrders.style.display = 'none';
            }, 200);
        }, 5000);
    }
}

function filterOrdersByType() {
    let orderType = selectChangeType.value;

    if (arrayFilteredByStatus.length > 0) {
        if (orderType == '') {
            updateAllOrders(arrayFilteredByStatus);
            arrayFilteredByType = [];
        } else if (orderType == 'Delivery') {
            arrayFilteredByType = arrayFilteredByStatus.filter(
                order => order.type == 'Delivery'
            );
            updateAllOrders(arrayFilteredByType);
        } else if (orderType == 'Salão') {
            arrayFilteredByType = arrayFilteredByStatus.filter(
                order => order.type == 'Salão'
            );
            updateAllOrders(arrayFilteredByType);
        }
    } else {
        if (orderType == '') {
            updateAllOrders();
            arrayFilteredByType = [];
        } else if (orderType == 'Delivery') {
            arrayFilteredByType = arrayOrders.filter(
                order => order.type == 'Delivery'
            );
            updateAllOrders(arrayFilteredByType);
        } else if (orderType == 'Salão') {
            arrayFilteredByType = arrayOrders.filter(
                order => order.type == 'Salão'
            );
            updateAllOrders(arrayFilteredByType);
        }
    }
}

function filterOrdersByStatus() {
    let orderStatus = selectChangeStatus.value;

    if (arrayFilteredByType.length > 0) {
        if (orderStatus == '') {
            updateAllOrders(arrayFilteredByType);
            arrayFilteredByStatus = [];
        } else if (orderStatus == 'Recebido') {
            arrayFilteredByStatus = arrayFilteredByType.filter(
                order => order.status == 'Recebido'
            );
            updateAllOrders(arrayFilteredByStatus);
        } else if (orderStatus == 'Pronto') {
            arrayFilteredByStatus = arrayFilteredByType.filter(
                order => order.status == 'Pronto'
            );
            updateAllOrders(arrayFilteredByStatus);
        } else if (orderStatus == 'Entregue') {
            arrayFilteredByStatus = arrayFilteredByType.filter(
                order => order.status == 'Entregue'
            );
            updateAllOrders(arrayFilteredByStatus);
        }
    } else {
        if (orderStatus == '') {
            updateAllOrders();
            arrayFilteredByStatus = [];
        } else if (orderStatus == 'Recebido') {
            arrayFilteredByStatus = arrayOrders.filter(
                order => order.status == 'Recebido'
            );
            updateAllOrders(arrayFilteredByStatus);
        } else if (orderStatus == 'Pronto') {
            arrayFilteredByStatus = arrayOrders.filter(
                order => order.status == 'Pronto'
            );
            updateAllOrders(arrayFilteredByStatus);
        } else if (orderStatus == 'Entregue') {
            arrayFilteredByStatus = arrayOrders.filter(
                order => order.status == 'Entregue'
            );
            updateAllOrders(arrayFilteredByStatus);
        }
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

function returnSectionOrders() {
    sectionOrder.style.display = 'block';
    sectionNewOrder.style.display = 'none';
}

function showCurrentDate() {
    let currentDate = new Date();
    let dateFormatted = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    date.innerHTML = dateFormatted;
}
showCurrentDate();

function ShowCurrentTime() {
    let currentDate = new Date();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    let second = currentDate.getSeconds();

    time.innerHTML = `- ${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;
}
ShowCurrentTime();
setInterval(ShowCurrentTime, 1000);

function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}

buttonAddNewOrder.addEventListener('click', changeSection);
buttonSearchProduct.addEventListener('click', searchProduct);
buttonAddProduct.addEventListener('click', addProductOnTable);
buttonCancelOrder.addEventListener('click', cancelOrder);
buttonCancelOrder.addEventListener('dblclick', returnSectionOrders);
buttonSaveOrder.addEventListener('click', saveOrder);
checkboxSelectAllOrders.addEventListener('click', selectAllCheckbox);
buttonDeleteOrder.addEventListener('click', deleteOrder);
selectChangeType.addEventListener('change', filterOrdersByType);
selectChangeStatus.addEventListener('change', filterOrdersByStatus);
buttonPrint.addEventListener('click', printOrders);
buttonCloseFeedback.addEventListener('click', closeFeedback);
