import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Ratings from './pages/Ratings'
import PredictorPage from './pages/PredictorPage'
import Header from './components/Header'
import MainPage from './pages/MainPage'
import Footer from "./components/Footer"
import Player from "./pages/Player.tsx"

export default function App(){
    return(
	<>
            <Header />
            <main className='main-container'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />}/>
                        <Route path='/ratings' element={<Ratings />} />
                        <Route path='/predict' element={<PredictorPage />} />
			<Route path='/player/:id' element={<Player />}/>
                    </Routes>
                </BrowserRouter>
            </main>
            <Footer></Footer>
	</>
    )
}
