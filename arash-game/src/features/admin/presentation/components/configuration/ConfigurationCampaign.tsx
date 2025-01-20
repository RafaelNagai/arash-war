import React from "react";
import { useConfigurationCampaign } from "../../contexts/ConfigurationCampaignContext";

export const ConfigurationCampaign : React.FC = () => {
    const { campaignName, onChangeCampaignName, isOpenedToEnter, setOpenToEnter, accessCode, generateAccessCode } = useConfigurationCampaign();
    
    return <div className="bg-sky-200 border rounded-lg border-sky-700 p-4 border-2 relative mt-4">
        <h3 className="font-bold px-4 py-1 absolute text-sky-700 left-[10px] top-[-18px] bg-sky-300 border border-2 rounded-full border-sky-700">Campaign</h3>
        <input type="text" value={campaignName} onChange={(e) => onChangeCampaignName(e.target.value)} />
        <input type="checkbox" checked={isOpenedToEnter} onChange={(e) => setOpenToEnter(e.target.checked)} />
        <div>ACCESS CODE</div>
        <div>{accessCode}</div>
        <button onClick={generateAccessCode}>Refresh</button>
    </div>
}