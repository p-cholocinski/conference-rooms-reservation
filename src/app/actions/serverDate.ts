'use server'

export async function getServerDate() {
  const serverDate = new Date()
  return serverDate
}