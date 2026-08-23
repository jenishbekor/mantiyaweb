function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm">
            <div className="container">
                <a className="navbar-brand fw-bold" href="#">
                    Мантия на прокат
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#home">
                                Главная страница
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#robes">
                                Мантии
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#how">
                                Как заказать?
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#contact">
                                Контакт
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar