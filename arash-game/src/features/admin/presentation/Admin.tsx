import React, { useState } from "react";
import { TeamList } from "./components/TeamList";
import { Team } from "../data/Team";

export const Admin: React.FC = () => {

    const [teams, setTeams] = useState<Team[]>([]);
    console.log(teams);

    const onSave = () => {
    }

    return <>
        <TeamList teams={teams} setTeam={setTeams} />
        <input type="button" onClick={onSave} value="Save" />
    </>
}