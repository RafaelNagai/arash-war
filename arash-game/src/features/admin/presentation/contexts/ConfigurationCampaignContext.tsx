import React, { createContext, useContext, useEffect, useState } from "react";
import { ConfigurationCampaign } from "../../data/ConfigurationCampaign";
import { DatabaseManager } from "../../../../core/database/DatabaseManager";

interface IConfigurationMatch {
    onChangeCampaignName : (name: string) => Promise<void>,
    campaignName: string,
    setOpenToEnter: (isOpened: boolean) => Promise<void>,
    isOpenedToEnter: boolean,
    generateAccessCode: () => Promise<string>,
    accessCode: string,
}

export const ConfigurationMatchContext = createContext<IConfigurationMatch | undefined>(undefined);

export const useConfigurationCampaign = () => {
    const config = useContext(ConfigurationMatchContext);
    if(!config) {
        throw new Error("ConfigurationMatchContext not loaded");
    }
    return config;
}

type ConfigurationMatchContextProviderProps = {
    children: React.ReactNode
}

export const ConfigurationMatchProvider : React.FC<ConfigurationMatchContextProviderProps> = ({ children }) => {
    const [ campaignName, setCampaignName ] = useState<string>("");
    const [ isOpenedToEnter, setIsOpenedToEnter ] = useState<boolean>(false);
    const [ accessCode, setAccessCode ] = useState<string>("");
    const [ config, setConfig ] = useState<ConfigurationCampaign | null>(null);
    const databaseManager = new DatabaseManager<ConfigurationCampaign>("campaign");

    useEffect(() => {
        const fetchCampaign = async () => {
            const fetchConfig = await databaseManager.fetch("1", ConfigurationCampaign.fromFirebase);
            if(fetchConfig){
                setConfig(fetchConfig);
                setCampaignName(fetchConfig.name);
                setIsOpenedToEnter(fetchConfig.isOpenedToEnter);
                setAccessCode(fetchConfig.accessCode);
            }
        }
        fetchCampaign();
    }, []);

    const onChangeCampaignName = async (name: string) : Promise<void> => {
        setCampaignName(name);
        const newConfig = config!.copyWith({ name });
        setConfig(newConfig);
        databaseManager.update("1", newConfig);
    }

    const setOpenToEnter = async (isOpened: boolean) : Promise<void> => {
        setIsOpenedToEnter(isOpened);
        const newConfig = config!.copyWith({isOpenedToEnter: isOpened});
        setConfig(newConfig);
        databaseManager.update("1", newConfig);
    }

    const generateAccessCode = async () : Promise<string> => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';

        const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
        const randomDigit = () => digits[Math.floor(Math.random() * digits.length)];
        const newAccessCode = `${randomLetter()}${randomLetter()}${randomDigit()}${randomDigit()}${randomLetter()}`;

        setAccessCode(newAccessCode);
        const newConfig = config!.copyWith({accessCode: newAccessCode})
        setConfig(newConfig);
        databaseManager.update("1", newConfig);
        return newAccessCode;
    }

    return <ConfigurationMatchContext.Provider 
        value={{ onChangeCampaignName, setOpenToEnter, generateAccessCode, campaignName, isOpenedToEnter, accessCode }}>
            {children}
    </ConfigurationMatchContext.Provider>
}