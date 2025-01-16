import React from "react";
import { Team } from "../../data/Team";

type TeamItemProps = {
    item: Team,
    onChangeName: Function
}

export const TeamItem : React.FC<TeamItemProps> = ({ item, onChangeName }) => {
    return <div>
        <input type="text" value={item.name} onChange={(e) => {
            console.log(e.target.value)
            onChangeName(item.id, e.target.value)
        }} />
        <input type="button" value="remove" />
    </div>
}