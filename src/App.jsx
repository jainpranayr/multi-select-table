import { useState } from 'react'
import { initialData } from './data'
import { getUniqueValues } from './utils'

const nameOptions = getUniqueValues(initialData, 'name')
const companyOptions = getUniqueValues(initialData, 'company')

function App() {
	const [selectedNames, setSelectedNames] = useState([])
	const [selectedCompanies, setSelectedCompanies] = useState([])

	function handleCheckboxChange(value, state, setState) {
		setState(prevState => {
			if (prevState.includes(value)) {
				return prevState.filter(item => item !== value)
			} else {
				return [...prevState, value]
			}
		})
	}

	const handleNameChange = event => {
		const { name, value } = event.target
		if (name === 'names') {
			handleCheckboxChange(value, selectedNames, setSelectedNames)
		} else if (name === 'companies') {
			handleCheckboxChange(value, selectedCompanies, setSelectedCompanies)
		}
	}

	const filteredData = initialData.filter(item => {
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

	return (
		<div className="container mx-auto my-8 max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
			<h1 className="font-sans font-semibold text-gray-600 sm:text-xl md:text-4xl">
				Customer Details
			</h1>

			<div>
				<h3>Names</h3>
				<div className="flex gap-x-2">
					{nameOptions.map((name, index) => (
						<div key={index} className="space-x-1">
							<input
								type="checkbox"
								id={`name-${name}`}
								name="names"
								value={name}
								checked={selectedNames.includes(name)}
								onChange={handleNameChange}
							/>
							<label htmlFor={`name-${name}`}>{name}</label>
						</div>
					))}
				</div>
			</div>

			<div>
				<h3>Companies</h3>
				<div className="flex gap-x-2">
					{companyOptions.map((company, index) => (
						<div key={index} className="space-x-1">
							<input
								type="checkbox"
								id={`company-${company}`}
								name="companies"
								value={company}
								checked={selectedCompanies.includes(company)}
								onChange={handleNameChange}
							/>
							<label htmlFor={`company-${company}`}>{company}</label>
						</div>
					))}
				</div>
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
