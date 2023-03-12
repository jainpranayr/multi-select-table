export const CloseIcon = props => (
	<svg
		fill="currentColor"
		width="800px"
		height="800px"
		viewBox="0 0 24 24"
		id="cross"
		data-name="Line Color"
		xmlns="http://www.w3.org/2000/svg"
		className="icon line-color"
		{...props}>
		<line
			id="primary"
			x1={19}
			y1={19}
			x2={5}
			y2={5}
			style={{
				fill: 'none',
				stroke: 'currentColor',
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeWidth: 2,
			}}
		/>
		<line
			id="primary-2"
			data-name="primary"
			x1={19}
			y1={5}
			x2={5}
			y2={19}
			style={{
				fill: 'none',
				stroke: 'currentColor',
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeWidth: 2,
			}}
		/>
	</svg>
)
