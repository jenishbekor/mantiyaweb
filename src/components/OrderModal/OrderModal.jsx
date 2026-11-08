import { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import './OrderModal.css'
import { readCart, saveCart } from '../../cart'

// размеры по умолчанию, если у мантии свой список не указан
const SIZES = ['42', '44', '46', '48', '50', '52', '54', '56']

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
    const sizes = robe.sizes ?? SIZES
    const colors = (robe.scarfColors ?? Object.keys(COLOR_HEX)).map((name) => ({
        name,
        hex: COLOR_HEX[name],
    }))

    const [size, setSize] = useState(sizes.length === 1 ? sizes[0] : null)
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
        saveCart([...readCart(), { title: robe.title, image: robe.image, size, scarf: color.name }])
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
                            <img
                                src={'/mantii/' + robe.image}
                                alt={robe.title}
                                className="img-fluid d-block mx-auto mb-4"
                                style={{ maxHeight: '220px', objectFit: 'contain' }}
                            />

                            <p className="fw-semibold mb-2">Размер</p>
                            <div className="d-flex flex-wrap gap-2 mb-4">
                                {sizes.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        className={`btn ${size === s ? 'btn-success' : 'btn-outline-secondary'}`}
                                        onClick={() => setSize(s)}
                                        aria-pressed={size === s}
                                    >
                                        {s}
                                    </button>
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
                                disabled={!size || !color}
                                onClick={handleSubmit}
                            >
                                Добавить в корзину
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderModal
