document.addEventListener('DOMContentLoaded', function() {
    fetchCartItemsFromDatabase();
});

async function fetchCartItemsFromDatabase() {
    try {
        const response = await fetch('http://localhost:3001/cart-items');
        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        const cartItems = data.cartItems;
        cartItems.forEach(item => {
            addCart(item);
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}

function addCart(item) {
    const { id, Price, Image, Name, Quantity } = item;
    const cartTable = document.querySelector("tbody");

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td style="display: flex; align-items: center;">
            <img style="width:70px" src="${Image}" alt="">
            <span class="title">${Name}</span>
        </td>
        <td><p><span class="price">${Price}</span></p></td>
        <td><input data-id="${id}" style="width: 30px; outline: none;" type="number" value="${Quantity}" min="1"></td>
        <td style="cursor: pointer;"><span class="cart_delete">Delete</span></td>
    `;

    cartTable.appendChild(tr);

    // Listen for quantity change
    const quantityInput = tr.querySelector("input");
    quantityInput.addEventListener("change", function(event) {
        updateCartItemQuantity(event.target.dataset.id, event.target.value);
        cartTotal();
    });
    deleteCart();
    cartTotal();
}

async function updateCartItemQuantity(id, quantity) {
    try {
        const response = await fetch(`http://localhost:3001/cart-items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Quantity: quantity })
        });

        if (!response.ok) {
            throw new Error('Failed to update cart item');
        }

        console.log('Cart item updated successfully');
    } catch (error) {
        console.error('Error updating cart item:', error);
    }
}

function deleteCart() {
    const deleteButtons = document.querySelectorAll(".cart_delete");

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", function(event) {
            const cartItemRow = event.target.parentElement.parentElement;
            const id = cartItemRow.querySelector("input").dataset.id;

            cartItemRow.remove();
            deleteCartItemFromDatabase(id);
            cartTotal();
        });
    });
}

async function deleteCartItemFromDatabase(id) {
    try {
        const response = await fetch(`http://localhost:3001/cart-items/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete cart item');
        }

        console.log('Cart item deleted successfully');
    } catch (error) {
        console.error('Error deleting cart item:', error);
    }
}

function cartTotal() {
    var cartItems = document.querySelectorAll("tbody tr");
    var total = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var inputValue = cartItems[i].querySelector("input").value;
        var productPrice = cartItems[i].querySelector(".price").innerText;
        productPrice = productPrice.replace("$", "");
        var subtotal = parseFloat(inputValue) * parseFloat(productPrice);
        total += subtotal;
    }

    var cartTotalElement = document.querySelector(".price-total span");
    cartTotalElement.innerHTML = "$" + total.toFixed(2);
}
