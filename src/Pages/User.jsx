//hook
import { connectEmail, createEmail, EmailContextAuth, GoogleContextAuth, SingOut } from "../api/connectAccount"
import { useState, useContext } from "react"
//components
import { Button } from "../Components/Button"
import Input from "../Components/input"
//css
import "../css/user.css"
import google from "../img/media/google.png"
import facebook from "../img/media/facebook.png"
import close from "../img/close.png"
import show from "../img/password/show.png"
import hide from "../img/password/hide.png"
import { useRef } from "react"

const User = (props) => {
	const [input, setInput] = useState({
		user: "",
		password: "",
	})

	const handleInput = (e) => {
		const { name, value } = e.target
		setInput({ ...input, [name]: value })
	}

	function clos() {
		props.set(!props.state)
		setButtonHide(false)
		setInput({ user: "", password: "" })
	}

	const [buttonHide, setButtonHide] = useState(false)
	function hiden() {
		setButtonHide(!buttonHide)
	}

	const { signInGoogle, signed, user } = useContext(GoogleContextAuth)
	let googleLog = JSON.parse(user)

	function connectGoggle() {
		signInGoogle()
	}

	function regist() {
		createEmail({
			email: input.user,
			password: input.password,
		})
	}

	const [email, setEmail] = useState(null)
	function enterEmail() {
		connectEmail({ setEmail: setEmail, email: email })
	}
	let emailLog = JSON.parse(localStorage.getItem("@AuthLogginEmail:user"))
	console.log(emailLog.email)

	return (
		<section
			data-user
			className={`col-12 d-flex justify-content-end ${
				props.display == true ? "position-fixed" : "d-none"
			} `}>
			{!emailLog.email ? (
				<div className="user col-12 col-lg-5 d-flex flex-column align-items-center">
					<h2>Login </h2>
					<div className="camp col-11">
						<Button scr={close} position="position-fixed" click={clos} />
						<Input
							id="user"
							title="Usuário"
							onChange={handleInput}
							placeholder="Seu usuário"
							value={input.user}
						/>
						<div className="d-flex align-items-end justify-content-between">
							<Input
								className="col-10"
								type={buttonHide == false ? "password" : ""}
								id="password"
								title="Senha"
								onChange={handleInput}
								placeholder="Sua senha"
								value={input.password}
							/>
							<Button scr={buttonHide == false ? show : hide} click={hiden} />
						</div>
						<div className="d-flex justify-content-between">
							<p>Recuperar senha</p>
							<p onClick={regist}>Registrar-se</p>
						</div>
					</div>
					<div className="login col-11 d-flex justify-content-around">
						<Button title="Entrar" data="login" click={enterEmail} />
					</div>
					<div className="media col-11 d-flex justify-content-around">
						<Button scr={google} data="google" click={connectGoggle} />
					</div>
				</div>
			) : (
				<div className="user col-12 col-lg-5 d-flex flex-column align-items-center">
					<div className="logUser col-12 d-flex flex-wrap justify-content-between">
						{/* <img src={googleLog.photoURL} alt="photoURL" /> */}
						<div className="d-flex flex-column justify-content-center">
							<h5>Olá</h5>
							{/* <h5>{googleLog.displayName}</h5> */}
						</div>
					</div>
					<div className="col-12 d-flex flex-column align-items-center align-items-md-start justify-content-around">
						<h6>Você está logado com</h6>
						{/* <h6>{googleLog.email}</h6> */}
					</div>

					<div className="logout">
						<Button title="Sair" click={SingOut} />
					</div>
				</div>
			)}
		</section>
	)
}

export default User
