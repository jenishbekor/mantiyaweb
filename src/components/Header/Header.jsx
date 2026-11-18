import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import HeaderIcon from './HeaderIcon'
import { readCart } from '../../cart'

import './Header.css'

function Header() {
    const [openPath, setOpenPath] = useState(null)
    const { pathname } = useLocation()
    const open = openPath === pathname
    const close = () => setOpenPath(null)
    const [cart, setCart] = useState(readCart)

    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0)
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
                <Link to="/cart" className="header-cart" onClick={close} aria-label={`Корзина: ${cartQuantity}`}><HeaderIcon name="cart" /><b>{cartQuantity}</b></Link>
            </div>


        </header>
    )
}

export default Header

