import bcrypt from 'bcryptjs';

export const comparePass = (pass: string, hash: string | null) => {
    // Check if the user has password
        if(!hash) {
            return { error: true, message: "You need a password for that"}
        }
        // Compare Passwords
        const verifyPass = bcrypt.compareSync(pass, hash);
        if(!verifyPass) {
            return { error: true, message: "Incorrect password"}
        }
        return { error: false, message: ""}
}