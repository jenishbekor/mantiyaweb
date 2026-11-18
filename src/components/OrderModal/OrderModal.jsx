import { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import './OrderModal.css'
import { readCart, saveCart, stockForSize, quantityInCart } from '../../cart'

// все возможные цвета шарфа: название → цвет кружка
const COLOR_HEX = {
    'Золотой': '#d4af37',
    'Жёлтый': '#f2c200',
    'Белый': '#ffffff',
    'Красный': '#c62828',
    'Бордовый': '#7b1e3a',
    'Синий': '#1e3a8a',
    'Зелёный': '#2e7d32',
    'Чёрный': '#111111',
}

function OrderModal({ robe, onClose }) {
    const dialogRef = useRef(null)
    const photos = [robe.image, ...(robe.images ?? []).filter(image => image !== robe.image)].map(image => '/mantii/' + image)
    const [activePhoto, setActivePhoto] = useState(0)
    const changePhoto = direction => setActivePhoto(current => (current + direction + photos.length) % photos.length)
    useEffect(() => {
        if (photos.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const timer = window.setTimeout(() => setActivePhoto(current => (current + 1) % photos.length), 5000)
        return () => window.clearTimeout(timer)
    }, [activePhoto, photos.length])
    const sizes = Object.keys(robe.stock)
    const colors = (robe.scarfColors ?? Object.keys(COLOR_HEX)).map((name) => ({
        name,
        hex: COLOR_HEX[name],
    }))

    const [date, setDate] = useState('')
    const today = new Date().toLocaleDateString('en-CA')
    const [quantities, setQuantities] = useState({})
    const totalQuantity = Object.values(quantities).reduce((total, quantity) => total + quantity, 0)
    const available = size => date ? Math.max(0, stockForSize(robe.image, size, date) - quantityInCart(readCart(), robe.image, size, date)) : 0
    const changeQuantity = (size, delta) => setQuantities(current => ({ ...current, [size]: Math.min(available(size), Math.max(0, (current[size] || 0) + delta)) }))
    const [color, setColor] = useState(colors.length === 1 ? colors[0] : null)

    useEffect(() => {
        const previousFocus = document.activeElement
        const previousOverflow = document.body.style.overflow
        dialogRef.current?.querySelector('button')?.focus()
        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key !== 'Tab') return
            const buttons = dialogRef.current?.querySelectorAll('button:not(:disabled)')
            if (!buttons?.length) return
            const first = buttons[0]
            const last = buttons[buttons.length - 1]
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }
        document.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = previousOverflow
            previousFocus?.focus()
        }
    }, [onClose])

    const handleSubmit = () => {
        if (!date || !color || !totalQuantity) return
        const items = readCart()
        Object.entries(quantities).filter(([, quantity]) => quantity > 0).forEach(([size, quantity]) => {
            const allowed = Math.min(quantity, Math.max(0, stockForSize(robe.image, size, date) - quantityInCart(items, robe.image, size, date)))
            if (!allowed) return
            const existing = items.find(item => item.image === robe.image && item.size === size && item.scarf === color.name && item.date === date)
            if (existing) existing.quantity += allowed
            else items.push({ title: robe.title, image: robe.image, size, scarf: color.name, date, quantity: allowed })
        })
        saveCart(items)
        onClose()
    }

    return (
        <>
            <div className="modal-backdrop fade show"></div>

            <div ref={dialogRef} className="modal rental-order-modal fade show d-block" role="dialog" aria-modal="true" aria-labelledby="order-title" tabIndex="-1" onClick={onClose}>
                <div
                    className="modal-dialog modal-dialog-centered"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content border-0 rounded-4">
                        <div className="modal-header border-0">
                            <h5 id="order-title" className="modal-title fw-bold">{robe.title}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Закрыть"
                            />
                        </div>

                        <div className="modal-body">
                            <div className="order-slideshow" role="region" aria-roledescription="карусель" aria-label="Фото мантии и выпускные образы" onKeyDown={event => {
                                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                                    event.preventDefault()
                                    changePhoto(event.key === 'ArrowLeft' ? -1 : 1)
                                }
                            }}>
                                {photos.map((src, index) => (
                                    <img key={src} src={src} alt={`${robe.title} — фото ${index + 1}`} className={'order-slide' + (activePhoto === index ? ' is-active' : '')} aria-hidden={activePhoto !== index} />
                                ))}
                                {photos.length > 1 && <>
                                <button type="button" className="order-slide-arrow order-slide-prev" onClick={() => changePhoto(-1)} aria-label="Предыдущее фото">‹</button>
                                <button type="button" className="order-slide-arrow order-slide-next" onClick={() => changePhoto(1)} aria-label="Следующее фото">›</button>
                                <div className="order-slide-dots">
                                    {photos.map((src, index) => <button key={src} type="button" className={activePhoto === index ? 'is-active' : ''} onClick={() => setActivePhoto(index)} aria-label={`Фото ${index + 1}`} aria-pressed={activePhoto === index} />)}
                                </div>
                                </>}
                            </div>

                            <label className="fw-semibold mb-2" htmlFor="rental-date">Дата аренды</label>
                            <input id="rental-date" className="form-control mb-4" type="date" min={today} value={date} onChange={event => { setDate(event.target.value); setQuantities({}) }} />
                            <p className="fw-semibold mb-2">Размеры и количество</p>
                            <p className="text-muted small">Можно выбрать несколько размеров.</p>
                            <div className="order-sizes mb-4">
                                {sizes.map((s) => (
                                    <div key={s} className="order-size-option">
                                    <button
                                        type="button"
                                        className={`btn ${quantities[s] > 0 ? 'btn-success' : 'btn-outline-secondary'}`}
                                        onClick={() => setQuantities(current => ({ ...current, [s]: current[s] > 0 ? 0 : 1 }))}
                                        disabled={available(s) === 0 && !quantities[s]}
                                        aria-pressed={quantities[s] > 0}
                                    >
                                        {s}
                                    </button>
                                    <small>{date ? `Доступно: ${available(s)} шт.` : 'Выберите дату'}</small>
                                    <div className="order-size-counter" role="group" aria-label={`Количество размера ${s}`}>
                                        <button type="button" onClick={() => changeQuantity(s, -1)} disabled={!quantities[s]} aria-label={`Уменьшить количество размера ${s}`}>−</button>
                                        <span aria-live="polite">{quantities[s] || 0}</span>
                                        <button type="button" onClick={() => changeQuantity(s, 1)} disabled={(quantities[s] || 0) >= available(s)} aria-label={`Увеличить количество размера ${s}`}>+</button>
                                    </div>
                                    </div>
                                ))}
                            </div>

                            <p className="fw-semibold mb-2">
                                Цвет шарфа{color && <span className="text-muted fw-normal">: {color.name}</span>}
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                {colors.map((c) => (
                                    <button
                                        key={c.name}
                                        type="button"
                                        title={c.name}
                                        aria-label={c.name}
                                        aria-pressed={color?.name === c.name}
                                        onClick={() => setColor(c)}
                                        className="rounded-circle p-0"
                                        style={{
                                            width: 36,
                                            height: 36,
                                            backgroundColor: c.hex,
                                            border: '1px solid #ccc',
                                            outline: color?.name === c.name ? '3px solid #198754' : 'none',
                                            outlineOffset: 2,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="modal-footer border-0">
                            <Button variant="secondary" onClick={onClose}>
                                Отмена
                            </Button>
                            <Button
                                disabled={!date || !totalQuantity || !color}
                                onClick={handleSubmit}
                            >
                                Добавить в корзину{totalQuantity > 0 ? ` · ${totalQuantity} шт.` : ''}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderModal
