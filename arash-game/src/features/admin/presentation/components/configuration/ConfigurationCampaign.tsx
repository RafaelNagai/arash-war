import React from "react";
import { useConfigurationCampaign } from "../../contexts/ConfigurationCampaignContext";
import { DesignSystem } from "../../../../../core/design-system/DesignSystem";
import { ListLoader } from "../../../../loader/presentation/components/ListLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

export const ConfigurationCampaign : React.FC = () => {
    const { campaignName, onChangeCampaignName, isOpenedToEnter, setOpenToEnter, accessCode, generateAccessCode, isLoading } = useConfigurationCampaign();
    
    return <div className={DesignSystem.floatBox.box}>
        <h3 className={DesignSystem.floatBox.title}>Campaign</h3>
        <ListLoader isLoading={isLoading}>
            <input type="text" className={DesignSystem.input.text} placeholder="Campaign's Name" value={campaignName} onChange={(e) => onChangeCampaignName(e.target.value)} />

            <div className="flex flex-row items-center my-2">
                <p className="mr-2">Can enter new players</p>
                <input className={`p-2 px-5 border-none border rounded-l-lg font-bold bg-gray-200 ${isOpenedToEnter ? "bg-green-400" : ""}`} type="button" value="Yes" onClick={() => setOpenToEnter(true)} />
                <input className={`p-2 px-5 border-none border rounded-r-lg font-bold bg-gray-200 ${!isOpenedToEnter ? "bg-red-400" : ""}`} type="button" value="No"  onClick={() => setOpenToEnter(false)} />
                <input className="hidden" type="checkbox" checked={isOpenedToEnter} onChange={(e) => setOpenToEnter(e.target.checked)} />
            </div>
            
            <div className="flex flex-row items-end p-6 justify-center">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xl">ACCESS CODE: </p>
                    <div className="text-5xl font-bold">{accessCode}</div>
                </div>
                <button className={`${DesignSystem.input.button}`} onClick={generateAccessCode}>
                    <FontAwesomeIcon icon={faArrowRotateRight} />
                </button>
            </div>
        </ListLoader>
    </div>
}