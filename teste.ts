import { prisma } from "./src/db/prisma";

const main = async() => {
    const data = await prisma.topicsInterest.findMany({
        where:{
            OR: [
                {topic: "Deep Learning"},
                {topic: "Abc "}
            ]
        }
    });
    
    console.log(data);
}


main();