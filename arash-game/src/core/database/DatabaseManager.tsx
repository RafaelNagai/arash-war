import { get, ref, remove, set, update } from "firebase/database"
import { database } from "../firebase/firebase-config"

interface IDatabaseManager {
    set(path: string, data: object): Promise<void>,
    get<T>(path:string): Promise<T | null>,
    update(path:string, data: Partial<any>): Promise<void>,
    delete(path:string): Promise<void>
}

export const DatabaseManager: IDatabaseManager = {
    set: function (path: string, data: object): Promise<void> {
        const dbref = ref(database, path);
        return set(dbref, data);
    },
    get: async function <T>(path: string): Promise<T | null> {
        const dbref = ref(database, path);
        const snapshot = await get(dbref);
        return snapshot.exists() ? (snapshot.val() as T) : null
    },
    update: function (path: string, data: Partial<any>): Promise<void> {
        const dbref = ref(database, path);
        return update(dbref, data);
    },
    delete: async function (path: string): Promise<void> {
        const dbref = ref(database, path);
        await remove(dbref);
    }
}