import React, { createContext, useContext, useEffect, useState } from "react";
import { Team } from "../../data/Team";
import { v4 as uuidv4 } from 'uuid';
import { DatabaseManager } from "../../../../core/database/DatabaseManager";

interface ITeamContext {
    teams: Team[],
    onAdd: () => void,
    onChangeName: (id: string, name: string) => void,
    onDelete: (id: string) => void,
}

const TeamContext = createContext<ITeamContext | undefined>(undefined);

export const useTeam = () => {
    const context = useContext(TeamContext);
    if(!context) {
        throw new Error("Error to load my context");
    }
    return context;
}

export const TeamContextProvider : React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const path = "/config/teams";

    useEffect(() => {
        const fetchTeams = async () => {
            const teamsFromDatabase = await DatabaseManager.get<Team>(path);
            const teamList = Object.values(teamsFromDatabase ?? {});
            setTeams(teamList);
        }
        fetchTeams();
    }, []);

    const onAdd = () => {
        const teamItem = new Team(uuidv4(), `Nation ${teams.length + 1}`);
        const teamList = [...teams, teamItem];
        setTeams(teamList);
        DatabaseManager.set(path + `/${teamItem.id}`, teamItem);
    }

    const onChangeName = (id:string, name:string) => {
        const team = teams.find((item) => item.id === id);
        if(team){
            team.name = name;
        }
        setTeams([...teams]);
        if(team) {
            DatabaseManager.update(path + `/${id}`, team);
        }
    }

    const onDelete = (id: string) => {
        const newTeams = teams.filter((item) => item.id !== id);
        setTeams([...newTeams]);
        DatabaseManager.delete(path + `/${id}`);
    }

    return <TeamContext.Provider value={{teams, onAdd, onChangeName, onDelete}}>{children}</TeamContext.Provider>
}
