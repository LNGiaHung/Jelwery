let totalAmount = 0;
let productsForMomo = ""; // Thay đổi thành chuỗi rỗng ban đầu
let productCounter = 1; // Bộ đếm để đánh số thứ tự sản phẩm
document.addEventListener('DOMContentLoaded', function() {
    fetchCartItemsFromDatabase();
});

const user1 = JSON.parse(sessionStorage.getItem('user'));
const allowedUsername = user1.user.Mail;
console.log('Allowed Username:', allowedUsername);  // Kiểm tra username được phép

async function fetchCartItemsFromDatabase() {
    try {
        const response = await fetch('http://localhost:3001/cart-items');
        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        console.log('Fetched Data:', data);  // Kiểm tra dữ liệu nhận được từ API
        const cartItems = data.cartItems;
        cartItems.forEach(item => {
            if (item.username === allowedUsername) {
                addCart(item);
            }
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}

function addCart(item) {
    productNameForMomo = item.Name;
    console.log('Adding Item to Cart:', item);  // Kiểm tra từng item được thêm vào giỏ hàng
    const { PID, Price, Image, Name, Weight, Material, Size, Quantity } = item;
    const subtotal = Price * Quantity;
    const cartBody = document.querySelector(".paymentnebox__box2-ndbox");

    if (!cartBody) {
        console.error('Cart body element not found');  // Kiểm tra xem phần tử cart body có tồn tại không
        return;
    }

    const cartItem = document.createElement("div");
    cartItem.classList.add("paymentnebox__box2-ndbox-grid");

    cartItem.innerHTML = `
        <div class="paymentnebox__box2-ndbox-grid-left">
        <div class="paymentnebox__box2-ndbox-img">
            <img src="${Image}" alt="">
        </div>
    </div>

    <div class="paymentnebox__box2-ndbox-grid-right">
        <div class="product-infor">
            <span class="product__atrributes-name">${Name}</span>
            <span class="product__atrributes-ID">${PID}</span>
            <span class="product__atrributes-price">VND ${Price}</span>
            <span class="product__atrributes-weight">Weight: ${Weight}</span>
            <span class="product__atrributes-material">Material: ${Material}</span>
            <span class="product__atrributes-size">Size: ${Size}</span>
            <span class="paymentne-pay-total__price">Subtotal: VND ${subtotal.toLocaleString()}</span>
        </div>
    </div>
    `;
   
     // Thêm thông tin sản phẩm vào chuỗi productsForMomo
    productsForMomo += `Product ${productCounter}: ${Name} - Quantity: ${Quantity}; `;
    productCounter++; // Tăng bộ đếm sản phẩm
    cartBody.appendChild(cartItem);

    cartTotal();
}

function cartTotal() {
    const cartItems = document.querySelectorAll(".paymentne-pay-total__price");
    let total = 0;

    if (cartItems.length === 0) {
        console.error('No cart items found');  
        return;
    }

    cartItems.forEach(cartItem => {
        const priceText = cartItem.textContent.replace(/[^0-9.-]+/g, "");
        const price = parseFloat(priceText);
        if (!isNaN(price)) {
            total += price;
        } else {
            console.error(`Error parsing price: ${priceText}`);
        }
    });

    const totalSubtotalElement = document.querySelector(".paymentne-pay-total__total");
    if (!totalSubtotalElement) {
        console.error('Total subtotal element not found');  
        return;
    }
    totalSubtotalElement.textContent = "TOTAL inc. sales tax: VND " + total.toLocaleString();
    
    totalAmount = total; // assuming totalAmount is declared somewhere else
    console.log('Total:', total);  
}




// Momo
let selectedPaymentMethod = ''; // Biến để lưu trữ phương thức thanh toán đã chọn

document.querySelector('.paymentne-select').addEventListener('change', function(event) {
    // Lưu phương thức thanh toán đã chọn khi sự kiện change xảy ra
    selectedPaymentMethod = event.target.value;
});

// document.querySelector('.paymentne-checkoutbtn').addEventListener('click', async function(event) {
//     event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

//     // Kiểm tra xem phương thức thanh toán đã được chọn là 'Momo' chưa
//     if (selectedPaymentMethod === 'Momo') {
//         // Nếu đã chọn 'Momo', bạn có thể thực hiện các xử lý tiếp theo ở đây
//         console.log('Selected payment method:', selectedPaymentMethod);
//         console.log("Total amount", totalAmount );
//         const amount = totalAmount;
//         console.log('Initiating payment with amount:', amount);

//         try {
//             const response = await fetch('http://localhost:3001/payment', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ amount })
//             });

//             const data = await response.json();
//             console.log('Response from server:', data);

//             if (data.payUrl) {
//                 window.location.href = data.payUrl;
//             } else {
//                 alert('Payment initiation failed');
//             }
        
//             totalAmount = 0; // Đặt lại giá trị totalAmount
//         } catch (error) {
//             console.error('Error during payment initiation:', error);
//             alert('An error occurred. Please try again.');
//         }
//     } else {
//         // Nếu không chọn 'Momo', bạn có thể thực hiện các xử lý tương ứng ở đây
//         console.log('Please select Momo as payment method.');
//     }
// });

// Function để thực hiện thanh toán Momo
document.querySelector('.paymentne-checkoutbtn').addEventListener('click', async function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

    // Kiểm tra xem phương thức thanh toán đã được chọn là 'Momo' chưa
    if (selectedPaymentMethod === 'Momo') {
        // Nếu đã chọn 'Momo', bạn có thể thực hiện các xử lý tiếp theo ở đây
        console.log('Selected payment method:', selectedPaymentMethod);
        console.log("Total amount", totalAmount );
        const amount = totalAmount * 1000;
        console.log('Initiating payment with amount:', amount);

        try {
            const response = await fetch('http://localhost:3001/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                 body: JSON.stringify({ amount, orderInfo: productsForMomo }) // Truyền thông tin về sản phẩm cho thanh toán Momo
            });

            const data = await response.json();
            console.log('Response from server:', data);

            if (data.payUrl) {
                window.location.href = data.payUrl; // Chuyển hướng đến trang thanh toán nếu có payUrl
            } else {
                alert('Payment initiation failed');
            }

            // // Kiểm tra xem thanh toán có thành công không và hiển thị thông báo tương ứng
            // if (data.statusCode === 200) {
            //     const confirmation = confirm('Payment successful: ' + data.message + '. Click OK to proceed to landing page.');
            //     if (confirmation) {
            //         window.location.href = 'http://127.0.0.1:5502/B%E1%BA%A3n%20sao%20Bijou/landingPage.html';
            //     }
            // } else {
            //     alert('Payment failed: ' + data.message);
            // }

            totalAmount = 0; // Đặt lại giá trị totalAmount
        } catch (error) {
            console.error('Error during payment initiation:', error);
            alert('An error occurred. Please try again.');
        }
    } else {
        // Nếu không chọn 'Momo', bạn có thể thực hiện các xử lý tương ứng ở đây
        console.log('Please select Momo as payment method.');
    }
});



// document.getElementById('status-form').addEventListener('submit', async function(event) {
//     event.preventDefault();
//     const orderId = document.getElementById('orderId').value;
//     console.log('Checking status for order ID:', orderId);

//     try {
//         const response = await fetch('http://localhost:5000/status-transaction', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ orderId })
//         });

//         const data = await response.json();
//         console.log('Transaction status:', data);
//         alert(`Transaction status: ${data.message}`);
//     } catch (error) {
//         console.error('Error during status check:', error);
//         alert('An error occurred. Please try again.');
//     }
// });


