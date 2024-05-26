// wrapping caret
const checkboxLabel = document.querySelector('.custom-checkbox-label');
const caret = document.createElement('span');
caret.classList.add('caret');
const message = checkboxLabel.nextElementSibling;

checkboxLabel.addEventListener('click', () => {
  message.style.display = message.style.display === 'block' ? 'none' : 'block';
  if (message.style.display === 'block') {
    checkboxLabel.insertBefore(caret,checkboxLabel.firstChild);
  } else {
    caret.remove();
  }
});

// fit position cho cai content box
const adjustMessagePosition = () => {
  const messageWidth = message.offsetWidth;
  const messageHeight = message.offsetHeight;
  const labelWidth = checkboxLabel.offsetWidth;
  const labelHeight = checkboxLabel.offsetHeight;
  const caretWidth = caret.offsetWidth;

  message.style.left = '0';
  message.style.top = `${labelHeight}px`;

  if (messageWidth > labelWidth) {
    message.style.width = '400px';
  } else {
    message.style.width = 'auto';
  }
};

window.addEventListener('load', adjustMessagePosition);
window.addEventListener('resize', adjustMessagePosition);
checkboxLabel.addEventListener('click', adjustMessagePosition);

//gift message 
const messageBoxes = document.querySelectorAll('.message-box');
const messageBoxInputs = document.querySelectorAll('.message-box-input');
const messageBoxConfirms = document.querySelectorAll('.message-box-confirm');
const messageBoxCancels= document.querySelectorAll('.message-box-cancel');
const messageButtons = document.querySelectorAll('.cart__Body-item__btn.message');
const overlay = document.querySelector('.overllay');

messageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    messageBoxes.forEach((box) => {
      box.style.display = 'block';
    });
    messageBoxInputs.forEach((input) => {
      input.focus();
    });
    overlay.style.display = 'block';
  });
});

//confirm this tat
messageBoxConfirms.forEach((confirm) => {
    confirm.addEventListener('click', () => {
      messageBoxes.forEach((box) => {
        box.style.display = 'none';
      });
      overlay.style.display = 'none';
    });
  });


  messageBoxCancels.forEach((cancel) => {
    cancel.addEventListener('click', () => {
      messageBoxes.forEach((box) => {
        box.style.display = 'none';
      });
      overlay.style.display = 'none';
    });
  });
  
document.addEventListener('click', (event) => {
  if (event.target === overlay) {
    messageBoxes.forEach((box) => {
      box.style.display = 'none';
    });
    // overlay.style.display = 'none';
    overlay.style.display = 'block';
  }
});

//add wishlist
const wishlistButtons = document.querySelectorAll('.cart__Body-item__btn.wishlist');
const headerWishlist = document.querySelector('.quanityheart');

wishlistButtons.forEach(wishlistButton => {
  wishlistButton.addEventListener('click', () => {
    let currentQuantity = parseInt(headerWishlist.textContent);
    if (currentQuantity < 9) {
      headerWishlist.textContent = currentQuantity + 1;
    } else {
      headerWishlist.textContent = '9+';
    }
  });
});