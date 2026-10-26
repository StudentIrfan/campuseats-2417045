import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import DailySpecial from './components/DailySpecial.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
    const [cart, setCart] = useState([])
    const [selectedVendorId, setSelectedVendorId] = useState(null)
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [reloadKey, setReloadKey] = useState(0)
    const [view, setView] = useState('menu')
    const [lastOrder, setLastOrder] = useState(null)

    const selectedVendor = vendors.find((vendor) => vendor.id === selectedVendorId) ?? vendors[0] ?? null
    const cartCount = cart.reduce((total, line) => total + line.qty, 0)

    useEffect(() => {
        const controller = new AbortController()
        fetch('/api/vendors.json', { signal: controller.signal })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`)
            }
            return res.json()
        })
        .then((data) => {
            setVendors(data)
            setSelectedVendorId((current) => current ?? data[0]?.id ?? null)
        })
        .catch((err) => {
            if (err.name !== 'AbortError') setError(err.message)
        })
        .finally(() => {
            if (!controller.signal.aborted) setLoading(false)
        })
        return () => controller.abort()
    }, [reloadKey])

    let content
    if (view === 'cart') {
        content = (
            <CartPage cart={cart} onChangeQty={handleChangeQty}
                onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} />
        )
    } else if (view === 'done') {
        content = (
            <section className="card">
                <h2>Order placed</h2>
                <p>Thank you, {lastOrder.name}. Pick up at {lastOrder.pickupTime} (Mahallah {lastOrder.mahallah}). Total RM {lastOrder.total.toFixed(2)}.</p>
                <button className="btn" onClick={() => setView('menu')}>Back to menus</button>
            </section>
        )
    } else if (loading) {
        content = <Loading />
    } else if (error) {
        content = <ErrorMessage message={error} onRetry={() => {
            setLoading(true)
            setError(null)
            setReloadKey((k) => k + 1)
        }} />
    } else if (!selectedVendor) {
        content = <p className="muted">No vendors are available right now.</p>
    } else {
        content = <>
            <section>
                <h2 className="section-title">Choose a vendor</h2>
                <div className="vendor-grid">
                    {vendors.map((vendor) => (
                        <VendorCard
                            key={vendor.id}
                            vendor={vendor}
                            isSelected={vendor.id === selectedVendorId}
                            onSelect={setSelectedVendorId}
                        />
                    ))}
                </div>
            </section>
            {selectedVendor.dailySpecial && (
                <section>
                    <h2 className="section-title">Daily Special</h2>
                    <DailySpecial
                        item={selectedVendor.menu.find(
                            (item) => item.id === selectedVendor.dailySpecial.itemId
                        )}
                        vendorName={selectedVendor.name}
                        endTime={selectedVendor.dailySpecial.endTime}
                        onAdd={handleAddToCart}
                    />
                </section>
            )}
            <section>
                <h2 className="section-title">Menu: {selectedVendor.name}</h2>
                <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
            </section>
        </>
    }
    
    function handleAddToCart(item) {
        setCart((prev) => {
            const existing = prev.find((line) => line.item.id === item.id)
            if (existing) {
                return prev.map((line) =>
                line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line)
            }
            return [...prev, { item, qty: 1 }]
        })
    }

    function handleChangeQty(itemId, delta) {
            setCart((prev) =>
            prev
            .map((line) => line.item.id === itemId ? { ...line, qty: line.qty + delta } : line)
            .filter((line) => line.qty > 0)
        )
    }

    function handleRemove(itemId) {
        setCart((prev) => prev.filter((line) => line.item.id !== itemId))
    }

    function handlePlaceOrder(details) {
        const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
        setLastOrder({ ...details, total })
        setCart([])
        setView('done')
    }

    return (
        <>
        <Header cartCount={cartCount}
            onShowMenu={() => setView('menu')} onShowCart={() => setView('cart')}/>
        <main className="container"> {content} </main>
        <Footer />
        </>
    )
}

export default App