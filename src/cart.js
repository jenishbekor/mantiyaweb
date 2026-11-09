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
