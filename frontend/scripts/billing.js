// frontend/scripts/billing.js

function generateInvoice() {
    const orderId = document.getElementById('billingOrderId').value;

    fetch(`/billing/generateInvoice?orderId=${orderId}`)
        .then(response => response.json())
        .then(data => {
            const invoiceDetails = document.getElementById('invoiceDetails');
            invoiceDetails.innerHTML = `
                <h3>Invoice Details</h3>
                <p>Invoice ID: ${data.ID_Factura}</p>
                <p>Order ID: ${data.ID_Orden}</p>
                <p>Customer Name: ${data.Nombre_Cliente}</p>
                <p>Customer Address: ${data.Direccion_Cliente}</p>
                <p>Total Amount: ${data.Total}</p>
                <p>Date: ${data.Fecha}</p>
            `;
        })
        .catch(error => {
            console.error('Error generating invoice:', error);
            document.getElementById('invoiceDetails').innerHTML = '<p>Error generating invoice. Please try again later.</p>';
        });
}
