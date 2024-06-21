function fetchInventory() {
    fetch('/inventory/getInventory')
        .then(response => response.json())
        .then(data => {
            const inventoryTable = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
            inventoryTable.innerHTML = '';
            data.products.forEach(product => {
                fetch(`https://pokeapi.co/api/v2/pokemon/${product.ID_Producto}`)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const newRow = inventoryTable.insertRow();
                        newRow.insertCell(0).innerText = product.ID_Producto;
                        newRow.insertCell(1).innerText = product.Nombre_Producto;
                        newRow.insertCell(2).innerText = product.Precio;
                        newRow.insertCell(3).innerHTML = `<img src="${pokemonData.sprites.front_default}" alt="${product.Nombre_Producto}" width="50" height="50">`;
                    });
            });
        })
        .catch(error => console.error('Error fetching inventory:', error));
}