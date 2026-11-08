import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from '../Button/Button'
import './Header.css'

function Header() {
    const [openPath, setOpenPath] = useState(null)
    const { pathname } = useLocation()
    const open = openPath === pathname
    const close = () => setOpenPath(null)

    return (
        <header className="site-header">
            <div className="header-topbar">
                <div className="container header-topbar-inner">
                    <a href="https://www.instagram.com/mantiya_na_prokat_bishkek/" target="_blank" rel="noopener noreferrer">
                        <span aria-hidden="true">◎</span> @mantiya_na_prokat_bishkek
                    </a>
                    <span className="header-topbar-divider" aria-hidden="true">|</span>
                    <a href="tel:+996700437733"><span aria-hidden="true">☎</span> +996 700 437 733</a>
                    <div className="header-topbar-note">Бесплатная доставка от 15 шт. <span aria-hidden="true">|</span> Кыргызстан</div>
                </div>
            </div>
            <div className="container header-inner">
                <Link to="/" className="brand" onClick={close} aria-label="Мантия — главная">
                    <span className="brand-symbol" aria-hidden="true">м.</span>
                    <span className="brand-name">Мантия<span>ПРОКАТ ДЛЯ ВАШИХ МОМЕНТОВ</span></span>
                </Link>
                <button type="button" className="header-toggle" onClick={() => setOpenPath(open ? null : pathname)} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? 'Закрыть меню' : 'Открыть меню'}>{open ? 'Закрыть ×' : 'Меню ☰'}</button>
                <nav id="site-navigation" className={'header-nav' + (open ? ' is-open' : '')} aria-label="Основная навигация">
                    <NavLink to="/" onClick={close}>Главная</NavLink>
                    <NavLink to="/catalog" onClick={close}>Каталог</NavLink>
                    <NavLink to="/about" onClick={close}>О нас</NavLink>
                    <Button to="/catalog" onClick={close} className="header-order">Выбрать мантию <span aria-hidden="true">↗</span></Button>
                </nav>
            </div>
        </header>
    )
}

export default Header
