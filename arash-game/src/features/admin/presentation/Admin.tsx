import React from "react";
import { TeamList } from "./components/TeamList";
import { TeamContextProvider } from "./contexts/TeamContext";

export const Admin: React.FC = () => {
    return <TeamContextProvider>
        <div className="flex flex-col md:flex-row">
            <div className="flex-1 px-2">
                <TeamList />
            </div>
            <div className="flex-1 px-2">
                <TeamList />
            </div>
        </div>
    </TeamContextProvider>
}