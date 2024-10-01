
interface Link {
    label: string;
    url: string;
}
interface NavAuthLinks {
    [key: string]: Links
}
interface Links {
    [key: string]: Link
}

const links : Links = {
    login: { label: "Already have an account? Sign In", url: "/auth/login" },
    register: { label: "Don't have an account? Click here to create", url: "/auth/register" },
    forgotPassword: { label: "I forgot my password", url: "/auth/forgot-password" },
}

export const navAuthLinks : NavAuthLinks = {
    login: {
        firstLink: links["register"],
        secondLink: links["forgotPassword"]
    },
    register: {
        firstLink: links["login"],
        secondLink: links["forgotPassword"]
    },
    forgotPassword: { 
        firstLink: links["login"],
        secondLink: links["register"]
    }
}