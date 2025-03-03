import BarLoader from "react-spinners/BarLoader"

const LoadingSpinner = () => (
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
		}}
	>
		<BarLoader color="#1bced1" />
	</div>
)

export default LoadingSpinner
