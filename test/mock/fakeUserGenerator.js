const RegisterModel = require('../../src/model/Register');
const UserModel = require('../../src/model/User');
const ImageModel = require('../../src/model/Profile_Image_Info');
const ProfileModel = require('../../src/model/Profile');
const casual = require('casual');
const dateFormat = require('../../src/public/utils/dateFormat');
const fs = require('fs');
const path = require('path');


cidade = [4121, 3830, 4006, 67, 3243];
estado = [41, 35, 41, 12, 33];
s = ["M", "F"];
cursos = ["ciencia da computacao", "zootecnica", "engenharia de alimentos", "engenharia elétrica", "engenharia civil", "comunicacao e multimeios", "direito", "arquitetura", "medicina", "matematica", "quimica", "ciencias biologicas"];

const mockData = async(qty) => {
    for(let j=0; j<qty; j++){

        const randomUnivId = Math.floor((Math.random() * 10000) % 1764);
        const randomUserActivityId = Math.floor((Math.random() * 10 )) % 4;
        const randomUserSex = Math.floor(Math.random() * 10) % 2;
        const randomUserCourse = Math.floor((Math.random() * 100) % cursos.length);
        const randomPlace =  Math.floor((Math.random() * 10) % cidade.length);

        let newRegister = await RegisterModel.create({ id_register_type:1 });

        let newUser = await UserModel.create({
            register_id: newRegister.id,
            university_id: 1,
            user_activity_id: 1,
            name: casual.full_name,
            email: casual.email,
            password: "$2b$10$GNBObbA1k6eStmRbzoJRDelvtqYjJDRyu.Xz0yiTzqXte1wci3eFG",
            city_id: cidade[randomPlace],
            state_id: estado[randomPlace],
            cpf: '75456503018',
            user_sex: s[randomUserSex],
            created_at: dateFormat(new Date()),
            birthday: dateFormat(new Date()),
            user_grade_id: randomUserSex,
            user_course: cursos[randomUserCourse]
        });

        let blob = fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'public', 'images', 'default_user.png'));
        let fileMimetype = 'Image/png';

        let newImage = await ImageModel.create({
            image_data: blob, //blob do padrão
            image_content_type: fileMimetype,
            created_at: dateFormat(new Date())
        });


        let newProfile = await ProfileModel.create({
            register_id: newUser.id,
            name: newUser.name,
            contact_email: newUser.email,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed rhoncus dolor. Suspendisse ac ligula.",
            created_at: dateFormat(new Date()),
            updated_at: dateFormat(new Date()),
            image_id: newImage.id
        });

        newImage.profile_id = newProfile.id;
        console.log(`${j+1} ok.\n`);
    }
}

mockData(150);