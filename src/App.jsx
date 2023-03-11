import { useCallback, useMemo, useState } from 'react'
import { CheckboxGroup } from './components'
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

	const handleNameChange = event => {
		const { value } = event.target
		handleCheckboxChange(value, setSelectedNames)
	}

	const handleCompanyChange = event => {
		const { value } = event.target
		handleCheckboxChange(value, setSelectedCompanies)
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
		<div className="container mx-auto my-8 max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
			<h1 className="font-sans font-semibold text-gray-600 sm:text-xl md:text-4xl">
				Customer Details
			</h1>

			<div>
				<h3>Names</h3>
				<CheckboxGroup
					options={uniqueNames}
					selectedValues={selectedNames}
					handleChange={handleNameChange}
				/>
			</div>

			<div>
				<h3>Companies</h3>
				<CheckboxGroup
					options={uniqueCompanies}
					selectedValues={selectedCompanies}
					handleChange={handleCompanyChange}
				/>
			</div>

			<div className="overflow-x-auto">
				<table className="font-gray-700 min-w-full divide-y divide-gray-300 text-center text-base">
					<thead>
						<tr className="font-semibold">
							<th className="py-4 px-3">Name ▼</th>
							<th className="py-4 px-3">Company ▼</th>
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
