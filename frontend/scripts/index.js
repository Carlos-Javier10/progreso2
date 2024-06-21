document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();
});

function fetchProducts() {
    fetch('/getProducts')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            data.products.forEach(product => {
                fetch(product.Imagen_URL)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const productDiv = document.createElement('div');
                        productDiv.classList.add('product');
                        productDiv.innerHTML = `
                            <img src="${pokemonData.sprites.front_default}" alt="${product.Nombre_Producto}">
                            <h3>${product.Nombre_Producto}</h3>
                            <p>Price: $${product.Precio.toFixed(2)}</p>
                            <p>Stock: ${product.Stock}</p>
                            <button onclick="addToCart(${product.ID_Producto}, '${product.Nombre_Producto}', ${product.Precio})">Add to Cart</button>
                        `;
                        productList.appendChild(productDiv);
                    });
            });
        });
}

let cart = [];

function addToCart(productId, productName, price) {
    const existingProduct = cart.find(item => item.productId === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ productId, productName, price, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    const cartTableBody = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    cartTableBody.innerHTML = '';
    cart.forEach(item => {
        const newRow = cartTableBody.insertRow();
        newRow.insertCell(0).innerText = item.productId;
        newRow.insertCell(1).innerText = item.productName;
        newRow.insertCell(2).innerText = item.quantity;
        newRow.insertCell(3).innerText = `$${item.price.toFixed(2)}`;
        newRow.insertCell(4).innerText = `$${(item.price * item.quantity).toFixed(2)}`;
        newRow.insertCell(5).innerHTML = `<button onclick="removeFromCart(${item.productId})">Remove</button>`;
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    renderCart();
}

function placeOrder() {
    const orderDetails = cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
    }));

    fetch('/placeOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderDetails }),
    })
        .then(response => response.json())
        .then(data => {
            alert('Order placed successfully!');
            cart = [];
            renderCart();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to place order.');
        });
}
