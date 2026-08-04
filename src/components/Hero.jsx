function Hero() {
    return (
        <section id="home" className="hero-section">
            <div className="container">
                <div className="row align-items-center min-vh-75">

                    <div className="col-lg-6">
                        <h1 className="display-4 fw-bold">
                            Сиздин өзгөчө күнүңүз
                        </h1>

                        <p className="lead mt-3">
                            Бүтүрүү аземи үчүн сапаттуу жана стилдүү
                            мантияларды ижарага алыңыз.
                        </p>

                        <a
                            href="#robes"
                            className="btn btn-dark btn-lg mt-3"
                        >
                            Мантияларды көрүү
                        </a>
                    </div>

                    <div className="col-lg-6 mt-4 mt-lg-0">
                        <img
                            src="/mantiya.png"
                            alt="Graduation"
                            className="img-fluid rounded-4 shadow"
                            style={{ maxHeight: '700px', width: 'auto' }}
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero