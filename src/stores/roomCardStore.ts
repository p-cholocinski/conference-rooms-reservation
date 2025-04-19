import { RoomParameter, RoomPicture, RoomToRoomParameter, Room as RoomType } from '@prisma/client'
import { create } from 'zustand'

type Room = ({
  pictures: RoomPicture[];
  parameters: ({
    parameter: RoomParameter;
  } & RoomToRoomParameter)[];
} & RoomType)

interface RoomCardState {
  visible: boolean,
  setVisible: (visible: boolean) => void,
  room: Room | null,
  setRoom: (room: Room | null) => void,
}

const useRoomCardStore = create<RoomCardState>((set) => ({
  visible: false,
  setVisible: (visible) => set({ visible: visible }),
  room: null,
  setRoom: (room) => set({ room: room }),
}))

export default useRoomCardStore