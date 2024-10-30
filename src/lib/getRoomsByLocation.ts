export default function getRoomsByLocation(rooms: room[], locationId: string): room[] {
  const outRooms: room[] = rooms.filter((room) => (
    room.location === locationId
  ))

  return outRooms
}
