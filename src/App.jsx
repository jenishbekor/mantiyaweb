import {BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Catalog from './components/Catalog'

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/robes" element={<Catalog />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;