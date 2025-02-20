import { authConfig } from "./auth";
import { getServerSession } from "next-auth";

export default async function getUserSession() {
    try {
        const session = await getServerSession(authConfig);
        return session;
    } catch (error) {
        return null;
    }
}