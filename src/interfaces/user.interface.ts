// User
export type User = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
    role: Role
    createdAt: Date;
    updatedAt: Date;
}

export type Role = 'user' | 'admin';

// Auth
export type Register = Pick<User, 'name' | 'email' | 'password'> & { phone: string }

export type ConfirmAccount = Pick<User, 'name' | 'email'> & { token: string }

export type LoginWithCredentials = Pick<User, 'email' | 'password'>

export type ForgotPassword = Pick<User, 'email'> 
export type ForgotPasswordMail = Pick<User, 'name' | 'email'> & { token: string }

export type NewPassword = Pick<User, | 'password'> & { token: string }


// Profile
export type ChangePassword = { currentPass: string; newPass: string; repeatPass: string; }

export type ChangeName = Pick<User, | 'name'>

export type ChangeEmail = {
    email: string;
    password: string;
}

export type ChangePhone = {
    phone: string;
    password: string;
}
// Actions Profile

export type FieldUpdateWithPass = "password" | "email" | "phone";

export interface UpdateUserWithPass {
    id: User["id"];
    password: User["password"],
    field: FieldUpdateWithPass;
    value: string;
    callback: (id: string, value: string, prev?: string | null) => Promise<{user: User | null, message: string, error: boolean}>;
}

export type FieldUpdateWithOutPass = "name" | "image";

export interface UpdateUserWithOutPass {
    id: User["id"];
    field: FieldUpdateWithOutPass;
    value: string;
}