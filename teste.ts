// import csvToJson from "convert-csv-to-json";
// let parse = csvToJson.fieldDelimiter(',').generateJsonFileFromCsv('./src/assets/stream/universidade_curso.csv', './out.json');


// import fs from 'fs';
// import path from 'path';

// interface Course { 
//     id: string,
//     NOME_IES: string,
//     NOME_CURSO: string,
//     CODIGO_CURSO: string,
// }

// export async function ReadCoursesFromFile(university:string){
//     return new Promise<Course[]>((resolve, reject) => {
//         let data = '';
//         fs.createReadStream(path.join(__dirname, 'out.json'))
//             .on('data', chunk => {
//                 data += chunk;
//             })
//             .on('end', () => {
//                 const json = JSON.parse(data);
//                 const filter = json.filter((u:Course) => u.NOME_IES == university);
//                 resolve(filter);
//             })
//     })
// }

import { UniversityRepository } from "./src/repository/university-repository";
import { ReadCoursesFromFile } from "./src/public/utils/read-courses-from-file";

const x = async() => {
    const uni = new UniversityRepository();
    const data = await ReadCoursesFromFile("Universidade Estadual de Maringá");
    // const data = await uni.findUniversityByName("Universidade Estadual de Maringá");
    // const data = await uni.findUniversityById(3544);
    // const data = await uni.findAllUniversities();
    // const data = await uni.findAllCourses();
    console.log(data);
    // const data:any = await ReadCoursesFromFile("UNIVERSIDADE ESTADUAL DE MARINGÁ");
};

x();