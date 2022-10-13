let buttonAddNewOrder = document.getElementById('btn-newOrder');
let sectionOrder = document.getElementById('orders');
let sectionNewOrder = document.getElementById('new-order');

function changeSection(){
    sectionOrder.style.display = 'none';
    sectionNewOrder.style.display = 'flex';
}

buttonAddNewOrder.addEventListener('click', changeSection);


