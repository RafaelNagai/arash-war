import React from "react";
import { TeamList } from "./components/team/TeamList";
import { TeamContextProvider } from "./contexts/TeamContext";
import { ConfigurationMatchProvider } from "./contexts/ConfigurationCampaignContext";
import { ConfigurationCampaign } from "./components/configuration/ConfigurationCampaign";

export const Admin: React.FC = () => {
    return <ConfigurationMatchProvider>
        <TeamContextProvider>
            <div className="flex flex-col md:flex-row">
                <div className="flex-1 px-2">
                    <ConfigurationCampaign />
                </div>
                <div className="flex-1 px-2">
                    <TeamList />
                </div>
            </div>
        </TeamContextProvider>
    </ConfigurationMatchProvider>;
}