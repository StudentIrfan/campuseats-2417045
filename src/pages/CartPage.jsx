import { useNavigate, Link } from 'react-router'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import useCart from '../hooks/useCart.js'

function CartPage() {
    const { cart, total, changeQty, removeFromCart, placeOrder } = useCart()
    const navigate = useNavigate()

    function handlePlaceOrder(details) {
        const order = placeOrder(details)

        if (order) {
            navigate('/orders')
        }
    }

    if (cart.length === 0) {
        return (
            <main className="container">
                <section className="card">
                    <h2 className="section-title">Your Cart</h2>
                    <p className="muted">
                        Your cart is currently empty. Pick something from a menu first!
                    </p>
                    <Link to="/" className="btn">
                        Browse Menus
                    </Link>
                </section>
            </main>
        )
    }

    return (
        <main className="container">
            <div className="cart-layout">
                <div className="card">
                    <ul className="cart-list">
                        {cart.map((line) => (
                            <CartItem key={line.item.id} line={line}
                                onChangeQty={changeQty} onRemove={removeFromCart} />
                        ))}
                    </ul>
                    <p className="cart-total">Total: RM {total.toFixed(2)}</p>
                </div>
                <CheckoutForm onPlaceOrder={handlePlaceOrder} />
            </div>
        </main>
    )
}

export default CartPage