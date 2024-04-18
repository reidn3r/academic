import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';

export async function ReadUniversitiesFromFile(){
    let foundUniversities:string[] = [];
    return new Promise<string[]>((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'assets', 'stream', 'unique-univ.csv'))
            .pipe(csv.parse( { headers: true, delimiter: ',' }))
            .on('data', row => {
                foundUniversities.push(row.university);
            })
            .on('end', () => {
                resolve(foundUniversities);
            })
    });
}