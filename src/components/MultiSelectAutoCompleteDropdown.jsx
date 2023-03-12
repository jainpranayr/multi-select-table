import { useState, useMemo, useRef } from 'react'
import { CloseIcon } from '../assets/icons'
import useOnClickOutside from '../hooks/useOnClickOutside'

function MultiSelectAutocompleteDropdown({
	label,
	options,
	selectedValues,
	handleChange,
}) {
	// Declare state variables for the input value and dropdown visibility
	const [inputValue, setInputValue] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	// Create a reference for the dropdown container element
	const dropdownRef = useRef(null)

	// Call the useOnClickOutside hook to close the dropdown when clicked outside
	useOnClickOutside(dropdownRef, () => {
		setIsOpen(false)
	})

	// Memoize the filtered options based on the current input value and options list
	const filteredOptions = useMemo(() => {
		return options.filter(option =>
			option.toLowerCase().includes(inputValue.toLowerCase())
		)
	}, [options, inputValue])

	// Update the input value and open the dropdown when text is entered into the input field
	const handleInputChange = e => {
		setInputValue(e.target.value)
		setIsOpen(true)
	}

	// Add a selected option to the list of values and close the dropdown when clicked
	const handleOptionClick = option => {
		handleChange([...selectedValues, option])
		setInputValue('')
		setIsOpen(false)
	}

	// Remove a selected option from the list of values and close the dropdown when clicked
	const handleTagCloseClick = option => {
		handleChange(selectedValues.filter(value => value !== option))
		setInputValue('')
		setIsOpen(false)
	}

	// Render a single dropdown option with a close button if already selected
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

	// Render the component with an input field and a dropdown list of options
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
				<div
					className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white"
					ref={dropdownRef}>
					{filteredOptions.map(renderOption)}
				</div>
			)}
		</div>
	)
}

export default MultiSelectAutocompleteDropdown
