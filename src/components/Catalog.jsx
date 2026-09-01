import RobeCard from './RobeCard'

function Catalog() {
    const robes = [
        {
            image: 'blue_with_yellow.png',
            title: 'Синяя с желтой полоской',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'dark_blue_with_s_yellow.png',
            title: 'Тёмно синяя с жёлтым тонкая полоска',
            description: 'Элегантная черная мантия с золотой отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'dark_blue_with_b_yellow.png',
            title: 'Тёмно синяя с жёлтым широкая полоска',
            description: 'Стильная мантия с яркой красной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'dark_blue_with_yellow.png',
            title: 'Темно синяя c желтым',
            description: 'Классическая мантия с синей отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'mantiya_blue_white.png',
            title: 'Темно синий с белым',
            description: 'Классическая черная мантия с зеленой отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'blue_elegant_with_white.png',
            title: 'Синий элегант с белым',
            description: 'Минималистичная черная мантия для выпускного.',
            price: '500 сом / день'
        },
        {
            image: 'purple.png',
            title: 'Фиолетовая с желтым',
            description: 'Минималистичная черная мантия для выпускного.',
            price: '500 сом / день'
        },
        {
            image: 'burgundy_with_yellow.png',
            title: 'Бардовая с желтым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'burgundy_with_white.png',
            title: 'Бардовая с белым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'green.png',
            title: 'Изумрудная с золотым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'black_with_gold.png',
            title: 'Черная с золотым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'black_with_brown.png',
            title: 'Черная с бордовым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'mantiya10.png',
            title: 'Черная с розовым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'mantiya11.png',
            title: 'Черная с красным',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'mantiya12.png',
            title: 'Черная с белым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'mantiya13.png',
            title: 'Черная с желтым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'mantiya14.png',
            title: 'Черная с фиолетовым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'mantiya15.png',
            title: 'Черная с зеленым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'mantiya16.png',
            title: 'Фиолетовая с желтым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'mantiya17.png',
            title: 'Бирюзовая с белым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
        },
        {
            image: 'mantiya18.png',
            title: 'Синяя с белым',
            description: 'Премиальная модель с аккуратной декоративной отделкой.',
            price: '500 сом / день'
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