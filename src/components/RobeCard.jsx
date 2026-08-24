function RobeCard({ image, title, description, price }) {
    return (
        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="p-3 bg-light text-center">
                <img
                    src={'mantii/'+image}
                    alt={title}
                    className="img-fluid"
                    style={{
                        height: '320px',
                        width: '100%',
                        objectFit: 'contain'
                    }}
                />
            </div>

            <div className="card-body p-4 d-flex flex-column">
                <h5 className="card-title fw-bold">
                    {title}
                </h5>

                <p className="card-text text-muted">
                    {description}
                </p>

                <div className="mt-auto">
                    <p className="fs-5 fw-bold mb-3">
                        {price}
                    </p>

                    <button className="btn btn-success w-100 rounded-3">
                        Заказать
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RobeCard