import React from "react";
import { TeamList } from "./components/TeamList";
import { TeamContextProvider } from "./contexts/TeamContext";

export const Admin: React.FC = () => {
    return <TeamContextProvider>
        <div className="flex flex-row">
            <TeamList />
        </div>
    </TeamContextProvider>
}