import { useState } from 'react'
import RobeCard from '../../components/RobeCard/RobeCard'
import OrderModal from '../../components/OrderModal/OrderModal'
import './Catalog.css'

function Catalog() {
    const [selectedRobe, setSelectedRobe] = useState(null)
    const [filter, setFilter] = useState('all')
    const robes = [
        {
            image: 'blue_with_yellow.png',
            title: 'Синяя с золотой полоской',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день',
            sizes: ['44', '46', '48', '50'],
            scarfColors: ['Золотой', 'Жёлтый']
        },
        {
            image: 'dark_blue_with_s_yellow.png',
            title: 'Тёмно-синяя с тонкими золотыми полосками',
            description: 'Элегантная черная мантия с золотой отделкой.',
            price: '500 сом / день',
            scarfColors: ['Золотой', 'Жёлтый']
        },
        {
            image: 'dark_blue_with_b_yellow.png',
            title: 'Тёмно синяя с широкими золотыми полосками',
            description: 'Стильная мантия с яркой красной отделкой.',
            price: '500 сом / день',
            scarfColors: ['Золотой', 'Жёлтый']
        },
        {
            image: 'dark_blue_with_yellow.png',
            title: 'Темно синяя c желтыми полосками',
            description: 'Классическая мантия с синей отделкой.',
            price: '500 сом / день',
            scarfColors: ['Золотой', 'Жёлтый']
        },
        {
            image: 'mantiya_blue_white.png',
            title: 'Темно синий с белым',
            description: 'Классическая черная мантия с зеленой отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'blue_elegant_with_white.png',
            title: 'Синий элегант с белым',
            description: 'Минималистичная черная мантия для выпускного.',
            price: '500 сом / день'
        },
        {
            image: 'dark_blue_with_grey.png',
            title: 'Темно синий с серым',
            description: 'Минималистичная черная мантия для выпускного.',
            price: '500 сом / день'
        },
        {
            image: 'purple.png',
            title: 'Фиолетовая с желтым',
            description: 'Минималистичная черная мантия для выпускного.',
            price: '500 сом / день'
        },
        {
            image: 'burgundy_with_yellow.png',
            title: 'Бардовая с желтым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'burgundy_with_white.png',
            title: 'Бардовая с белым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'green.png',
            title: 'Изумрудная с золотым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'black_with_gold.png',
            title: 'Черная с золотым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'black_with_brown.png',
            title: 'Черная с бордовым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'black_with_pink.png',
            title: 'Черная с розовым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'black_with_red.png',
            title: 'Черная с красным',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'black_with_white.png',
            title: 'Черная с белым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'black_with_purple.png',
            title: 'Черная с фиолетовым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'black_with_green.png',
            title: 'Черная с зеленым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'black_with_brown_l.png',
            title: 'Черная с бордовой полоской',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'dark_blue_with_yellow_k.png',
            title: 'Темно синяя детская',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'burgundy_with_yellow_k.png',
            title: 'Бардовая детская',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        }
    ]

    const categories = [
        { id: 'all', label: 'Все мантии' },
        { id: 'blue', label: 'Синие' },
        { id: 'black', label: 'Чёрные' },
        { id: 'color', label: 'Цветные' },
        { id: 'kids', label: 'Детские' },
    ]
    const filteredRobes = robes.filter((robe) => {
        const isKids = robe.image.endsWith('_k.png')
        if (filter === 'all') return true
        if (filter === 'kids') return isKids
        if (filter === 'blue') return !isKids && robe.image.includes('blue')
        if (filter === 'black') return robe.image.startsWith('black')
        return !isKids && !robe.image.includes('blue') && !robe.image.startsWith('black')
    })

    return (
        <main id="robes" className="rental-catalog">
            <div className="container">
                <div id="collection" className="catalog-collection-heading">
                    <div><span className="catalog-eyebrow">НАЙДИТЕ СВОЙ ОБРАЗ</span><h2>Коллекция мантий<span> / {robes.length}</span></h2></div>
                    <p>Разные оттенки. Один незабываемый день.</p>
                </div>
                <div className="catalog-toolbar">
                    <div className="catalog-filters" role="group" aria-label="Категории мантий">
                        {categories.map((category) => (
                            <button key={category.id} type="button" aria-pressed={filter === category.id} className={filter === category.id ? 'is-active' : ''} onClick={() => setFilter(category.id)}>{category.label}</button>
                        ))}
                    </div>
                    <span className="catalog-count" aria-live="polite">Моделей: {filteredRobes.length}</span>
                </div>
                <div className="catalog-grid">
                    {filteredRobes.map((robe) => (
                        <RobeCard key={robe.image} {...robe} onOrder={() => setSelectedRobe(robe)} />
                    ))}
                </div>
                <div className="catalog-bottom-note"><span aria-hidden="true">✳</span><p>Один шаг до вашего выпускного образа.<br /><strong>Выберите мантию и укажите размер в заказе.</strong></p><a href="#robes">Наверх ↑</a></div>
            </div>
            {selectedRobe && <OrderModal robe={selectedRobe} onClose={() => setSelectedRobe(null)} />}
        </main>
    )
}

export default Catalog
