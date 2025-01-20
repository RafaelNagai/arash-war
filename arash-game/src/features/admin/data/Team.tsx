import { DocumentData } from "firebase/firestore";
import { DatabaseDocumentData } from "../../../core/database/DatabaseManager";

export class Team implements DatabaseDocumentData {
    constructor(public id: string, public name: string, public sequenceNumber: number) {}
    
    static fromFirebase(data: DocumentData): Team {
        return new Team(
            data.id,
            data.name,
            data.sequenceNumber
        );
    }

    // Convert the Team instance to Firestore document data
    toFirestore(): DocumentData {
        return {
            name: this.name,
            sequenceNumber: this.sequenceNumber,
        };
    }
}