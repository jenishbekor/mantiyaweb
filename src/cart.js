import robes from './data/mantiya_data.json'

export function sizesForRobe(image) {
    return Object.keys(robes.find(robe => robe.image === image)?.stock ?? {})
}

export function stockForSize(image, size, date) {
    const robe = robes.find(robe => robe.image === image)
    const stock = robe?.stockByDate?.[date]?.[size] ?? robe?.stock?.[size]
    return Number.isSafeInteger(stock) && stock >= 0 ? stock : 0
}

export function quantityInCart(items, image, size, date) {
    return items.filter(item => item.image === image && item.size === size && item.date === date).reduce((total, item) => total + item.quantity, 0)
}

export function readCart() {
    try {
        const items = JSON.parse(localStorage.getItem('mantiya-cart') || '[]')
        return Array.isArray(items) ? items.filter(item => item && typeof item.title === 'string' && typeof item.size === 'string' && typeof item.scarf === 'string').map(item => ({ ...item, quantity: Number.isSafeInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1 })) : []
    } catch { return [] }
}

export function saveCart(items) {
    localStorage.setItem('mantiya-cart', JSON.stringify(items))
    window.dispatchEvent(new Event('mantiya-cart-change'))
}
