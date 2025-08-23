import { Classroom as ClassroomPrisma } from '@prisma/client';

export class Classroom {
    readonly id?: number;
    readonly name: string;

    constructor(classroom: { id?: number; name: string }) {
        this.id = classroom.id;
        this.name = classroom.name;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    static from({ id, name }: ClassroomPrisma) {
        return new Classroom({ id, name });
    }
}
