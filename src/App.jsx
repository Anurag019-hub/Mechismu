
import { BrowserRouter , Routes, Route } from 'react-router-dom';

import Preloader from './components/Preloader/Preloader.jsx';
import './App.css';

import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Contact' element={<Contact />} />
            </Routes>
        </BrowserRouter>
        <Preloader />
    );
}

export default App;