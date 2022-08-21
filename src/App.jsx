//import css
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/app.css"
//hook
import { BrowserRouter, Routes, Route } from "react-router-dom"
//pages
import Home from "./Pages/Home"
import Painting from "./Pages/Painting"
import Mug from "./Pages/Mug"
import Funko from "./Pages/Funko"
import Cushion from "./Pages/Cushion"
import Shirt from "./Pages/Shirt"
//componet
import Navbar from "./Components/Navbar"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<Home />}  />
				<Route path='/painting' element={<Painting />}  />
				<Route path='/mug' element={<Mug />}  />
				<Route path='/funko' element={<Funko />}  />
				<Route path='/cushion' element={<Cushion />}  />
				<Route path='/shirt' element={<Shirt />}  />
			</Routes>
			<Navbar />
		</BrowserRouter>
	)
}

export default App
