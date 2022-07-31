if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}
function ready(){
    
    var cartItemButton = document.getElementsByClassName('btn-danger') 
    for(var i=0; i<cartItemButton.length; i++) {
       var button = cartItemButton[i]
       button.addEventListener('click', removeCartItem)
       }  
       var quantityInput = document.getElementsByClassName('cart-quantity-input')
       for(var i=0; i<quantityInput.length; i++) {
        var input = quantityInput[i]
        input.addEventListener('change', updateQuantity)
       }
    var   addToCartButton = document.getElementsByClassName('shop-item-button')
       for(var i=0; i<addToCartButton.length; i++) {
      var  button = addToCartButton[i]
      button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}
function removeCartItem(event){
    var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateTotalPrice()
    }

function updateTotalPrice(){
var cartItems = document.getElementsByClassName('cart-items')[0]
var cartRows = cartItems.getElementsByClassName('cart-row')
var  total = 0
for(var i=0; i<cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
var price = parseFloat(priceElement.innerText.replace('$', ''))
var quantity = quantityElement.value
    total = total + (price * quantity)
}
total = Math.round(total*100)/100
   var totalPrice = document.getElementsByClassName("cart-total-price")[0].innerText = '$' + total
}
function updateQuantity(event){
var input = event.target
if(isNaN(input.value) || input.value<1 ){
input.value = 1}
updateTotalPrice()
}

function addToCartClicked(event){
var button = event.target
var shopItem = button.parentElement.parentElement
var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
addItemToCart(title,price,imageSrc)
updateTotalPrice()
}
   
function addItemToCart(title, price, imageSrc){
   var cartRow = document.createElement('div')
   var cartItemNames = document.getElementsByClassName('cart-item-title')
   for(var i=0; i<cartItemNames.length; i++) {
    if(cartItemNames[i].innerText == title){
        alert('this item is already added')
        return
    }
   }
   var  cartRowContent = `<div class="cart-row">
   <div class="cart-item cart-column">
       <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
       <span class="cart-item-title">${title}</span>
  </div>
   <span class="cart-price cart-column">${price}</span>
   <div class="cart-quantity cart-column">
       <input class="cart-quantity-input" type="number" value="1">
       <button class="btn btn-danger cart-quantity-button" type="button">REMOVE</button>
   </div>
</div>`
   var cartItems = document.getElementsByClassName('cart-items')[0]
  
       cartRow.innerHTML = cartRowContent
       cartItems.append(cartRow)
       cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
       cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updateTotalPrice)

}
function purchaseClicked(){
    alert('thank you for your purchase')
    cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
   }
updateTotalPrice()
}
