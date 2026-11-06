export function Loading() {
    return (
        <div className="skeleton-grid" aria-label="Loading" aria-busy="true">
            {[1, 2, 3, 4].map((item) => (
                <div className="skeleton-card" key={item}>
                    <div className="skeleton-thumb"></div>

                    <div className="skeleton-content">
                        <div className="skeleton-line title"></div>
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line short"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function ErrorMessage({ message, onRetry }) {
    return (
        <div className="card error" role="alert">
            <p>Could not load menus: {message}</p>
            <button className="btn" onClick={onRetry}>Try again</button>
        </div>
    )
}