import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Ratings from './pages/Ratings'
import PredictorPage from './pages/PredictorPage'

export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/ratings' element={<Ratings />} />
                    <Route path='/predict' element={<PredictorPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}