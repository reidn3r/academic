import { ContactsAdapter } from "../../adapters/create-profile-contacts-adapter";
import { prisma } from "../../db/prisma";

export const ProfileData = async(req: any, res: any) => {
    const { userEmail, userWhatsApp, userInstagram } = ContactsAdapter.parse(req.body);

    if(!userEmail) return res.json({message: "Campo faltante: email"});
    try{
        const foundProfile = await prisma.user.findUnique({
            where: {
                email: userEmail
            },
            select: {
                Profile: {
                    select: {
                        id: true
                    }
                }
            }
        })
    
        let insert = [];
        if (userEmail && foundProfile) {
            insert.push({contact_content:userEmail, contactTypeId:1, profileId: foundProfile.Profile[0].id});
        }
        if (userWhatsApp && foundProfile) {
            insert.push({ contact_content: userWhatsApp, contactTypeId: 3, profileId: foundProfile.Profile[0].id});
        }
        if (userInstagram && foundProfile) {
            insert.push({ contact_content: userInstagram, contactTypeId: 2, profileId: foundProfile.Profile[0].id});
        }
    
        await prisma.profileContacts.createMany({
            data: insert,
            skipDuplicates: true
        })
    
        return res.status(301).redirect(`/v1/login`);
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ message: "Error registering profile contacts" });
    }
}
