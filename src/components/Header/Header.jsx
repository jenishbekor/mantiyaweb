import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import HeaderIcon from './HeaderIcon'
import { readCart, saveCart } from '../../cart'
import './Header.css'

function Header() {
    const [openPath, setOpenPath] = useState(null)
    const { pathname } = useLocation()
    const open = openPath === pathname
    const close = () => setOpenPath(null)
    const [cart, setCart] = useState(readCart)
    const cartDialog = useRef(null)
    useEffect(() => {
        const sync = () => setCart(readCart())
        window.addEventListener('mantiya-cart-change', sync)
        window.addEventListener('storage', sync)
        return () => {
            window.removeEventListener('mantiya-cart-change', sync)
            window.removeEventListener('storage', sync)
        }
    }, [])

    return (
        <header className="site-header">
            <div className="header-topbar">
                <div className="container header-topbar-inner">
                    <a href="https://www.instagram.com/mantiya_na_prokat_bishkek/" target="_blank" rel="noopener noreferrer">
                        <HeaderIcon name="instagram" /> @mantiya_na_prokat_bishkek
                    </a>
                    <span className="header-topbar-divider" aria-hidden="true">|</span>
                    <a href="https://wa.me/996700437733" target="_blank" rel="noopener noreferrer"><HeaderIcon name="whatsapp" /> +996 700 437 733</a>
                </div>
            </div>
            <div className="container header-inner">
                <Link to="/" className="brand" onClick={close} aria-label="Мантия — главная">
                    <span className="brand-name">Мантия на прокат<span>Кыргызстан</span></span>
                </Link>
                <button type="button" className="header-toggle" onClick={() => setOpenPath(open ? null : pathname)} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? 'Закрыть меню' : 'Открыть меню'}>{open ? 'Закрыть ×' : 'Меню ☰'}</button>
                <nav id="site-navigation" className={'header-nav' + (open ? ' is-open' : '')} aria-label="Основная навигация">
                    <NavLink to="/" onClick={close}>Главная</NavLink>
                    <NavLink to="/catalog" onClick={close}>Каталог</NavLink>
                    <NavLink to="/about" onClick={close}>О нас</NavLink>
                </nav>
                <button type="button" className="header-cart" onClick={() => cartDialog.current.showModal()} aria-label={`Корзина: ${cart.length}`}><HeaderIcon name="cart" /><b>{cart.length}</b></button>
            </div>
            <dialog ref={cartDialog} className="header-cart-panel" aria-labelledby="cart-title" onClick={event => { if (event.target === event.currentTarget) cartDialog.current.close() }}>
                <div className="header-cart-heading"><h2 id="cart-title">Ваша корзина</h2><button type="button" onClick={() => cartDialog.current.close()} aria-label="Закрыть корзину">×</button></div>
                {cart.length === 0 ? <p>Ваша корзина пуста.</p> : <ul className="header-cart-items">{cart.map((item, index) => <li key={index}><img src={'/mantii/' + item.image} alt="" /><div><strong>{item.title}</strong><p>Размер {item.size} · {item.scarf}</p><span>500 сом / день</span></div><button type="button" onClick={() => saveCart(cart.filter((_, i) => i !== index))} aria-label={`Удалить ${item.title}`}>×</button></li>)}</ul>}
                <div className="header-cart-total"><strong>Итого за день</strong><strong>{cart.length * 500} сом</strong></div>
                {cart.length > 0 && <a className="header-cart-checkout" href={'https://wa.me/996700437733?text=' + encodeURIComponent('Здравствуйте! Хочу арендовать мантии:\n' + cart.map(item => `${item.title}, размер ${item.size}, шарф: ${item.scarf}`).join('\n') + `\nИтого: ${cart.length * 500} сом / день`)} target="_blank" rel="noopener noreferrer">Оформить в WhatsApp →</a>}
                <Link to="/catalog" onClick={() => cartDialog.current.close()}>Продолжить выбор →</Link>
            </dialog>
        </header>
    )
}

export default Header
