import { fireStore } from "../firebase/firebase-config";
import { addDoc, collection, deleteDoc, doc, DocumentData, getDoc, getDocs, updateDoc } from "firebase/firestore";

interface IDatabaseManager<T extends DatabaseDocumentData> {
    collection: string,
    fetch(id: string, convertFirebaseToData: (data: object) => T): Promise<T | null>,
    fetchAll(convertFirebaseToData: (data: object) => T): Promise<T[]>,
    insert(data: T): Promise<string>,
    delete(id: string): Promise<void>,
    update(id: string, data: T): Promise<void>, 
}

export class DatabaseManager<T extends DatabaseDocumentData> implements IDatabaseManager<T> {
    constructor(public collection: string) {}

    async fetchAll(convertFirebaseToData: (data: object) => T): Promise<T[]> {
        const documents = await getDocs(collection(fireStore, this.collection));
        return documents.docs.map<T>((document) => convertFirebaseToData({...document.data(), id: document.id}));
    }

    async fetch(id: string, convertFirebaseToData: (data: object) => T): Promise<T | null> {
        const documentReference = doc(fireStore, this.collection, id);
        const document = await getDoc(documentReference);
        
        return document.exists() ? convertFirebaseToData({...document.data(), id: document.id}) as T : null;
    }
    async insert(data: T): Promise<string> {
        const docRef = await addDoc(collection(fireStore, this.collection), data.toFirestore());
        return docRef.id;
    }
    async delete(id: string): Promise<void> {
        const documentReference = doc(fireStore, this.collection, id);
        await deleteDoc(documentReference);
    }
    async update(id: string, data: T): Promise<void> {
        const documentReference = doc(fireStore, this.collection, id);
        await updateDoc(documentReference, data.toFirestore());
    }
}

export interface DatabaseDocumentData extends DocumentData {
    toFirestore(): DocumentData;
}