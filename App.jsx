const ATMDeposit = ({onChange, isDeposit, atmMode, isValid}) => {
	const choice = ['Deposit', 'Cash Back'];
	console.log(`ATM isDeposit: ${isDeposit}`);
	return (
		<label className="label huge">
		{
			atmMode !== "" &&
			<div>
				<h3> {choice[Number(!isDeposit)]}</h3>
				<input id="number-input" type="number" width="200" onChange={onChange}></input>
				<input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
			</div>
		}
		</label>
	);
};
const Account = () => {
	const [deposit, setDeposit] = React.useState(0);
	const [totalState, setTotalState] = React.useState(0);
	const [isDeposit, setIsDeposit] = React.useState(true);
	const [atmMode, setAtmMode] = React.useState('');
	const [validTransaction, setValidTransaction] = React.useState(false);
	let status = `Account Balance $ ${totalState} `;
	const handleChange = (event) => {
		let amount = event.target.value;
		setValidTransaction(!(amount <= 0 || (atmMode === 'Cash Back' && amount > totalState)));
		setDeposit(Number(amount));
	};
	const handleSubmit = (event) => {
		let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
		if (newTotal >= 0) {
			setTotalState(newTotal);
			event.preventDefault();
		}
	};
	const handleModeSelect = (event) => {
		let selectedOption = event.target.value;
		setAtmMode(selectedOption);
		setIsDeposit(selectedOption === 'Deposit');
	}
	return (
		<form onSubmit={handleSubmit}>
			<h2 id="total">{status}</h2>
			<label>Select an action below to continue</label>
			<select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
				<option id="no-selection" value=""></option>
				<option id="deposit-selection" value="Deposit">Deposit</option>
				<option id="cashback-selection" value="Cash Back">Cash Back</option>
			</select>
			<ATMDeposit
				onChange={handleChange}
				isDeposit={isDeposit}
				atmMode={atmMode}
				isValid={validTransaction} />
		</form>
	);
};
ReactDOM.render(<Account />, document.getElementById('root'));