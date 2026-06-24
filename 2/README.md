1. Тег <label>
В этом проекте мы не использовали <label> напрямую, но вот как он работает:
<!-- Связь через id -->
<input type="text" id="name">
<label for="name">Имя:</label>

<!-- Связь через вложение -->
<label>
    <input type="checkbox"> Согласен
</label>

Преимущества:

Клик на текст активирует поле

Улучшает UX на мобильных устройствах

Помогает скринридерам

2. // Объект → JSON-строка
const obj = { name: 'Ноутбук', price: 50000 };
const json = JSON.stringify(obj);
// Результат: '{"name":"Ноутбук","price":50000}'

// JSON-строка → Объект
const jsonString = '{"name":"Телефон","price":30000}';
const obj2 = JSON.parse(jsonString);
// Результат: { name: 'Телефон', price: 30000 }

'''Где используется в проекте:'''
// Сохранение корзины
localStorage.setItem('cart', JSON.stringify(cart));

// Загрузка корзины
cart = JSON.parse(localStorage.getItem('cart'));

3. Структура данных
// Товары (статичные)
const products = [
    { id: 1, name: 'Ноутбук', price: 50000 },
    // ...
];

// Корзина (хранится в localStorage)
[
    { id: 1, count: 2 },  // 2 ноутбука
    { id: 3, count: 1 }   // 1 наушники
]