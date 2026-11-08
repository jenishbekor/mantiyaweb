import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return <footer className="site-footer"><div className="container">
        <div className="footer-main">
            <div><Link to="/" className="footer-brand">Мантия</Link><p>Ваш момент. Ваша история.</p></div>
            <nav aria-label="Навигация в подвале"><h2>Быстрые ссылки</h2><Link to="/">Главная</Link><Link to="/catalog">Каталог</Link><Link to="/about">О нас</Link></nav>
            <div><h2>Для вашего выпускного</h2><p>Университет · Школа · Детский сад</p><p>Разные цвета и размеры</p></div>
            <div><h2>Создайте свой образ</h2><p>Найдите мантию для особенного дня.</p><Link to="/catalog" className="footer-catalog">Выбрать мантию →</Link></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Мантия. Все права защищены.</span><span>Прокат для ваших моментов</span></div>
    </div></footer>
}
export default Footer
