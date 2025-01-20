import React from "react";
import { TeamItem } from "./TeamItem";
import { useTeam } from "../../contexts/TeamContext";
import { DesignSystem } from "../../../../../core/design-system/DesignSystem";
import { ListLoader } from "../../../../loader/presentation/components/ListLoader";


export const TeamList : React.FC = () => {
    const { teams, onAdd, isLoading } = useTeam();

    return <div className={DesignSystem.floatBox.box}>
        <h3 className={DesignSystem.floatBox.title}>Team Group</h3>
        <button className={`${DesignSystem.input.button} bg-green-500`} type="button" onClick={onAdd} >Add</button>
        <ul>
            <ListLoader isLoading={isLoading}>
                {
                    teams.map((item) => <li key={item.id}><TeamItem item={item} /></li>)
                }
            </ListLoader>
        </ul>
    </div>
}