import { ReadCitiesFromFile } from "../../public/utils/read-cities-from-file";

export const FetchCities = async(req:any, res:any) => {
    const { state } = req.body;    
    
    const data = await ReadCitiesFromFile(state);

    return res.status(200).json({ data });
}
