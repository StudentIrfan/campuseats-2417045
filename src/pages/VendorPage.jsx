import { useParams, Link } from 'react-router'
import MenuList from '../components/MenuList.jsx'
import SpecialBanner from '../components/SpecialBanner.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useVendors } from '../hooks/useVendors.js'
import useCart from '../hooks/useCart.js'

function VendorPage() {
    const { id } = useParams()
    const { vendors, loading, error, reload } = useVendors()
    const { addToCart } = useCart()

    const selectedVendor = vendors.find((vendor) => vendor.id === id) ?? null

    const specialItem = selectedVendor?.menu.find(
        (item) => item.special === true
    )

    let content

    if (loading) {
        content = <Loading />
    } else if (error) {
        content = <ErrorMessage message={error} onRetry={reload} />
    } else if (!selectedVendor) {
        content = <p className="muted">Vendor not found.</p>
    } else {
        content = (
            <>
                <section>
                    <h2 className="section-title">{selectedVendor.name}</h2>
                    <p className="muted">{selectedVendor.location}</p>
                    <p className="muted">Open: {selectedVendor.openHours}</p>

                    <span className={selectedVendor.isOpen ? 'status open' : 'status closed'}>
                        {selectedVendor.isOpen ? 'Open now' : 'Closed'}
                    </span>
                </section>

                {specialItem && selectedVendor.dailySpecial && (
                    <section>
                        <h2 className="section-title">Today's Special</h2>

                        <SpecialBanner
                            item={specialItem}
                            vendorName={selectedVendor.name}
                            endTime={selectedVendor.dailySpecial.endTime}
                            onAdd={addToCart}
                        />
                    </section>
                )}

                <section>
                    <h2 className="section-title">Menu: {selectedVendor.name}</h2>
                    <MenuList items={selectedVendor.menu} />
                </section>
            </>
        )
    }

    return (
        <main className="container">
            <p>
                <Link to="/">Back to vendors</Link>
            </p>

            {content}
        </main>
    )
}

export default VendorPage