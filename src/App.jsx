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
import NewProduct from "./Pages/NewProduct"
import FinishBuy from "./Pages/FinishBuy"
//componet
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import { ConnectAccount } from "./api/connectAccount"
import { PrivateRoute } from "./Pages/PrivateRoute"

function App() {
	return (
		<ConnectAccount>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/painting" element={<Painting />} />
					<Route path="/mug" element={<Mug />} />
					<Route path="/funko" element={<Funko />} />
					<Route path="/cushion" element={<Cushion />} />
					<Route path="/shirt" element={<Shirt />} />
					<Route path="/finishbuy" element={<PrivateRoute />}>
						<Route path="/finishbuy" element={<FinishBuy />} />
					</Route>
					<Route path="/newProduct" element={<NewProduct />} />
					<Route path="/newProduct/:id" element={<NewProduct />} />
				</Routes>
				<Navbar />
				<Footer />
			</BrowserRouter>
		</ConnectAccount>
	)
}

export default App
