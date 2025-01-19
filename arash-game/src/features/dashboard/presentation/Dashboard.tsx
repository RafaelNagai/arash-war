import { Admin } from "../../admin/presentation/Admin";
import Logout from "./components/Logout";

const Dashboard : React.FC = () => {
    return <>
        <div className="flex flex-row px-4 py-2 justify-center items-center">
            <h1 className="flex-1">Dashboard Page</h1>
            <Logout></Logout>
        </div>
        <Admin></Admin>
    </>
}

export default Dashboard;