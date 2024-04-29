import { prisma } from '../src/db/prisma';

async function seed(){
    const contactType = await prisma.contactType.createMany({
        data: [
            { type: "email", id: 1 },
            { type: "instagram", id: 2 },
            { type: "whatsapp", id: 3 },
        ],
        skipDuplicates: true
    })
}


seed();