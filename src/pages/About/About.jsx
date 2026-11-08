import Button from '../../components/Button/Button'
import './About.css'

const values = [
    { number: '01', title: 'Образ с характером', text: 'Сдержанная классика или выразительный цвет — в каталоге можно найти мантию под настроение вашего дня.' },
    { number: '02', title: 'Для разных достижений', text: 'Взрослые и детские модели для выпускного в университете, школе или детском саду.' },
    { number: '03', title: 'Внимание к деталям', text: 'Выбирайте модель, размер и цвет шарфа, чтобы собрать образ, который подходит именно вам.' },
]

function About() {
    return (
        <main className="about-page">
            <div className="container">
                <section className="about-intro" aria-labelledby="about-title">
                    <div><span className="home-eyebrow">НЕМНОГО О НАС</span><h1 id="about-title">У важных моментов<br />есть <em>свой образ.</em></h1><p>Выпускной — это завершение одной истории и начало другой. Мы помогаем подобрать мантию для этого особенного перехода.</p><p>В нашей коллекции — разные оттенки, взрослые и детские модели. Выбирайте то, что подчеркнёт ваше настроение, и сохраняйте воспоминания.</p><Button to="/catalog">Найти свою мантию <span aria-hidden="true">↗</span></Button></div>
                    <div className="about-visual"><img src="/mantii/green.png" alt="Изумрудная выпускная мантия с золотой отделкой" width="420" height="480" /><span>ДЕТАЛИ, КОТОРЫЕ СОЗДАЮТ НАСТРОЕНИЕ</span></div>
                </section>
                <section className="about-values" aria-labelledby="about-values-title"><span className="home-eyebrow">ЧТО ДЛЯ НАС ВАЖНО</span><h2 id="about-values-title">Вы в центре этого дня</h2><div className="about-values-grid">{values.map((value) => <article key={value.number}><span>{value.number}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></section>
                <section className="about-rental"><div><span className="home-eyebrow">ПОНЯТНЫЙ ВЫБОР</span><h2>Мантия на один день.<br /><em>Воспоминания — навсегда.</em></h2></div><div><strong>500 <small>сом / день</small></strong><p>Выберите модель в каталоге и укажите параметры в окне заказа.</p><Button to="/catalog" variant="secondary">Посмотреть коллекцию <span aria-hidden="true">↗</span></Button></div></section>
            </div>
        </main>
    )
}

export default About
