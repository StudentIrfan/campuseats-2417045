import { useCallback, useEffect, useState } from 'react'
import VendorsContext from './vendors-context.js'

export default function VendorsProvider({ children }) {
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [reloadKey, setReloadKey] = useState(0)

    const reload = useCallback(() => {
        setLoading(true)
        setError(null)
        setReloadKey((key) => key + 1)
    }, [])

    useEffect(() => {
        const controller = new AbortController()

        const timeoutId = setTimeout(() => {
            fetch('/api/vendors.json', { signal: controller.signal })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status}`)
                    }

                    return res.json()
                })
                .then((data) => {
                    setVendors(data)
                })
                .catch((err) => {
                    if (err.name !== 'AbortError') {
                        setError(err.message)
                    }
                })
                .finally(() => {
                    if (!controller.signal.aborted) {
                        setLoading(false)
                    }
                })
        }, 600)

        return () => {
            clearTimeout(timeoutId)
            controller.abort()
        }
    }, [reloadKey])

    const value = {
        vendors,
        loading,
        error,
        reload,
    }

    return (
        <VendorsContext.Provider value={value}>
            {children}
        </VendorsContext.Provider>
    )
}