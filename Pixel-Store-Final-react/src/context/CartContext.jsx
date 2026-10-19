import { useState, useEffect } from 'react'
import { CartContext } from './cart-context'

const CART_KEY = 'pixelStoreCart'

const INITIAL_CART = [
  {
    name: 'Mario Kart 8 Deluxe',
    img: 'mariokart.jpg',
    platform: 'Nintendo Switch',
    price: 289900,
    qty: 1
  },
  {
    name: 'Halo Infinite',
    img: 'halo.jpg',
    platform: 'Xbox Series X|S',
    price: 259900,
    qty: 1
  },
  {
    name: 'Resident Evil 4',
    img: 'resident4.jpg',
    platform: 'PS5',
    price: 239900,
    qty: 1
  }
]

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
      localStorage.setItem(CART_KEY, JSON.stringify(INITIAL_CART))
      return INITIAL_CART
    } catch {
      return INITIAL_CART
    }
  })

  const [toastMessage, setToastMessage] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
    } catch (e) {
      console.error(e)
    }
  }, [cart])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const addToCart = (product) => {
    const rawPrice = typeof product.price === 'number' 
      ? product.price 
      : parseInt(String(product.price || '0').replace(/\D/g, ''), 10) || 0

    const productName = product.name || product.title || 'Videojuego'
    const productImg = product.img || product.cover || 'banner.jpg'
    const productPlatform = product.platform || (product.details && product.details[0]) || 'Videojuego'

    setCart(prev => {
      const existing = prev.find(item => item.name === productName)
      if (existing) {
        return prev.map(item =>
          item.name === productName ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [
        ...prev,
        {
          name: productName,
          img: productImg,
          platform: productPlatform,
          price: rawPrice,
          qty: 1
        }
      ]
    })

    showToast(`¡"${productName}" añadido al carrito!`)
  }

  const removeFromCart = (name) => {
    setCart(prev => prev.filter(item => item.name !== name))
  }

  const updateQty = (name, delta) => {
    setCart(prev =>
      prev.map(item => {
        if (item.name === name) {
          const newQty = Math.max(1, (item.qty || 1) + delta)
          return { ...item, qty: newQty }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const cartCount = cart.reduce((acc, item) => acc + (item.qty || 1), 0)
  const subtotal = cart.reduce((acc, item) => acc + ((item.price || 0) * (item.qty || 1)), 0)
  const tax = Math.round(subtotal * 0.19)
  const total = subtotal + tax

  const formatMoney = (n) => {
    return '$' + Number(n).toLocaleString('es-CO')
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        subtotal,
        tax,
        total,
        formatMoney,
        toastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  )
}


