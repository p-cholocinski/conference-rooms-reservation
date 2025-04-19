import { RoomParameter, RoomToRoomParameter } from "@prisma/client"
import { FaCheck } from "react-icons/fa"
import { ImCross } from "react-icons/im"

type Props = {
  parameters: ({
    parameter: RoomParameter;
  } & RoomToRoomParameter)[]
}

export default function Parameters({ parameters }: Props) {
  return (
    <div>
      <div className="font-bold text-center border-b-2 border-neutral-400">Parametry</div>
      <table className="w-full justify-center">
        <tbody>
          {parameters.map(parameter => (
            <tr key={parameter.parameterId} className="border-b border-neutral-400 text-sm flex last:border-b-2 hover:bg-neutral-600">
              <td className="w-5/6">{parameter.parameter.name}</td>
              <td className="w-1/6 text-center place-items-center place-content-center">
                {parameter.value.toLowerCase() === "true"
                  ? <FaCheck className="text-green-400" />
                  : parameter.value.toLowerCase() === "false"
                    ? <ImCross className="text-red-400" />
                    : parameter.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
