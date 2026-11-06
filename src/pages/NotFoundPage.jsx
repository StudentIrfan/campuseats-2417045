import { Link } from 'react-router'

function NotFoundPage() {
    return (
        <main className="container">
            <section className="card">
                <h2>Page Not Found</h2>
                <p className="muted">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Link to="/" className="btn">
                    Back to Home
                </Link>
            </section>
        </main>
    )
}

export default NotFoundPage