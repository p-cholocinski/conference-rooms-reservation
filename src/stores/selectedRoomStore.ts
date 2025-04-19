import { create } from 'zustand'

interface SelectedRoomState {
  selectedRoom: number,
  setSelectedRoom: (room: number) => void,
}

const useSelectedRoomStore = create<SelectedRoomState>((set) => ({
  selectedRoom: 1,
  setSelectedRoom: (room) => set({ selectedRoom: room }),
}))

export default useSelectedRoomStore