import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';

export async function ReadStatesFromFile(){
    type State = {
        state_name: string,
        state_acr: string
    }

    return new Promise<State[]>((resolve, reject) => {
        let foundStates:State[] = [];
        fs.createReadStream(path.join(__dirname, '..', '..', 'assets', 'stream', 'estados.csv'))
            .pipe(csv.parse( { headers: true, delimiter: ',' }))
            .on('data', row => {
                const state:State = {
                    state_name:row.NOME,
                    state_acr: row.SIGLA
                }
                foundStates.push(state)
            })
            .on('end', () => {
                resolve(foundStates);
            })
    });
}