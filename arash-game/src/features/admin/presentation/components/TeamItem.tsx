import React from "react";
import { Team } from "../../data/Team";
import { useTeam } from "../contexts/TeamContext";

type TeamItemProps = {
    item: Team,
}

export const TeamItem : React.FC<TeamItemProps> = ({ item }) => {
    const { onChangeName, onDelete } = useTeam();
    return <div>
        <input type="text" value={item.name} onChange={(e) => {
            console.log(e.target.value)
            onChangeName(item.id, e.target.value)
        }} />
        <input type="button" value="remove" onClick={() => onDelete(item.id)} />
    </div>
}