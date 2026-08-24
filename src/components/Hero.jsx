import { Link } from 'react-router-dom'

function Hero() {
    return (
        <section id="home" className="hero-section">
            <div className="container">
                <div className="row align-items-center min-vh-75">

                    <div className="col-lg-6">
                        <h1 className="display-4 fw-bold">
                            Запоминающийся выпускной
                        </h1>

                        <p className="lead mt-3">
                            В честь выпускного предлагаем качественные и стильные мантии
                        </p>

                        <Link
                            to="/robes"
                            className="btn btn-success btn-lg mt-3"
                        >
                            Просмотр мантии
                        </Link>
                    </div>

                    <div className="col-lg-6 mt-4 mt-lg-0">
                        <img
                            src="/mantiya.png"
                            alt="Graduation"
                            className="img-fluid rounded-4 shadow"
                            style={{ maxHeight: '500px', width: 'auto' }}
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero