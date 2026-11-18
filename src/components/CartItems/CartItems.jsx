import { readCart, saveCart, stockForSize, quantityInCart, sizesForRobe } from '../../cart'

export default function CartItems({ cart }) {
    const cartGroups = Array.from(cart.reduce((groups, item, index) => {
        const key = JSON.stringify([item.image, item.scarf, item.date])
        if (!groups.has(key)) groups.set(key, { ...item, key, sizes: [] })
        groups.get(key).sizes.push({ ...item, index })
        return groups
    }, new Map()).values())
    const changeQuantity = (index, delta) => {
        const items = readCart()
        if (!items[index] || (delta > 0 && (!items[index].date || quantityInCart(items, items[index].image, items[index].size, items[index].date) >= stockForSize(items[index].image, items[index].size, items[index].date)))) return
        saveCart(items.map((item, i) => i === index ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0))
    }
    const addSize = (group, size) => {
        if (!size || !group.date) return
        const items = readCart()
        if (quantityInCart(items, group.image, size, group.date) >= stockForSize(group.image, size, group.date)) return
        const existing = items.find(item => item.image === group.image && item.scarf === group.scarf && item.date === group.date && item.size === size)
        if (existing) existing.quantity += 1
        else items.push({ title: group.title, image: group.image, scarf: group.scarf, date: group.date, size, quantity: 1 })
        saveCart(items)
    }
    return (cart.length === 0 ? <p>Ваша корзина пуста.</p> : (
                    <ul className="header-cart-items">
                        {cartGroups.map(group => (
                            <li key={group.key}>
                                <img src={'/mantii/' + group.image} alt="" />
                                <div className="header-cart-details">
                                    <strong>{group.title}</strong>
                                    <p>Шарф: {group.scarf}</p>
                                    <p>Дата аренды: {group.date ? group.date.split('-').reverse().join('.') : 'не указана'}</p>
                                    <span>500 сом / день за шт.</span>
                                    {(group.date ? Array.from(new Set([...sizesForRobe(group.image), ...group.sizes.map(item => item.size)])) : group.sizes.map(item => item.size)).map(size => {
                                        const item = group.sizes.find(entry => entry.size === size)
                                        const available = group.date ? Math.max(0, stockForSize(group.image, size, group.date) - quantityInCart(cart, group.image, size, group.date)) : 0
                                        return <div key={size} className="header-cart-size">
                                            <span>Размер {size}</span>
                                            <div className="header-cart-counter" role="group" aria-label={`${group.title}, шарф ${group.scarf}, размер ${size}`}>
                                                <button type="button" disabled={!item} onClick={() => changeQuantity(item.index, -1)} aria-label={`Уменьшить количество размера ${size}`}>−</button>
                                                <span aria-live="polite">{item?.quantity ?? 0}</span>
                                                <button type="button" disabled={!group.date || !available} onClick={() => item ? changeQuantity(item.index, 1) : addSize(group, size)} aria-label={`Увеличить количество размера ${size}`}>+</button>
                                            </div>
                                            <span>{group.date ? `Доступно: ${available} шт.` : 'Дата не указана'}</span>
                                            <span className="header-cart-size-price">{(item?.quantity ?? 0) * 500} сом / день</span>
                                        </div>
                                    })}
                                </div>
                                <button type="button" className="header-cart-remove" onClick={() => saveCart(readCart().filter(item => item.image !== group.image || item.scarf !== group.scarf || item.date !== group.date))} aria-label={`Удалить ${group.title}, шарф ${group.scarf}`}>×</button>
                            </li>
                        ))}
                    </ul>
                ))

}
