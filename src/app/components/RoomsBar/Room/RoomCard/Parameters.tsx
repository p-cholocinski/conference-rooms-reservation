import { FaCheck } from "react-icons/fa"
import { ImCross } from "react-icons/im"

type Props = {
  params: Room["params"]
}

export default function Parameters({ params }: Props) {
  return (
    <div>
      <div className="font-bold text-center border-b-2 border-neutral-400">Parametry</div>
      <table className="w-full justify-center">
        <tbody>
          {params.map(param => (
            <tr key={param.param} className="border-b border-neutral-400 text-sm flex last:border-b-2 hover:bg-neutral-600">
              <td className="w-5/6">{param.param}</td>
              <td className="w-1/6 text-center place-items-center place-content-center">
                {typeof param.value === "string"
                  ? param.value
                  : param.value
                    ? <FaCheck className="text-green-400" />
                    : <ImCross className="text-red-400" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
