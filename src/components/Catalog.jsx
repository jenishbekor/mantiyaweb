import RobeCard from './RobeCard'

function Catalog() {
    const robes = [
        {
            image: '/mantiya_black_green.png',
            title: 'Черный с зеленым',
            description: 'Классическая черная мантия с зеленой отделкой.',
            price: '500 сом / день'
        },
        {
            image: '/mantiya_blue_white.png',
            title: 'Темно синий с белым',
            description: 'Элегантная черная мантия с золотой отделкой.',
            price: '600 сом / день'
        },
        {
            image: '/mantiya3.png',
            title: 'Черный с красным',
            description: 'Стильная мантия с яркой красной отделкой.',
            price: '550 сом / день'
        },
        {
            image: '/mantiya4.png',
            title: 'Черный с синим',
            description: 'Классическая мантия с синей отделкой.',
            price: '550 сом / день'
        },
        {
            image: '/mantiya5.png',
            title: 'Полностью черная',
            description: 'Минималистичная черная мантия для выпускного.',
            price: '500 сом / день'
        },
        {
            image: '/mantiya6.png',
            title: 'Премиум мантия',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '700 сом / день'
        }
    ]

    return (
        <section id="robes" className="py-5">
            <div className="container">

                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bold">
                        Каталог мантии
                    </h1>

                    <p className="text-muted">
                        Выберите подходящую мантию для вашего выпускного
                    </p>
                </div>

                <div className="row g-4">
                    {robes.map((robe, index) => (
                        <div
                            className="col-12 col-md-6 col-lg-4"
                            key={index}
                        >
                            <RobeCard
                                image={robe.image}
                                title={robe.title}
                                description={robe.description}
                                price={robe.price}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Catalog