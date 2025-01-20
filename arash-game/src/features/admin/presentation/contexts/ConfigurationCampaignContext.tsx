import React, { createContext, useContext, useEffect, useState } from "react";
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

export const useConfigurationMatch = () => {
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
    const path = "/config";

    useEffect(() => {
        const fetchCampaign = async () => {
            setCampaignName(await DatabaseManager.get<string>(`${path}/name`) ?? "");
            setIsOpenedToEnter(await DatabaseManager.get<boolean>(`${path}/isOpenedToEnter`) ?? false);
            setAccessCode(await DatabaseManager.get<string>(`${path}/accessCode`) ?? "");
        }
        fetchCampaign();
    }, []);

    const onChangeCampaignName = async (name: string) : Promise<void> => {
        setCampaignName(name);
        DatabaseManager.update(path, { name: name });
    }

    const setOpenToEnter = async (isOpened: boolean) : Promise<void> => {
        setIsOpenedToEnter(isOpened);
        DatabaseManager.update(path, { isOpenedToEnter: isOpened });
    }

    const generateAccessCode = async () : Promise<string> => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';

        const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
        const randomDigit = () => digits[Math.floor(Math.random() * digits.length)];
        const newAccessCode = `${randomLetter()}${randomLetter()}${randomDigit()}${randomDigit()}${randomLetter()}`;

        setAccessCode(newAccessCode);
        DatabaseManager.update(path, { accessCode: newAccessCode });
        return newAccessCode;
    }

    return <ConfigurationMatchContext.Provider 
        value={{ onChangeCampaignName, setOpenToEnter, generateAccessCode, campaignName, isOpenedToEnter, accessCode }}>
            {children}
    </ConfigurationMatchContext.Provider>
}