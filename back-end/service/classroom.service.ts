import { ClassroomInput } from '../types';
import { Classroom } from '../model/classroom';
import classroomDb from '../repository/classroom.db';
import { UnauthorizedError } from 'express-jwt';

const createClassroom = async ({ name }: ClassroomInput): Promise<Classroom> => {
    const existingClassroom = await classroomDb.getClassroomByName(name);

    if (existingClassroom) {
        throw new Error('Classroom with name ${name} already exists.');
    }

    const classroom = new Classroom({ name });

    return await classroomDb.createClassroom(classroom);
};

// const createClassroom = async ({
//     name,
//     role,
// }: ClassroomInput & { role: string }): Promise<Classroom> => {
//     if (role !== 'admin') {
//         throw new UnauthorizedError('credentials_required', {
//             message: 'You are not authorized to access this resource.',
//         });
//     }

//     const existingClassroom = await classroomDb.getClassroomByName(name);

//     if (existingClassroom) {
//         throw new Error('Classroom with name ${name} already exists.');
//     }

//     const classroom = new Classroom({ name });

//     return await classroomDb.createClassroom(classroom);
// };

export default {
    createClassroom,
};
