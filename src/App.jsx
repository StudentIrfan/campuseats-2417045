import { BrowserRouter, Routes, Route } from 'react-router'
import CartProvider from './context/CartProvider.jsx'
import VendorsProvider from './context/VendorsProvider.jsx'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import VendorPage from './pages/VendorPage.jsx'
import CartPage from './pages/CartPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <VendorsProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="vendor/:id" element={<VendorPage />} />
                            <Route path="cart" element={<CartPage />} />
                            <Route path="orders" element={<OrdersPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </VendorsProvider>
            </CartProvider>
        </BrowserRouter>
    )
}

export default App