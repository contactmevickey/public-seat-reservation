import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.seat.createMany({
    data: [
      { seatNumber: 'A1' },
      { seatNumber: 'A2' },
      { seatNumber: 'A3' },
      { seatNumber: 'B1' },
      { seatNumber: 'B2' },
      { seatNumber: 'B3' },
      { seatNumber: 'C1' },
      { seatNumber: 'C2' },
      { seatNumber: 'C3' }
    ],
    skipDuplicates: true
  });
}

main();
