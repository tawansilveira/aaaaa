import {createContext, useEffect, useState} from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [productsCart, setProductsCart] = useState([]);

    function addProducToCart(product) {
        const copyProductsCart = [...productsCart];

        const item = copyProductsCart.find((prod) => prod.id === product.id);

        if (!item) {
            copyProductsCart.push({ id: product.id, qtdCarrinho: 1, product: product });
        } else {
            item.qtdCarrinho = item.qtdCarrinho + 1;
        }

        setProductsCart(copyProductsCart);
        console.log(JSON.stringify(productsCart))
    }

    function removeProductToCart(id) {
        const copyProductsCart = [...productsCart];

        const item = copyProductsCart.find((product) => product.id === id);

        if (item && item.qtdCarrinho > 1) {
            item.qtdCarrinho = item.qtdCarrinho - 1;
            setProductsCart(copyProductsCart);
        } else {
            const arrayFiltered = copyProductsCart.filter(
                (product) => product.id !== id
            );
            setProductsCart(arrayFiltered);
        }
    }

    function removeAllById(id) {
        console.log(id)
        const copyProductsCart = [...productsCart];

        const index = copyProductsCart.findIndex((product) => product.id === id);

        if (index !== -1) {
            copyProductsCart.splice(index, 1)
            setProductsCart(copyProductsCart);
        }
    }

    function clearCart() {
        setProductsCart([]);
    }

    function calcularTotal() {
        return productsCart.reduce((total, item) => {
            const precoTotalItem = item.product.price * item.qtdCarrinho;
            return total + precoTotalItem;
        }, 0);
    }

    return (
        <CartContext.Provider
            value={{ productsCart, addProducToCart, removeProductToCart, clearCart, removeAllById, calcularTotal }}
        >
            {children}
        </CartContext.Provider>
    );
}