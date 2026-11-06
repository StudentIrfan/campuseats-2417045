import { useContext } from 'react'
import VendorsContext from '../context/vendors-context.js'

export function useVendors() {
    const context = useContext(VendorsContext)

    if (!context) {
        throw new Error('useVendors must be used within a VendorsProvider')
    }

    return context
}

export default useVendors;