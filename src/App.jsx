import { dataArray } from './data'

function App() {
	return (
		<div className="container mx-auto my-8 max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
			<h1 className="font-sans font-semibold text-gray-600 sm:text-xl md:text-4xl">
				Customer Details
			</h1>

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
						{dataArray.map(row => (
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
