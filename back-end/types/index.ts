type Role = 'admin' | 'student' | 'teacher';

type UserInput = {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
};

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};

type ClassroomInput = {
    id?: number;
    name: string;
};

export { Role, UserInput, AuthenticationResponse, ClassroomInput };
