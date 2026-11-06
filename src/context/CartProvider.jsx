import { useState } from 'react'
import CartContext from './cart-context.js'
import useLocalStorage from '../hooks/useLocalStorage.js'

export default function CartProvider({ children }) {
    const [cart, setCart] = useLocalStorage('campuseats-cart', [])
    const [orders, setOrders] = useLocalStorage('campuseats-orders', [])
    
    const count = cart.reduce((sum, line) => sum + line.qty, 0)
    const total = cart.reduce(
        (sum, line) => sum + line.item.price * line.qty,
        0
    )

    function addToCart(item) {
        setCart((prev) => {
            const existing = prev.find((line) => line.item.id === item.id)
            if (existing) {
                return prev.map((line) =>
                line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line)
            }
            return [...prev, { item, qty: 1 }]
        })
    }

    function changeQty(itemId, delta) {
            setCart((prev) =>
            prev
            .map((line) => line.item.id === itemId ? { ...line, qty: line.qty + delta } : line)
            .filter((line) => line.qty > 0)
        )
    }

    function removeFromCart(itemId) {
        setCart((prev) => prev.filter((line) => line.item.id !== itemId))
    }

    function placeOrder(details) {
        if (cart.length === 0) return null

        const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

        const order = {
            id: `order-${Date.now()}`,
            ...details,
            items: cart.map((line) => ({
                item: line.item,
                qty: line.qty,
            })),
            total,
            placedAt: new Date().toISOString(),
        }

        setOrders((prev) => [order, ...prev])
        setCart([])
        return order
    }

    const value = {
        cart,
        orders,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        placeOrder,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
