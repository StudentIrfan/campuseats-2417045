import { Link } from 'react-router'
import VendorCard from '../components/VendorCard.jsx'
import SpecialBanner from '../components/SpecialBanner.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useVendors } from '../hooks/useVendors.js'

function HomePage() {
    const { vendors, loading, error, reload } = useVendors()

    let content

    if (loading) {
        content = <Loading />
    } else if (error) {
        content = <ErrorMessage message={error} onRetry={reload} />
    } else if (vendors.length === 0) {
        content = <p className="muted">No vendors are available right now.</p>
    } else {
        content = (
            <>
                <section>
                    <h2 className="section-title">Today's Specials</h2>

                    <div className="grid">
                        {vendors.map((vendor) => {
                            const specialItem = vendor.menu.find(
                                (item) => item.special === true
                            )

                            if (!specialItem || !vendor.dailySpecial) {
                                return null
                            }

                            return (
                                <SpecialBanner
                                    key={vendor.id}
                                    item={specialItem}
                                    vendorName={vendor.name}
                                    endTime={vendor.dailySpecial.endTime}
                                    to={`/vendor/${vendor.id}`}
                                />
                            )
                        })}
                    </div>
                </section>

                <section>
                    <h2 className="section-title">Choose a vendor</h2>

                    <div className="vendor-grid">
                        {vendors.map((vendor) => (
                            <VendorCard
                                key={vendor.id}
                                vendor={vendor}
                            />
                        ))}
                    </div>
                </section>
            </>
        )
    }

    return (
        <main className="container">
            {content}
        </main>
    )
}

export default HomePage