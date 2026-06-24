// ДАННЫЕ
const products = [
    { id: 1, name: 'Ноутбук', price: 50000 },
    { id: 2, name: 'Телефон', price: 30000 },
    { id: 3, name: 'Наушники', price: 5000 },
    { id: 4, name: 'Клавиатура', price: 3000 },
    { id: 5, name: 'Мышь', price: 1500 },
    { id: 6, name: 'Монитор', price: 25000 }
];

let cart = [];

//  DOM
const productList = document.getElementById('productList');
const cartList = document.getElementById('cartList');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

// LOCALSTORAGE

// Сохраняем корзину
function saveCart() {
    // JSON.stringify - превращает объект в строку JSON
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Загружаем корзину
function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        // JSON.parse - превращает строку JSON обратно в объект
        cart = JSON.parse(saved);
    }
}

// РЕНДЕРИНГ

// Показать все товары
function renderProducts() {
    productList.innerHTML = products.map(product => {
        // Сколько этого товара в корзине?
        const cartItem = cart.find(item => item.id === product.id);
        const count = cartItem ? cartItem.count : 0;
        
        return `
            <div class="product-item">
                <h3>${product.name}</h3>
                <div class="price">${product.price} ₽</div>
                <button onclick="addToCart(${product.id})">В корзину</button>
                ${count > 0 ? `<div class="in-cart">В корзине: ${count}</div>` : ''}
            </div>
        `;
    }).join('');
}

// Показать корзину
function renderCart() {
    if (cart.length === 0) {
        cartList.innerHTML = '<div class="cart-empty">Корзина пуста</div>';
        cartCount.textContent = '0';
        cartTotal.textContent = '0';
        return;
    }

    // Считаем общее количество и сумму
    let totalItems = 0;
    let totalPrice = 0;

    cartList.innerHTML = cart.map(item => {
        // Находим товар по ID
        const product = products.find(p => p.id === item.id);
        if (!product) return '';
        
        const itemTotal = product.price * item.count;
        totalItems += item.count;
        totalPrice += itemTotal;

        return `
            <div class="cart-item">
                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price">${product.price} ₽ × ${item.count} = ${itemTotal} ₽</div>
                </div>
                <div class="controls">
                    <button class="minus" onclick="changeCount(${item.id}, -1)">−</button>
                    <span class="count">${item.count}</span>
                    <button class="plus" onclick="changeCount(${item.id}, 1)">+</button>
                    <button class="remove" onclick="removeFromCart(${item.id})">✖</button>
                </div>
            </div>
        `;
    }).join('');

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
}

// === ОПЕРАЦИИ С КОРЗИНОЙ ===

// Добавить товар
function addToCart(productId) {
    // Ищем товар в корзине
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        // Если есть - увеличиваем количество
        existing.count += 1;
    } else {
        // Если нет - добавляем
        cart.push({ id: productId, count: 1 });
    }
    
    saveCart();
    renderProducts();
    renderCart();
}

// Изменить количество
function changeCount(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.count += delta;
    
    // Если стало 0 - удаляем
    if (item.count <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }
    
    saveCart();
    renderProducts();
    renderCart();
}

// Удалить полностью
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderProducts();
    renderCart();
}

// === ИНИЦИАЛИЗАЦИЯ ===

function init() {
    // Загружаем корзину
    loadCart();
    
    // Показываем товары и корзину
    renderProducts();
    renderCart();
}

// Запускаем
init();