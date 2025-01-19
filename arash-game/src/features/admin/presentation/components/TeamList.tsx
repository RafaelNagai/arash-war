import React from "react";
import { TeamItem } from "./TeamItem";
import { useTeam } from "../contexts/TeamContext";


export const TeamList : React.FC = () => {
    const { teams, onAdd } = useTeam();

    return <div className="flex flex-col bg-sky-200 border rounded-lg border-sky-700 p-4 border-2 relative mt-4">
        <h3 className="font-bold px-4 py-1 absolute text-sky-700 left-[10px] top-[-18px] bg-sky-300 border border-2 rounded-full border-sky-700 ">Team Group</h3>
        <button className="my-2 p-2 px-5 border-none border rounded bg-green-500 font-bold" type="button" onClick={onAdd} >Add</button>
        <ul>
            {
                teams.map((item) => <li key={item.id}><TeamItem item={item} /></li>)
            }
        </ul>
    </div>
}