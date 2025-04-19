import { saltAndHashPassword } from "@/utils/auth/saltAndHashPassword";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

const testUser: Prisma.UserCreateInput[] = [
  {
    email: 'test@test.pl',
    name: 'Test User',
    password: '',
    reservations: {
      create: [
        {
          description: 'Test reservation',
          startDate: new Date(new Date().setHours(8, 0, 0, 0)),
          endDate: new Date(new Date().setHours(10, 0, 0, 0)),
          room: {
            create: {
              name: 'Sala konferencyjna',
              description: 'Duża sala konferencyjna z projektorem',
              openFrom: 7,
              openTo: 15,
              parameters: {
                create: [
                  { parameter: { create: { name: "Projektor" } }, value: "True" },
                  { parameter: { create: { name: "Tablica" } }, value: "True" },
                  { parameter: { create: { name: "Klimatyzacja" } }, value: "False" },
                ]
              },
              pictures: {
                create: [
                  { url: '/images/room-1.jpg', main: true },
                  { url: '/images/room-1-a.jpg', main: false },
                ]
              },
              location: {
                create: { name: 'Budynek dolny' }
              }
            }
          },
          category: {
            create: { name: 'Spotkanie' },
          },
        }
      ]
    }
  }
]

async function main() {
  for (const user of testUser) {
    await prisma.user.create({ data: { ...user, password: await saltAndHashPassword('password') } })
  }
}

main()