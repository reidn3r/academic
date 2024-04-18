import csvToJson from "convert-csv-to-json";
import path from "path";

export class CreateJSON {
    public base_dir:string = path.join(__dirname, '..', '..', 'assets', 'stream');

    public async execute(){
        await Promise.all([
            this.createUniversidadeCursoJSON(),
            this.createEstadosJSON(),
            this.createCursosUnicos(),
        ])
    }

    public async createUniversidadeCursoJSON():Promise<void>{
        const in_dir:string = path.join(this.base_dir, 'universidade_curso.csv')
        const out_dir:string = path.join(this.base_dir, 'univ-cursos.json')
        csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(in_dir, out_dir);
    }
    
    
    public async createEstadosJSON():Promise<void>{
        const in_dir:string = path.join(this.base_dir, 'estados.csv')
        const out_dir:string = path.join(this.base_dir, 'estados.json')
        csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(in_dir, out_dir);
    }
    
    public async createCursosUnicos():Promise<void>{
        const in_dir:string = path.join(this.base_dir, 'unique_cursos.csv')
        const out_dir:string = path.join(this.base_dir, 'unique-cursos.json')
        csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(in_dir, out_dir);
    }

}