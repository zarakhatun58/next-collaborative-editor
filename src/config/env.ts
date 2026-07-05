function required(name: string) {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const env = {
    DATABASE_URL: required("DATABASE_URL"),
    JWT_SECRET: required("JWT_SECRET"),
    GEMINI_API_KEY: required("GEMINI_API_KEY"),
    NEXT_PUBLIC_SOCKET_URL: required(
        "NEXT_PUBLIC_SOCKET_URL"
    ),
};