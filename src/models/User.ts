export interface User {
    id: number,
    university_id :number,
    city_id: number,
    state_id: number,
    email: string,
    password: string,
    name: string,
    cpf: string,
    user_sex: string ,//enum
    user_course: string,
    birthday: Date,
    createdAt: Date,
    userActivityId: number,
    registerId: number,
}