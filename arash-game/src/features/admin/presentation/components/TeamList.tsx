import React from "react";
import { Team } from "../../data/Team";
import { TeamItem } from "./TeamItem";
import { v4 as uuidv4 } from 'uuid';

type TeamListProps = {
    teams: Team[],
    setTeam: Function,
}

export const TeamList : React.FC<TeamListProps> = ({ teams, setTeam }) => {
    const setName = (id: string, name: string) => {
        const item = teams.find(item => item.id === id);
        if(item) {
            item.name = name;
        }
        setTeam([...teams]);
    } 

    const onAddTeam = () => {
        setTeam([...teams, {id: uuidv4() ,name: `Nation ${teams.length}`}]);
        //console.log(teams);
    }

    return <>
        <h3>Nations</h3>
        <input type="button" onClick={onAddTeam} value="+" />
        <div>
            {
                teams.map((item) => <TeamItem item={item} onChangeName={setName} />)
            }
        </div>
    </>
}