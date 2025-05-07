import { useRef, useState } from "react";
import TextInput from "@/components/inputs/TextInput";
import DropDown from "@/components/DropDown";
import { getDateTimeList, getDayStart, getNextDayStart, getRoundedToQuarterTime } from "@/lib/calendar";
import { formatTime } from "@/lib/dateTimeFormats";

type Props = {
  name: string,
  placeholder: string,
  time?: Date,
  timeMin?: Date,
  timeMax?: Date,
  errorMsg?: string,
  onChange: (time: Date) => void,
}

export default function TimeInput({ name, placeholder, time, timeMin, timeMax, errorMsg, onChange }: Props) {
  const [showDropDown, setShowDropDown] = useState<boolean>(false)

  const timeInputRef = useRef<HTMLDivElement | null>(null)

  const dateTimeList = getDateTimeList(
    timeMin
      ? getRoundedToQuarterTime(new Date(timeMin)).toISOString()
      : getDayStart(new Date()).toISOString(),
    timeMax
      ? getRoundedToQuarterTime(new Date(timeMax)).toISOString()
      : getNextDayStart(new Date()).toISOString(),
  )

  const handleSelectedTime = (time: string | number) => {
    if (time) {
      onChange(new Date(time))
    }
    setShowDropDown(false)
  }

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  return (
    <div ref={timeInputRef}>
      <TextInput
        name={name}
        placeholder={placeholder}
        value={time?.toISOString()}
        displayValue={formatTime(time)}
        readOnly={true}
        errorMsg={errorMsg}
        onClick={toggleDropDown}
      />
      {showDropDown &&
        <DropDown
          options={dateTimeList}
          isOpen={showDropDown}
          onClick={handleSelectedTime}
          scrollToValue={time?.toISOString()}
          minWidht={timeInputRef.current?.clientWidth}
          parentRef={timeInputRef}
        />}
    </div>
  )
}