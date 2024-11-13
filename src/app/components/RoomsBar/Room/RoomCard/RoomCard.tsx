import Slider from "./Slider"
import Description from "./Description"
import Parameters from "./Parameters"

type Props = {
  visible: boolean,
  room: Room,
}

export default function RoomCard({ visible, room }: Props) {
  const { name, description, pictures, params } = room

  return (
    <div
      className={`${visible ? 'absolute ' : 'hidden '}top-4 w-[36rem] left-[102%] rounded-lg shadow-[0px_0px_2px_1px] shadow-neutral-200 cursor-auto`}>
      <div className="bg-neutral-600 px-4 py-2 font-bold text-2xl rounded-t-lg">
        {name}
      </div>
      <div className="bg-neutral-500 px-2 py-4 flex flex-col gap-4 rounded-b-lg">
        <div className="flex gap-2">
          <Slider name={name} pictures={pictures} />
          <Description description={description} />
        </div>
        <Parameters params={params} />
      </div>
    </div>
  )
}
