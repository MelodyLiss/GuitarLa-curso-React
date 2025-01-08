import { useState,useEffect } from 'react'
import { db } from '../data/db'



export const useCart = () => {
    
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);
    const maxItem = 5
    const minItem = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    })

    const addToCart = (item) => {
        const itemExiste = cart.findIndex(guitar => guitar.id === item.id)

        if (itemExiste >= 0) {

            if (cart[itemExiste].quantity >= maxItem) return

            const updatedCart = [...cart]
            updatedCart[itemExiste].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    const increaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < maxItem) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > minItem) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    const clearCart = () => {
        setCart([])
    }

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart

    }
}