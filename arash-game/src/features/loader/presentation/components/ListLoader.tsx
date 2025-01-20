import React from "react";
import { Loader } from "./Loader";
import { DesignSystem } from "../../../../core/design-system/DesignSystem";

export const ListLoader: React.FC<Loader> = ({ isLoading, children }) => {
    return <>
        {
            isLoading ? 
            <div className="space-y-2">
                <div className={DesignSystem.skeletonLoader.box}></div>
                <div className={DesignSystem.skeletonLoader.box}></div>
                <div className={DesignSystem.skeletonLoader.box}></div>
            </div> :
            children
        }
    </>
}