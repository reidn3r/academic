import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';
import { University } from "../models/University";

interface Course { 
    NOME_CURSO: string,
}


export class UniversityRepository{

    public basedir:string = (path.join(__dirname, '..', 'assets', 'stream'));

    public async findUniversityByName(university:string):Promise<University>{
        let foundUniversity:University;
        return new Promise<University>((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, '..', 'assets', 'stream', 'unique-univ.csv'))
                .pipe(csv.parse( { headers: true, delimiter: ',' }))
                .on('data', row => {
                    if(row.university.toUpperCase() === university.toUpperCase()){
                        foundUniversity = {
                            id: row.id,
                            name: university,
                        }
                        return foundUniversity;
                    }
                })
                .on('end', () => {
                    resolve(foundUniversity);
                })
        })
    }

    public async findUniversityById(id:number):Promise<University>{
        let foundUniversity:University;
        return new Promise<University>((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, '..', 'assets', 'stream', 'unique-univ.csv'))
                .pipe(csv.parse( { headers: true, delimiter: ',' }))
                .on('data', row => {
                    if(Number(row.id) === id){
                        foundUniversity = {
                            id: row.id,
                            name: row.university,
                        }
                        return foundUniversity;
                    }
                })
                .on('end', () => {
                    resolve(foundUniversity);
                })
            })
        }
    
    public async findAllUniversities():Promise<string[]>{
        let foundUniversities:string[] = [];
        return new Promise<string[]>((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, '..', 'assets', 'stream', 'unique-univ.csv'))
                .pipe(csv.parse( { headers: true, delimiter: ',' }))
                .on('data', row => {
                    foundUniversities.push(row.university);
                })
                .on('end', () => {
                    resolve(foundUniversities);
                })
        });
    }   

    public async findAllCourses():Promise<Course[]>{
        return new Promise<Course[]>((resolve, reject) => {
            let data = '';
            fs.createReadStream(path.join(__dirname, '..', 'assets', 'stream', 'unique-cursos.json'))
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