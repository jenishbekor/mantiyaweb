import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Home.css'

const photos = ['/slideshow/mantiya1.png', '/slideshow/mantiya2.jpg', '/slideshow/mantiya3.jpg', '/slideshow/mantiya4.jpg', '/slideshow/mantiya5.JPG']
const benefits = [ ['◇', 'Качественные мантии', 'Для вашего особенного дня'], ['◈', '500 сом / день', 'Прозрачная стоимость аренды'], ['↻', 'Большой выбор', 'Разные цвета и размеры'], ['✧', 'Для всех выпускников', 'Университет, школа и детский сад'] ]

function Home() {
    const [activePhoto, setActivePhoto] = useState(0)
    const changePhoto = (direction) => setActivePhoto(current => (current + direction + photos.length) % photos.length)
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const timer = window.setTimeout(() => setActivePhoto(current => (current + 1) % photos.length), 5000)
        return () => window.clearTimeout(timer)
    }, [activePhoto])
    return (
        <main id="home" className="rental-home"><div className="container">
            <section className="home-hero" aria-labelledby="home-title">
                <div className="home-hero-copy">
                    <span className="home-eyebrow">КОЛЛЕКЦИЯ ДЛЯ ВАШИХ МОМЕНТОВ</span>
                    <h1 id="home-title">Мантия</h1>
                    <h2>Ваш день. Ваш неповторимый образ.</h2>
                    <p className="home-lead">Мантии для большого выпускного<br />и маленьких первых побед. Выберите свой стиль —<br />мы позаботимся об остальном.</p>
                    <Button to="/catalog">Выбрать мантию <span aria-hidden="true">→</span></Button>
                </div>
                <div className="home-hero-visual" role="region" aria-roledescription="карусель" aria-label="Выпускные образы" onKeyDown={event => {
                    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); changePhoto(event.key === 'ArrowLeft' ? -1 : 1) }
                }}>
                    {photos.map((src, index) => <img key={src} src={src} alt={`Выпускной образ в мантии — ${index + 1}`} fetchPriority={index === 0 ? 'high' : 'auto'} className={'home-slide' + (activePhoto === index ? ' is-active' : '')} aria-hidden={activePhoto !== index} />)}
                    <div className="home-slider-controls">
                        <button type="button" onClick={() => changePhoto(-1)} aria-label="Предыдущее фото">←</button>
                        <div className="home-slider-dots">{photos.map((src, index) => <button key={src} type="button" className={activePhoto === index ? 'is-active' : ''} onClick={() => setActivePhoto(index)} aria-label={`Фото ${index + 1}`} aria-pressed={activePhoto === index} />)}</div>
                        <button type="button" onClick={() => changePhoto(1)} aria-label="Следующее фото">→</button>
                    </div>
                </div>
                <div className="home-hero-script" aria-hidden="true">Ваш момент.<br />Ваша история.</div>
            </section>
            <section className="home-benefits" aria-label="Преимущества аренды">{benefits.map(([icon, title, text]) => <article key={title}><span aria-hidden="true">{icon}</span><div><strong>{title}</strong><small>{text}</small></div></article>)}</section>
            <section className="home-promo" aria-label="Аренда мантий">
                <div className="home-promo-copy"><span aria-hidden="true">✧</span><div><h2>Ваш выпускной образ</h2><p>Аренда мантии от 500 сом / день</p></div><Link to="/catalog">В каталог →</Link></div>
                <img src="/slideshow/mantiya4.jpg" alt="Выпускницы в мантиях" loading="lazy" />
                <Link to="/about" className="home-promo-about"><span aria-hidden="true">◎</span><div><strong>Всё для вашего праздника</strong><small>Познакомьтесь с нами →</small></div></Link>
            </section>
        </div></main>
    )
}
export default Home
