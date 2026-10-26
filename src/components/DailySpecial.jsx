import { useEffect, useState } from 'react'

function getRemainingMs(endTime) {
    const [hours, minutes] = endTime.split(':').map(Number)
    const now = new Date()
    const end = new Date(now)
    end.setHours(hours, minutes, 0, 0)

    return Math.max(0, end.getTime() - now.getTime())
}

function formatEndTime(endTime) {
    const [hours, minutes] = endTime.split(':').map(Number)
    const time = new Date()
    time.setHours(hours, minutes, 0, 0)

    return time.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
    })
}

function formatCountdown(remainingMs) {
    const totalSeconds = Math.floor(remainingMs / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return [hours, minutes, seconds]
        .map((value) => String(value).padStart(2, '0'))
        .join(':')
}

function DailySpecial({ item, vendorName, endTime, onAdd }) {
    const [remainingMs, setRemainingMs] = useState(() => getRemainingMs(endTime))

    useEffect(() => {
        const updateCountdown = () => {
            setRemainingMs(getRemainingMs(endTime))
        }

        updateCountdown()
        const intervalId = setInterval(updateCountdown, 1000)

        return () => clearInterval(intervalId)
    }, [endTime])

    if (!item) {
        return <p className="muted">The daily special is not configured correctly.</p>
    }

    const isExpired = remainingMs <= 0
    const countdownLabel = isExpired
        ? "Today's special has ended"
        : `Ends in ${formatCountdown(remainingMs)}`

    return (
        <article className="card daily-special">
            <div className="daily-special-top">
                <span className="tag">TODAY'S SPECIAL</span>
                <p
                    className={isExpired ? 'daily-special-countdown expired' : 'daily-special-countdown'}
                    role="timer"
                >
                    {countdownLabel}
                </p>
            </div>

            <div className="daily-special-content">
                <div className="thumb" aria-hidden="true">
                    {item.name.charAt(0)}
                </div>
                <div className="daily-special-details">
                    <h3>{item.name}</h3>
                    <p className="muted">From {vendorName}</p>
                    <p className="muted">Available until {formatEndTime(endTime)}</p>
                    <p className="muted">{item.description}</p>
                    <p className="price">RM {item.price.toFixed(2)}</p>
                    <button
                        className="btn"
                        disabled={!item.available || isExpired}
                        onClick={() => onAdd(item)}
                    >
                        {!item.available
                            ? 'Sold out'
                            : isExpired
                                ? 'Special ended'
                                : 'Add special to cart'}
                    </button>
                </div>
            </div>
        </article>
    )
}

export default DailySpecial