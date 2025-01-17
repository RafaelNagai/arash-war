import React from "react";
import { TeamItem } from "./TeamItem";
import { useTeam } from "../contexts/TeamContext";


export const TeamList : React.FC = () => {
    const { teams, onAdd } = useTeam();

    return <>
        <h3>Nations</h3>
        <input type="button" onClick={() => onAdd()} value="+" />
        <div>
            {
                teams.map((item) => <TeamItem item={item} />)
            }
        </div>
    </>
}