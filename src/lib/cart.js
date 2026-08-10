const sampleCart = [

    {
        product: {
            productId: "123456",
            name: "Sample Product 1",
            image: "https://images.unsplash.com/photo-1682685794700-1f3e7c8d9b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            price: 1000,
            labelledPrice: 1500,
        },
        qty: 5
    },

    {
        product: {
            productId: "123457",
            name: "Sample Product 2",
            image: "https://images.unsplash.com/photo-1682685794700-1f3e7c8d9b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            price: 2000,
            labelledPrice: 2500,
        },
        qty: 2
    }

]



export function getCart() {
    const cartInString = localStorage.getItem("cart");

    if (cartInString == null) {
        localStorage.setItem("cart", "[]");
        return [];
    } else {
        try {
            const cart = JSON.parse(cartInString);
            return Array.isArray(cart) ? cart : [];
        } catch {
            localStorage.setItem("cart", "[]");
            return [];
        }
    }
}

export function addToCart(product, qty) {
    const cart = getCart();

    // check if product already exists in cart
    const productIndex = cart.findIndex((item) => item.product?.productId === product.productId);

    if (productIndex === -1) {
        if (qty < 1) {
            return;
        }

        const image = Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : (product.image || "");

        const labelledPrice = product.labelledPrice ?? product.labledPrice ?? product.labeledPrice;

        cart.push({
            product: {
                productId: product.productId,
                name: product.name,
                image: image,
                price: product.price,
                labelledPrice: labelledPrice,
            },
            qty: qty
        });
    } else {
        cart[productIndex].qty += qty;

        if (cart[productIndex].qty < 1) {
            cart.splice(productIndex, 1); // removes the item if qty becomes 0 or less
        }
    }

    const cartInString = JSON.stringify(cart);
    localStorage.setItem("cart", cartInString);
}

export function getCartTotal(cart = getCart()){
    if (!cart || !Array.isArray(cart)) return 0;
    let total = 0;

    for(let i = 0 ; i < cart.length ; i++){
        total += (cart[i]?.product?.price || 0) * (cart[i]?.qty || 0);
    }

    return total;
}

