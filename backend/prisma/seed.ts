import "dotenv/config"
import { PrismaClient, Role } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import bcrypt from "bcryptjs"

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!
})

const prisma = new PrismaClient({
  adapter
})

async function main() {

  const password = await bcrypt.hash("123456", 10)

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@email.com",
      password,
      role: Role.admin
    }
  })

  await prisma.category.createMany({
    data: [
      {
        name: "Food",
        description: "Food expenses",
        icon: "🍔",
        color: "#FF6384",
        userId: admin.id
      },
      {
        name: "Transport",
        description: "Transport expenses",
        icon: "🚗",
        color: "#36A2EB",
        userId: admin.id
      },
      {
        name: "Salary",
        description: "Income from salary",
        icon: "💰",
        color: "#4BC0C0",
        userId: admin.id
      }
    ]
  })

  console.log("🌱 Database seeded")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())