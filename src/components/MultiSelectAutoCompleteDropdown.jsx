import { useState, useMemo } from 'react'
import { CloseIcon } from '../assets/icons'

function MultiSelectAutocompleteDropdown({
	label,
	options,
	selectedValues,
	handleChange,
}) {
	const [inputValue, setInputValue] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const filteredOptions = useMemo(() => {
		return options.filter(option =>
			option.toLowerCase().includes(inputValue.toLowerCase())
		)
	}, [options, inputValue])

	const handleInputChange = e => {
		setInputValue(e.target.value)
		setIsOpen(true)
	}

	const handleOptionClick = option => {
		handleChange([...selectedValues, option])
		setInputValue('')
		setIsOpen(false)
	}

	const handleTagCloseClick = option => {
		handleChange(selectedValues.filter(value => value !== option))
		setInputValue('')
		setIsOpen(false)
	}

	const renderOption = option => {
		const isSelected = selectedValues.includes(option)

		return (
			<div
				key={option}
				className="flex cursor-pointer items-center justify-between px-3 py-2 text-left hover:bg-gray-100"
				onClick={() =>
					isSelected ? handleTagCloseClick(option) : handleOptionClick(option)
				}>
				{option}
				{isSelected && (
					<button type="button" onClick={() => handleTagCloseClick(option)}>
						<CloseIcon className="h-5 w-5 stroke-current text-blue-400 hover:text-blue-500 focus:text-blue-500" />
					</button>
				)}
			</div>
		)
	}

	return (
		<div className="relative w-full min-w-max">
			<input
				type="text"
				value={inputValue}
				placeholder={`Select ${label}`}
				onChange={handleInputChange}
				onClick={() => setIsOpen(true)}
				className="mt-2 w-full rounded-md border border-none border-gray-300 px-3 py-2 text-center outline-none placeholder:text-blue-500"
			/>
			{isOpen && (
				<div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white">
					{filteredOptions.map(renderOption)}
				</div>
			)}
		</div>
	)
}

export default MultiSelectAutocompleteDropdown
