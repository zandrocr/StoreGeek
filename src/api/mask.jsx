export const Mask = (props) => {
	return (Number(props.mask.replace(/\D/g, "")) / 100).toLocaleString({
		style: "currency",
		currency: "BRL",
	})
}

export const MaskChange = (props) => {
	return props.mask
		.replace(/\D+/g, "")
		.replace(/(\d{1})(\d{2})$/, props.replace)
		.replace(/^([0-9]{1})([0-9]{3})/g, "$1.$2")

}