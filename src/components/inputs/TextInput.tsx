import { HTMLInputTypeAttribute } from "react"
import InputError from "../InputError"

type Props = {
  name: string,
  placeholder: string,
  type?: HTMLInputTypeAttribute,
  value?: string | number,
  displayValue?: string | number,
  readOnly?: boolean,
  errorMsg?: string,
  onChange?: (value: string) => void,
  onClick?: () => void,
}

export default function TextInput({ name, placeholder, type = "text", value, displayValue, readOnly, errorMsg, onChange, onClick }: Props) {

  const displayName = name + (displayValue ? "-displayOnly" : "")

  const inputValue = displayValue ? displayValue : value ? value : readOnly ? "" : undefined

  return (
    <div
      className="relative text-sm"
    >
      <input
        className={`block px-2 pt-3 pb-2 border border-neutral-600 rounded-sm outline-none bg-transparent w-full focus:border-neutral-400 peer ${readOnly && "cursor-pointer"} ${errorMsg ? "border-red-900" : ""}`}
        placeholder=" "
        type={type}
        autoComplete="off"
        id={displayName}
        name={displayName}
        value={readOnly ? inputValue : undefined}
        readOnly={readOnly}
        defaultValue={!readOnly ? inputValue : undefined}
        onChange={(!readOnly && onChange) ? (e) => onChange(e.target.value) : undefined}
        onClick={onClick}
      />
      <label
        htmlFor={displayName}
        className="absolute top-0 left-2 -translate-y-1/2 scale-75 px-1 text-neutral-400 bg-neutral-800 transform duration-200 origin-[0] pointer-events-none peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1/2 peer-focus:scale-75"
      >
        {placeholder}
      </label>
      <InputError
        errorMsg={errorMsg}
      />
      {displayValue && (
        <input
          type="hidden"
          name={name}
          value={value}
          readOnly={true}
        />
      )}
    </div>
  )
}