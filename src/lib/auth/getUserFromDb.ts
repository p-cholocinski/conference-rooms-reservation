import prisma from "@/lib/prisma";

export default async function getUserFromDb(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  })
}