//dropdown menu cua han
document.addEventListener('DOMContentLoaded', function() {
    let dropdowns = document.querySelectorAll('.menusection .select');

    dropdowns.forEach(function(drop) {
        
        drop.addEventListener('click', function(event) {
            let currentDropDown = this.nextElementSibling;
            if (currentDropDown.style.display === 'block') {
                currentDropDown.style.display = 'none';
                caret.classList.toggle('caret-rotate');
            }
            else {
                currentDropDown.style.display = 'block';
            }

            dropdowns.forEach(function(other){
                if(other.nextElementSibling !== currentDropDown) {
                    other.nextElementSibling.style.display = 'none';
                }
            })
        })
    });
    window.onclick = function (event) {
        if(!event.target.matches('.menusection .select')) {
            dropdowns.forEach(function(drop) {
                var openDropDown = drop.nextElementSibling;
                if (openDropDown.style.display === 'block') {
                    openDropDown.style.display = 'none';
                }
            })
                
        }
    }
});

//add to cart cua Han

const shoppingBagIcons = [
    document.getElementById('shopping-bag')];
const headerShoppingBag = document.querySelector('.quanity');

shoppingBagIcons.forEach(shoppingBagIcon => {
    shoppingBagIcon.addEventListener('click', () => {
      let currentQuantity = parseInt(headerShoppingBag.textContent);
      headerShoppingBag.textContent = currentQuantity + 1;
    });
});


