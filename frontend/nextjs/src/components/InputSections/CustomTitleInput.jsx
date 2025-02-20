export default function CustomTitleInput({
	customTitleValue,
	sectionKey,
	handleCustomTitleOnChange,
	inputRef,
}) {
	return (
		<input
			ref={inputRef}
			value={customTitleValue}
			name={sectionKey}
			type="text"
			onChange={handleCustomTitleOnChange}
			className="border rounded p-1"
		/>
	)
}
