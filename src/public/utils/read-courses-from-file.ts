import fs from 'fs';
import path from 'path';

interface Course { 
    id: string,
    NOME_IES: string,
    NOME_CURSO: string,
    CODIGO_CURSO: string,
}

export async function ReadCoursesFromFile(university:string){
    return new Promise<string[]>((resolve, reject) => {
        let data = '';
        let uniqueCourses = new Set<string>();
        fs.createReadStream(path.join(__dirname, '..','..','assets', 'stream','univ-cursos.json'))
            .on('data', chunk => {
                data += chunk;
            })
            .on('end', () => {
                const json = JSON.parse(data);
                json.map((u:Course) => {
                    if(u.NOME_IES.toUpperCase() == university.toUpperCase()){
                        uniqueCourses.add(u.NOME_CURSO);
                    }
                })
                resolve(Array.from(uniqueCourses).sort());
            })
    })
}
