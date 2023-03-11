function CheckboxGroup({ options, selectedValues, handleChange }) {
	return (
		<div className="flex gap-x-2">
			{options.map((option, index) => (
				<div key={index} className="space-x-1">
					<input
						type="checkbox"
						id={`${option}-${index}`}
						name={option}
						value={option}
						checked={selectedValues.includes(option)}
						onChange={handleChange}
					/>
					<label htmlFor={`${option}-${index}`}>{option}</label>
				</div>
			))}
		</div>
	)
}

export default CheckboxGroup
