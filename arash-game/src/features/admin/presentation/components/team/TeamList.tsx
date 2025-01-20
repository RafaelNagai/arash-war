import React from "react";
import { TeamItem } from "./TeamItem";
import { useTeam } from "../../contexts/TeamContext";


export const TeamList : React.FC = () => {
    const { teams, onAdd, isLoading } = useTeam();

    return <div className="bg-sky-200 border rounded-lg border-sky-700 p-4 border-2 relative mt-4">
        <h3 className="font-bold px-4 py-1 absolute text-sky-700 left-[10px] top-[-18px] bg-sky-300 border border-2 rounded-full border-sky-700">Team Group</h3>
        <button className="my-2 p-2 px-5 border-none border rounded bg-green-500 font-bold" type="button" onClick={onAdd} >Add</button>
        <ul>
            {
                isLoading ? 
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-700/20 rounded w-full animate-pulse"></div>
                        <div className="h-6 bg-gray-700/20 rounded w-full animate-pulse"></div>
                        <div className="h-6 bg-gray-700/20 rounded w-full animate-pulse"></div>
                    </div> : 
                    teams.map((item) => <li key={item.id}><TeamItem item={item} /></li>)
            }
        </ul>
    </div>
}