import { ReadStatesFromFile } from '../../public/utils/read-states-from-file';
import { ReadUniversitiesFromFile } from '../../public/utils/read-universities-from-file';

export const RegisterUserPage = async(req:any, res:any) => {
    const data = req.session.userData;
    if(!data) return res.redirect('/v1/register');

    const [foundStates, foundUniversities] = await Promise.all([
        ReadStatesFromFile(),
        ReadUniversitiesFromFile()
    ])

    return res.render('registerUser', { context: data, foundStates, foundUniversities });
}