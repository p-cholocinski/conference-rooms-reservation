import { useRef, useState } from "react";
import DatePicker from "@/components/DatePicker";
import TextInput from "@/components/inputs/TextInput";
import { formatDate } from "@/lib/dateTimeFormats";

type Props = {
  name: string,
  placeholder: string,
  date: Date,
  errorMsg?: string,
  onChange?: (date: Date) => void,
}

export default function DateInput({ name, placeholder, date, errorMsg, onChange }: Props) {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

  const dateInputRef = useRef<HTMLDivElement | null>(null)

  const selectedDate = new Date(date)

  const handleSelectedDate = (date: Date | null) => {
    if (date) {
      if (onChange) onChange(date)
    }
    setShowDatePicker(false)
  }

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  }

  return (
    <div ref={dateInputRef}>
      <TextInput
        key={"date-input-" + name}
        name={name}
        placeholder={placeholder}
        value={selectedDate.toISOString()}
        displayValue={formatDate(selectedDate)}
        readOnly={true}
        errorMsg={errorMsg}
        onClick={toggleDatePicker}
      />
      {showDatePicker &&
        <DatePicker
          selectedDate={selectedDate}
          handleSelectedDate={handleSelectedDate}
          parentRef={dateInputRef}
        />}
    </div>
  )
}