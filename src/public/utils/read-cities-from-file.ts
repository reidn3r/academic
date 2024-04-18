import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';
import { CleanString } from '../../repository/clean-string';

export async function ReadCitiesFromFile(state:string){
    state = new CleanString().removeSpaces(state);

    type City = {
        city_name: string,
        state_acr: string
    }

    return new Promise<City[]>((resolve, reject) => {
        let foundCities:City[] = [];
        fs.createReadStream(path.join(__dirname, '..', '..', 'assets', 'stream', 'municipios.csv'))
        .pipe(csv.parse( { headers: true, delimiter: ';' }))
        .on('data', row => {
                if(row.state_acr == state){
                    const city:City = {
                        city_name:row.city_name,
                        state_acr: row.state_acr
                    }
                    foundCities.push(city)
                } 
            })
            .on('end', () => {
                resolve(foundCities);
            })
    });
}