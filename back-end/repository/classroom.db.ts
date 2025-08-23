import { get } from 'http';
import { Classroom } from '../model/classroom';
import database from '../util/database';

const createClassroom = async (classroom: Classroom): Promise<Classroom> => {
    try {
        const classroomPrisma = await database.classroom.create({
            data: {
                name: classroom.getName(),
            },
        });
        return Classroom.from(classroomPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const getClassroomByName = async (name: string): Promise<Classroom | null> => {
    try {
        const classroomPrisma = await database.classroom.findUnique({
            where: { name },
        });
        return classroomPrisma ? Classroom.from(classroomPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createClassroom,
    getClassroomByName,
};
