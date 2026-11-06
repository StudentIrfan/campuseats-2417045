import { Link } from 'react-router'
import useCart from '../hooks/useCart.js'

function OrdersPage() {
    const { orders } = useCart()

    let content

    if (orders.length === 0) {
        content = (
            <section className="card">
                <h3>No orders yet</h3>
                <p className="muted">You haven't placed any orders yet.</p>
                <Link to="/" className="btn">Browse menus</Link>
            </section>
        )
    } else {
        content = (
            <div className="order-list">
                {orders.map((order) => (
                    <section className="card order-card" key={order.id}>
                        <h3>Order #{order.id}</h3>

                        <p>Name: {order.name}</p>
                        <p>Mahallah: {order.mahallah}</p>
                        <p>Pickup Time: {order.pickupTime}</p>

                        <p className="muted">
                            Placed on: {new Date(order.placedAt).toLocaleString()}
                        </p>

                        <h4>Ordered Items</h4>
                        <ul>
                            {order.items.map((line) => (
                                <li key={line.item.id}>
                                    {line.item.name} × {line.qty}
                                    {' - RM '}
                                    {(line.item.price * line.qty).toFixed(2)}
                                </li>
                            ))}
                        </ul>

                        <p className="cart-total">
                            Total: RM {order.total.toFixed(2)}
                        </p>
                    </section>
                ))}
            </div>
        )
    }

    return (
        <main className="container">
            <h2 className="section-title">Order History</h2>
            {content}
        </main>
    )
}

export default OrdersPage