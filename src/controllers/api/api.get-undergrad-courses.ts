import { ReadCoursesFromFile } from "../../public/utils/read-courses-from-file";

export const FetchCourses = async(req:any, res:any) => {
    const { university } = req.body;
    const courses = await ReadCoursesFromFile(university);
    return res.status(200).json({ courses });
}
