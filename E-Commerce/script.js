document.addEventListener("DOMContentLoaded" ,()=>{

const product_list=document.getElementById('product-list');
const cart_list=document.getElementById('cart-list');
const emptyCartMessage=document.getElementById('empty-Cart');
const cartTotalMessage= document.getElementById('cart-total');
const total_price=document.getElementById('total-price');
const checkOut_btn=document.getElementById('checkout-btn');

const cart =[];
const products = [
{ id: 1, name: "Product 1", price: 29.99 },
{ id: 2, name: "Product 2", price: 19.99 },
{ id: 3, name: "Product 3", price: 59.999 },
];

//product showing 
products.forEach((product)=>{
    const productDiv=document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML=`<span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add To Cart</button>`;
    product_list.appendChild(productDiv);
})

product_list.addEventListener(('click'),(e)=>{
    if(e.target.tagName === "BUTTON"){
            console.log("clicked")
const productId = parseInt(e.target.getAttribute("data-id"));
const product=products.find(p=> p.id === productId)
        // console.log(product);
        addToCart(product);
    }

});

function addToCart(product){
    cart.push(product);
    console.log(cart)
    renderCart();
}

function renderCart(){
    // cart_list.innerText= "";
    cart_list.innerHTML = "";

    let totalPrice =0;

    if(cart.length >0){
        emptyCartMessage.classList.add("hidden");
        cartTotalMessage.classList.remove("hidden");
        cart.forEach((item, index)=>{
            totalPrice+=item.price;
            const cartItem = document.createElement('div');
            cartItem.innerHTML =` ${item.name} - $${item.price.toFixed(2)}`;
            cart_list.appendChild(cartItem);
            total_price.textContent= `${totalPrice.toFixed(2)}`;
        })
    }else {
        emptyCartMessage.classList.remove("hidden");
        
        total_price.textContent = `$0.00`;

    }

}
checkOut_btn.addEventListener("click",()=>{
    cart.length = 0;
    // alert("Successfully chackout");
            emptyCartMessage.classList.add("hidden");

    renderCart();
})


})