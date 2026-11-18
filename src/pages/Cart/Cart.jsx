import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CartItems from '../../components/CartItems/CartItems'
import { readCart } from '../../cart'
import './Cart.css'

export default function Cart() {
    const [cart, setCart] = useState(readCart)
    useEffect(() => {
        const sync = () => setCart(readCart())
        window.addEventListener('mantiya-cart-change', sync)
        window.addEventListener('storage', sync)
        return () => {
            window.removeEventListener('mantiya-cart-change', sync)
            window.removeEventListener('storage', sync)
        }
    }, [])
    const quantity = cart.reduce((total, item) => total + item.quantity, 0)

    return (
        <main className="container cart-page">
            <Link to="/catalog" className="cart-back">← Вернуться в каталог</Link>
            <h1>Корзина</h1>
            <p className="cart-page-intro">Проверьте выбранные мантии, размеры и количество.</p>
            <div className="cart-page-layout">
                <section className="cart-page-items" aria-label="Выбранные мантии">
                    <CartItems cart={cart} />
                </section>
                <aside className="cart-page-summary" aria-labelledby="cart-summary-title">
                    <h2 id="cart-summary-title">Ваш заказ</h2>
                    <p><span>Цена за 1 шт. / день</span><strong>500 сом</strong></p>
                    <p><span>Количество</span><strong aria-live="polite">{quantity} шт.</strong></p>
                    <div className="cart-page-total"><span>Общая сумма за день</span><strong aria-live="polite">{quantity * 500} сом</strong></div>
                    <button type="button" disabled={!cart.length}>Заказать</button>
                </aside>
            </div>
        </main>
    )
}
