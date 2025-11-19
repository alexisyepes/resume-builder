interface CustomTitleInputProps {
	customTitleValue: string
	sectionKey: string
	handleCustomTitleOnChange: (key: string, value: string) => void
	inputRef: React.RefObject<HTMLInputElement>
}

export default function CustomTitleInput({
	customTitleValue,
	sectionKey,
	handleCustomTitleOnChange,
	inputRef,
}: CustomTitleInputProps) {
	return (
		<input
			ref={inputRef}
			value={customTitleValue}
			name={sectionKey}
			type="text"
			onChange={(e) => handleCustomTitleOnChange(sectionKey, e.target.value)}
			className="border rounded p-1"
		/>
	)
}
