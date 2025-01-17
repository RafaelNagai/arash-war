import React from "react";
import { TeamList } from "./components/TeamList";
import { TeamContextProvider } from "./contexts/TeamContext";

export const Admin: React.FC = () => {
    const onSave = () => {
    }

    return <TeamContextProvider>
        <TeamList />
        <input type="button" onClick={onSave} value="Save" />
    </TeamContextProvider>
}