import React from "react";
import { Team } from "../../../data/Team";
import { useTeam } from "../../contexts/TeamContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { DesignSystem } from "../../../../../core/design-system/DesignSystem";

type TeamItemProps = {
    item: Team,
}

export const TeamItem : React.FC<TeamItemProps> = ({ item }) => {
    const { onChangeName, onDelete } = useTeam();
    return <div className="my-2 flex items-center">
        <input
            className={DesignSystem.input.text}
            type="text" 
            value={item.name} 
            onChange={(e) => onChangeName(item.id, e.target.value)} 
            placeholder="Team Name" />
        <button
            className="flex justify-center items-center p-3 ml-1 w-5 h-5 border rounded-full border-none bg-red-700 text-white font-bold" 
            type="button"  
            onClick={() => onDelete(item.id)} >
            <FontAwesomeIcon icon={faXmark} />
        </button>
    </div>
}