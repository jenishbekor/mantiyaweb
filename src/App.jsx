import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Catalog from './pages/Catalog/Catalog'
import Button from './components/Button/Button'

function RouteEffects() {
    const { pathname, hash } = useLocation()
    useEffect(() => {
        const titles = { '/': 'Мантия на прокат', '/catalog': 'Коллекция мантий', '/about': 'О нас — Мантия' }
        document.title = titles[pathname] ?? 'Страница не найдена — Мантия'
        if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
        else window.scrollTo(0, 0)
    }, [pathname, hash])
    return null
}

function App() {
    return (
        <BrowserRouter>
            <RouteEffects />
            <a href="#page-content" className="skip-link">Перейти к содержимому</a>
            <Header />
            <div id="page-content" className="page-content" tabIndex="-1">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<main className="container not-found"><span className="home-eyebrow">404</span><h1>Эта страница не найдена</h1><p>Продолжите знакомство с нашей коллекцией.</p><Button to="/catalog">Открыть каталог ↗</Button></main>} />
            </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    )
}

export default App;
