let cartButton = document.querySelectorAll('.btn-outline-primary')
// console.log(cartButton)

let products = [
    {
        typeOfGas : "pro gas",
        dealer : "Total",
        price : 1300,
        incart : 0
    }, {
        typeOfGas : "k-gas",
        dealer : "Ola",
        price : 1250,
        incart : 0
    },
    {
        typeOfGas : "mid gas",
        dealer : "none",
        price : 1000,
        incart : 0
    }
]

for(let i = 0; i< cartButton.length; i++){
    let cartButtonSelected = cartButton[i];
    cartButtonSelected.addEventListener('click',() => {
        cartNumbers(products[i])
        updateTotalPrice(products[i])
    })
}



function loadCartChanges(){
    let productNumbers = localStorage.getItem('cartNumbers')
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers
    }
}

function cartNumbers(product){
    // console.log("The product clicked is", product)
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else {
        localStorage.setItem('cartNumbers', 1)
        console.log(document.querySelector('.cart span').textContent)
        document.querySelector('.cart span').textContent = 1;
    }
    setProductItems(product)
}

function setProductItems(product){
    // console.log("Products include the following")
    // console.log("my products ", product)
    let cartItems = localStorage.getItem('productIncart')
    cartItems= JSON.parse(cartItems)
    // console.log("Items in my cart include",cartItems)

    if(cartItems != null){

        if(cartItems[product.dealer] == undefined){
            cartItems = {
                ...cartItems,
                [product.dealer] : product
            }
        }
        cartItems[product.dealer].incart += 1
    }else {
        product.incart = 1;

        cartItems  = {
           [product.dealer] : product
        }
    }    

    localStorage.setItem("productIncart", JSON.stringify(cartItems))

}


function displayCartItem() {
    let cartItems = localStorage.getItem('productIncart')
    cartItems = JSON.parse(cartItems)
    let cartItemContainer = document.querySelector('.cart-items')

    if (cartItems && cartItemContainer){
        cartItemContainer.innerHTML = ''
        Object.values(cartItems).map(items => {
            cartItemContainer += `
            
            `
        })
        console.log("running")
    }

    console.log(cartItems)
}

function updateTotalPrice(product){
    // console.log("The total price is: ",product.price)
    let totalCost = localStorage.getItem('totalPrice')
    // console.log(totalCost)
    // console.log(typeof totalCost)

    if(totalCost != null){
        totalCost = parseInt(totalCost)
        localStorage.setItem("totalPrice", totalCost + product.price)
    } else {
    localStorage.setItem("totalPrice", product.price)
    }

}


loadCartChanges()
displayCartItem()
