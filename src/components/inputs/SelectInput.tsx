import { useRef, useState } from "react";
import TextInput from "@/components/inputs/TextInput";
import DropDown from "@/components/DropDown";

type Props = {
  name: string,
  placeholder: string,
  options: { value: string | number, label: string }[],
  value?: string | number,
  displayValue?: string | number,
  errorMsg?: string,
  onChange: (value: string | number) => void,
}

export default function SelectInput({ name, placeholder, options, value, displayValue, errorMsg, onChange }: Props) {
  const [showDropDown, setShowDropDown] = useState(false)

  const selectInputRef = useRef<HTMLDivElement | null>(null)

  const handleSelect = (value: string | number) => {
    if (value) {
      onChange(value)
    }
    setShowDropDown(false)
  }

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  return (
    <div ref={selectInputRef}>
      <TextInput
        name={name}
        placeholder={placeholder}
        value={value}
        displayValue={displayValue}
        readOnly={true}
        errorMsg={errorMsg}
        onClick={toggleDropDown}
      />
      {showDropDown &&
        <DropDown
          options={options}
          isOpen={showDropDown}
          scrollToValue={value}
          minWidht={selectInputRef.current?.clientWidth}
          onClick={handleSelect}
          parentRef={selectInputRef}
        />}
    </div>
  )
}