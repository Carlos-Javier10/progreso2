function fetchOrders() {
    fetch('/getOrders')
        .then(response => response.json())
        .then(data => {
            const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
            ordersTable.innerHTML = '';
            data.orders.forEach(order => {
                fetch(`https://pokeapi.co/api/v2/pokemon/${order.productId}`)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const newRow = ordersTable.insertRow();
                        newRow.insertCell(0).innerText = order.orderId;
                        newRow.insertCell(1).innerText = order.productId;
                        newRow.insertCell(2).innerText = order.quantity;
                        newRow.insertCell(3).innerText = order.customerName;
                        newRow.insertCell(4).innerText = order.customerAddress;
                        newRow.insertCell(5).innerHTML = `<img src="${pokemonData.sprites.front_default}" alt="${order.productId}" width="50" height="50">`;
                    });
            });
        });
}

function generateCSV() {
    fetch('/generateCSV')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'orders.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        });
}