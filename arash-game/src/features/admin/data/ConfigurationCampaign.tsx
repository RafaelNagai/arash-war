import { DocumentData } from "firebase/firestore";

export class ConfigurationCampaign {
    constructor(public id: string, public name: string, public isOpenedToEnter: boolean, public accessCode: string) {}
    
    static fromFirebase(data: DocumentData): ConfigurationCampaign {
        return new ConfigurationCampaign(
            data.id,
            data.name,
            data.isOpenedToEnter,
            data.accessCode,
        );
    }

    // Convert the Team instance to Firestore document data
    toFirestore(): DocumentData {
        return {
            name: this.name,
            isOpenedToEnter: this.isOpenedToEnter,
            accessCode: this.accessCode,
        };
    }

    copyWith(data: Partial<ConfigurationCampaign>): ConfigurationCampaign {
        return new ConfigurationCampaign(
            this.id,
            data.name ?? this.name,
            data.isOpenedToEnter ?? this.isOpenedToEnter,
            data.accessCode ?? this.accessCode,
        )
    }
}