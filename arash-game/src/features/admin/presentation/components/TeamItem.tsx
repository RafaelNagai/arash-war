import React from "react";
import { Team } from "../../data/Team";
import { useTeam } from "../contexts/TeamContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type TeamItemProps = {
    item: Team,
}

export const TeamItem : React.FC<TeamItemProps> = ({ item }) => {
    const { onChangeName, onDelete } = useTeam();
    return <div className="my-2 flex items-center">
        <input
            className="px-2 py-0.5 border rounded" 
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