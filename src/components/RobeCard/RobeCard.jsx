function RobeCard({ image, title, description, price, onOrder }) {
    return (
        <article className="robe-card">
            <div className="robe-card-image">
                <span className="robe-card-tag">{image.endsWith('_k.png') ? 'Детская коллекция' : 'Выпускная коллекция'}</span>
                <img src={'/mantii/' + image} alt={title} loading="lazy" decoding="async" />
                <button type="button" className="robe-card-quick" onClick={onOrder} aria-label={'Выбрать: ' + title}><span aria-hidden="true">↗</span></button>
            </div>
            <div className="robe-card-body">
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="robe-card-footer">
                    <span className="robe-card-price">{price}</span>
                    <button type="button" onClick={onOrder}>Выбрать <span aria-hidden="true">→</span></button>
                </div>
            </div>
        </article>
    )
}

export default RobeCard
