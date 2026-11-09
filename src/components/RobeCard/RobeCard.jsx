import HeaderIcon from '../Header/HeaderIcon'

function RobeCard({ image, title, description, price, onOrder }) {
    return (
        <article className="robe-card">
            <div className="robe-card-image">
                <span className="robe-card-tag">{image.endsWith('_k.png') ? 'Детская коллекция' : 'Выпускная коллекция'}</span>
                <button type="button" className="robe-card-photo-button" onClick={onOrder} aria-label={'Выбрать размеры: ' + title}><img src={'/mantii/' + image} alt={title} loading="lazy" decoding="async" /></button>
                <button type="button" className="robe-card-quick" onClick={onOrder} aria-label={'Выбрать: ' + title}><span aria-hidden="true">↗</span></button>
            </div>
            <div className="robe-card-body">
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="robe-card-footer">
                    <span className="robe-card-price">{price}</span>
                    <button type="button" className="robe-card-cart" onClick={onOrder} aria-label={'Добавить в корзину: ' + title}><HeaderIcon name="cart" /></button>
                </div>
            </div>
        </article>
    )
}

export default RobeCard
