import { useMemo, useState } from 'react'
import { MultiSelectAutoCompleteDropdown } from './components'
import { initialData, uniqueCompanies, uniqueNames } from './lib/data'

function App() {
	const [selectedNames, setSelectedNames] = useState([])
	const [selectedCompanies, setSelectedCompanies] = useState([])

	const handleCheckboxChange = (value, setState) => {
		setState(prevState => {
			if (prevState.includes(value)) {
				return prevState.filter(item => item !== value)
			} else {
				return [...prevState, value]
			}
		})
	}

	const handleNameChange = selected => {
		setSelectedNames(selected)
	}

	const handleCompanyChange = selected => {
		setSelectedCompanies(selected)
	}

	const filteredData = useMemo(() => {
		if (selectedNames.length === 0 && selectedCompanies.length === 0) {
			return initialData
		}

		return initialData.filter(item => {
			let nameMatch = selectedNames.length === 0
			let companyMatch = selectedCompanies.length === 0

			if (selectedNames.length > 0) {
				nameMatch = selectedNames.includes(item.name)
			}

			if (selectedCompanies.length > 0) {
				companyMatch = selectedCompanies.includes(item.company)
			}

			return nameMatch && companyMatch
		})
	}, [initialData, selectedNames, selectedCompanies])

	return (
		<div className="container mx-auto my-8 max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
			<h1 className="font-sans font-semibold text-gray-600 sm:text-xl md:text-4xl">
				Customer Details
			</h1>

			<div className="min-h-screen overflow-x-auto">
				<table className="font-gray-700 min-w-full divide-y divide-gray-300 text-center text-base">
					<thead>
						<tr className="font-semibold">
							<th className="py-4 px-3">
								<MultiSelectAutoCompleteDropdown
									label="Name ▼"
									handleChange={handleNameChange}
									options={uniqueNames}
									selectedValues={selectedNames}
								/>
							</th>
							<th className="py-4 px-3">
								<MultiSelectAutoCompleteDropdown
									label="Company ▼"
									options={uniqueCompanies}
									selectedValues={selectedCompanies}
									handleChange={handleCompanyChange}
									multiSelect={true}
								/>
							</th>
							<th className="py-4 px-3">Total Projects</th>
							<th className="py-4 px-3">Active Projects</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-200">
						{filteredData.map(row => (
							<tr key={row.id}>
								<td className="whitespace-nowrap py-4 px-3">{row.name}</td>
								<td className="whitespace-nowrap py-4 px-3">{row.company}</td>
								<td className="whitespace-nowrap py-4 px-3">{row.total}</td>
								<td className="whitespace-nowrap py-4 px-3">{row.active}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default App
