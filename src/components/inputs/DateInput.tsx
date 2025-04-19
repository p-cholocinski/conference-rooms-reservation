import { useRef, useState } from "react";
import DatePicker from "@/components/DatePicker";
import TextInput from "@/components/inputs/TextInput";
import { formatDate } from "@/lib/dateTimeFormats";

type Props = {
  name: string,
  placeholder: string,
  date: Date | string,
}

export default function DateInput({ name, placeholder, date }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>(new Date(date).toISOString())
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

  const dateInputRef = useRef<HTMLDivElement | null>(null)

  const handleSelectedDate = (date: string | null) => {
    if (date) setSelectedDate(date)
    setShowDatePicker(false)
  }

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  }

  return (
    <div ref={dateInputRef}>
      <TextInput
        key={name}
        name={name}
        placeholder={placeholder}
        value={selectedDate}
        displayValue={formatDate(selectedDate)}
        readOnly={true}
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