import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { useCart } from './context/useCart'

import AmbientBackground from './components/AmbientBackground'
import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Offers from './pages/Offers'
import PlayStation from './pages/PlayStation'
import Xbox from './pages/Xbox'
import Nintendo from './pages/Nintendo'
import Cart from './pages/Cart'
import PaymentMethods from './pages/PaymentMethods'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import ProfilePrueba from './pages/ProfilePrueba'
import ProductDetail from './pages/ProductDetail'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function ToastDisplay() {
  const { toastMessage } = useCart()
  if (!toastMessage) return null
  return (
    <div className="toast-notice">
      <i className="fa-solid fa-circle-check" style={{ color: 'var(--red)' }}></i>
      <span>{toastMessage}</span>
    </div>
  )
}

function AppLayout() {
  const location = useLocation()
  const isAuthPage = [
    '/iniciar',
    '/iniciar.html',
    '/registrar',
    '/registrar.html',
    '/olvidar',
    '/olvidar.html'
  ].includes(location.pathname.toLowerCase())

  return (
    <>
      <ScrollToTop />
      <AmbientBackground />
      {!isAuthPage && <Header />}
      
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/indexiniciada.html" element={<Home />} />

        {/* EXPLORAR / CATALOG */}
        <Route path="/explorar" element={<Catalog />} />
        <Route path="/explorar.html" element={<Catalog />} />
        <Route path="/explorariniciada.html" element={<Catalog />} />

        {/* OFERTAS */}
        <Route path="/ofertas" element={<Offers />} />
        <Route path="/ofertas.html" element={<Offers />} />
        <Route path="/ofertasiniciada.html" element={<Offers />} />

        {/* PLATFORMS */}
        <Route path="/play" element={<PlayStation />} />
        <Route path="/play.html" element={<PlayStation />} />
        <Route path="/playiniciada.html" element={<PlayStation />} />

        <Route path="/xbox" element={<Xbox />} />
        <Route path="/xbox.html" element={<Xbox />} />
        <Route path="/xboxiniciada.html" element={<Xbox />} />

        <Route path="/nintendo" element={<Nintendo />} />
        <Route path="/nintendo.html" element={<Nintendo />} />
        <Route path="/nintendoiniciada.html" element={<Nintendo />} />

        {/* CART */}
        <Route path="/carrito" element={<Cart />} />
        <Route path="/carrito.html" element={<Cart />} />
        <Route path="/carritoiniciada.html" element={<Cart />} />

        {/* PAYMENT METHODS */}
        <Route path="/metodosdepago" element={<PaymentMethods />} />
        <Route path="/metodosdepago.html" element={<PaymentMethods />} />

        {/* AUTH */}
        <Route path="/iniciar" element={<Login />} />
        <Route path="/iniciar.html" element={<Login />} />

        <Route path="/registrar" element={<Register />} />
        <Route path="/registrar.html" element={<Register />} />

        <Route path="/olvidar" element={<ForgotPassword />} />
        <Route path="/olvidar.html" element={<ForgotPassword />} />

        {/* PROFILE */}
        <Route path="/perfil" element={<Profile />} />
        <Route path="/perfil.html" element={<Profile />} />
        <Route path="/perfiliniciada.html" element={<Profile />} />

        <Route path="/perfilprueba" element={<ProfilePrueba />} />
        <Route path="/perfilprueba.html" element={<ProfilePrueba />} />

        {/* PRODUCT DETAIL ROUTE */}
        <Route path="/producto/:slug" element={<ProductDetail />} />

        {/* LEGACY PRODUCT DETAIL ROUTES */}
        <Route path="/portadablackmythwukong.html" element={<ProductDetail explicitSlug="portadablackmythwukong" />} />
        <Route path="/portadablackmythwukong" element={<ProductDetail explicitSlug="portadablackmythwukong" />} />

        <Route path="/portadadecyberpunk.html" element={<ProductDetail explicitSlug="portadadecyberpunk" />} />
        <Route path="/portadadecyberpunk" element={<ProductDetail explicitSlug="portadadecyberpunk" />} />

        <Route path="/portadadeeldenring.html" element={<ProductDetail explicitSlug="portadadeeldenring" />} />
        <Route path="/portadadeeldenring" element={<ProductDetail explicitSlug="portadadeeldenring" />} />

        <Route path="/portadadef124.html" element={<ProductDetail explicitSlug="portadadef124" />} />
        <Route path="/portadadef124" element={<ProductDetail explicitSlug="portadadef124" />} />

        <Route path="/portadadefc25.html" element={<ProductDetail explicitSlug="portadadefc25" />} />
        <Route path="/portadadefc25" element={<ProductDetail explicitSlug="portadadefc25" />} />

        <Route path="/portadadeforzahorizon5.html" element={<ProductDetail explicitSlug="portadadeforzahorizon5" />} />
        <Route path="/portadadeforzahorizon5" element={<ProductDetail explicitSlug="portadadeforzahorizon5" />} />

        <Route path="/portadadegodofwarragnarok.html" element={<ProductDetail explicitSlug="portadadegodofwarragnarok" />} />
        <Route path="/portadadegodofwarragnarok" element={<ProductDetail explicitSlug="portadadegodofwarragnarok" />} />

        <Route path="/portadadehogwartslegacy.html" element={<ProductDetail explicitSlug="portadadehogwartslegacy" />} />
        <Route path="/portadadehogwartslegacy" element={<ProductDetail explicitSlug="portadadehogwartslegacy" />} />

        <Route path="/portadademinecraft.html" element={<ProductDetail explicitSlug="portadademinecraft" />} />
        <Route path="/portadademinecraft" element={<ProductDetail explicitSlug="portadademinecraft" />} />

        <Route path="/portadadenba2k25.html" element={<ProductDetail explicitSlug="portadadenba2k25" />} />
        <Route path="/portadadenba2k25" element={<ProductDetail explicitSlug="portadadenba2k25" />} />

        <Route path="/portadadereddeadredemption2.html" element={<ProductDetail explicitSlug="portadadereddeadredemption2" />} />
        <Route path="/portadadereddeadredemption2" element={<ProductDetail explicitSlug="portadadereddeadredemption2" />} />

        <Route path="/portadadezeldatotk.html" element={<ProductDetail explicitSlug="portadadezeldatotk" />} />
        <Route path="/portadadezeldatotk" element={<ProductDetail explicitSlug="portadadezeldatotk" />} />

        <Route path="/portadagta5.html" element={<ProductDetail explicitSlug="portadagta5" />} />
        <Route path="/portadagta5" element={<ProductDetail explicitSlug="portadagta5" />} />

        <Route path="/portadahalo.html" element={<ProductDetail explicitSlug="portadahalo" />} />
        <Route path="/portadahalo-iniciada.html" element={<ProductDetail explicitSlug="portadahalo" />} />
        <Route path="/portadahalo" element={<ProductDetail explicitSlug="portadahalo" />} />

        <Route path="/portadamario.html" element={<ProductDetail explicitSlug="portadamario" />} />
        <Route path="/portadamarioiniciada.html" element={<ProductDetail explicitSlug="portadamario" />} />
        <Route path="/portadamario" element={<ProductDetail explicitSlug="portadamario" />} />

        <Route path="/portadamortalkombat.html" element={<ProductDetail explicitSlug="portadamortalkombat" />} />
        <Route path="/portadamortalkombat" element={<ProductDetail explicitSlug="portadamortalkombat" />} />

        <Route path="/portadaresident.html" element={<ProductDetail explicitSlug="portadaresident" />} />
        <Route path="/portadaresidentinicial.html" element={<ProductDetail explicitSlug="portadaresident" />} />
        <Route path="/portadaresident" element={<ProductDetail explicitSlug="portadaresident" />} />

        <Route path="/portadaspiderman.html" element={<ProductDetail explicitSlug="portadaspiderman" />} />
        <Route path="/portadaspiderman" element={<ProductDetail explicitSlug="portadaspiderman" />} />

        {/* CATCH ALL */}
        <Route path="*" element={<Home />} />
      </Routes>

      {!isAuthPage && <Footer />}
      <ToastDisplay />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppLayout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
