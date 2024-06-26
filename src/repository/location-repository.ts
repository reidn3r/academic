import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';
import { State } from "../models/State";
import { City } from '../models/City'
import { CleanString } from './clean-string';

export class LocationRepository{

    public stringRepository = new CleanString();
    public findStateByAcronym(state:string):Promise<State>{
        return new Promise<State>((resolve, reject) => {
            let foundState:State;
            fs.createReadStream(path.join(__dirname, '..', 'assets', 'stream', 'estados.csv'))
                .pipe(csv.parse( { headers: true, delimiter: ',' }))
                .on('data', row => {
                    if(this.stringRepository.removeSpaces(row.SIGLA) === this.stringRepository.removeSpaces(state)){
                        foundState = {
                            state_name:row.NOME,
                            state_acr: this.stringRepository.removeSpaces(row.SIGLA),
                            id: row.COD,
                        }
                        return foundState;
                    }
                })
                .on('end', () => {
                    resolve(foundState);
                })
        });
    }


    public async findCityByName(city:string):Promise<City>{
        let id:number=0;
        return new Promise<City>((resolve, reject) => {
            let foundCity:City;
            fs.createReadStream(path.join(__dirname, '..', 'assets', 'stream', 'municipios.csv'))
                .pipe(csv.parse( { headers: true, delimiter: ';' }))
                .on('data', row => {
                    if(row.city_name == city){
                        foundCity = {
                            city_name:row.city_name,
                            state_acr: row.state_acr,
                            id: id
                        }
                        return foundCity;
                    }
                    id++;
                })
                .on('end', () => {
                    resolve(foundCity);
                })
        });
    }

    public async findAllStates():Promise<string[]>{
        return new Promise<string[]>((resolve, reject) => {
            let data = '';
            fs.createReadStream(path.join(__dirname, '..', 'assets', 'stream', 'estados.json'))
                .on('data', chunk => {
                    data += chunk;
                })
                .on('end', () => {
                    const json = JSON.parse(data);
                    resolve(json);
                })
        })
    }

}