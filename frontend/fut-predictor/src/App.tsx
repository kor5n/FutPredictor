import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Ratings from './pages/Ratings'
import PredictorPage from './pages/PredictorPage'
import Header from './components/Header'
import MainPage from './pages/MainPage'

export default function App(){
    return(
        <>
            <Header />
            <main>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />}/>
                        <Route path='/ratings' element={<Ratings />} />
                        <Route path='/predict' element={<PredictorPage />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    )
}