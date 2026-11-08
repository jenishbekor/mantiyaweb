export function readCart() {
    try {
        const items = JSON.parse(localStorage.getItem('mantiya-cart') || '[]')
        return Array.isArray(items) ? items.filter(item => item && typeof item.title === 'string' && typeof item.size === 'string' && typeof item.scarf === 'string') : []
    } catch { return [] }
}

export function saveCart(items) {
    localStorage.setItem('mantiya-cart', JSON.stringify(items))
    window.dispatchEvent(new Event('mantiya-cart-change'))
}
