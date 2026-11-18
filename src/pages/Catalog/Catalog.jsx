import { useState } from 'react'
import RobeCard from '../../components/RobeCard/RobeCard'
import OrderModal from '../../components/OrderModal/OrderModal'
import robes from '../../data/mantiya_data.json'
import './Catalog.css'

function Catalog() {
    const [selectedRobe, setSelectedRobe] = useState(null)
    const [filter, setFilter] = useState('all')
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
