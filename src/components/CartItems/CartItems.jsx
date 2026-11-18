import { readCart, saveCart } from '../../cart'

export default function CartItems({ cart }) {
    const cartGroups = Array.from(cart.reduce((groups, item, index) => {
        const key = JSON.stringify([item.image, item.scarf])
        if (!groups.has(key)) groups.set(key, { ...item, key, sizes: [] })
        groups.get(key).sizes.push({ ...item, index })
        return groups
    }, new Map()).values())
    const changeQuantity = (index, delta) => {
        const items = readCart()
        if (!items[index]) return
        saveCart(items.map((item, i) => i === index ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0))
    }
    return (cart.length === 0 ? <p>Ваша корзина пуста.</p> : (
                    <ul className="header-cart-items">
                        {cartGroups.map(group => (
                            <li key={group.key}>
                                <img src={'/mantii/' + group.image} alt="" />
                                <div className="header-cart-details">
                                    <strong>{group.title}</strong>
                                    <p>Шарф: {group.scarf}</p>
                                    <span>500 сом / день за шт.</span>
                                    {group.sizes.map(item => (
                                        <div key={item.size} className="header-cart-size">
                                            <span>Размер {item.size} · {item.quantity * 500} сом / день</span>
                                            <div className="header-cart-counter" role="group" aria-label={`${group.title}, шарф ${group.scarf}, размер ${item.size}`}>
                                                <button type="button" onClick={() => changeQuantity(item.index, -1)} aria-label={`Уменьшить количество размера ${item.size}`}>−</button>
                                                <span aria-live="polite">{item.quantity}</span>
                                                <button type="button" onClick={() => changeQuantity(item.index, 1)} aria-label={`Увеличить количество размера ${item.size}`}>+</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" className="header-cart-remove" onClick={() => saveCart(readCart().filter(item => item.image !== group.image || item.scarf !== group.scarf))} aria-label={`Удалить ${group.title}, шарф ${group.scarf}`}>×</button>
                            </li>
                        ))}
                    </ul>
                ))

}
