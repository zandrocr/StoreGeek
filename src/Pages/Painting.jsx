import Pages from "../Components/Pages"

const Painting = () => {

	return (
		<section className="">
			<Pages colle='Quadro' animation={animation} value={value} />
		</section>
	)
}

export default Painting

const animation = [
	{ type: "Marvel" },
	{ type: "Naruto" },
	{ type: "DC Comics" },
	{ type: "One Piece" },
	{ type: "Ciência" },
	{ type: "Hunter x Hunter" },
	{ type: "Jujutsu Kaisen" },
]

const value = [
	{ type: "De $R5,00 a R$20,00" },
	{ type: "De $R20,00 a R$50,00" },
	{ type: "De $R50,00 a R$100,00" },
	{ type: "De $R100,00 a R$200,00" },
]
