export default function getRoomsByLocation(rooms: Room[], locationId: string): Room[] {
  const outRooms: Room[] = rooms.filter((room) => (
    room.location === locationId
  ))

  return outRooms
}
