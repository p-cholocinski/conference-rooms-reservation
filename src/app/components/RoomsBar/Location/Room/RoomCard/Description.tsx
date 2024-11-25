type Props = {
  description: Room["description"],
}

export default function Description({ description }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="font-bold">Opis</div>
        <div className="text-sm">
          {description}
        </div>
      </div>
    </div>
  )
}