type Props = {
  errorMsg?: string,
}

export default function InputError({ errorMsg }: Props) {
  return (
    <p className="left-2 mt-1 z-10 select-none bg-neutral-800 text-xs px-1 text-red-600">
      {errorMsg}
    </p>
  )
}