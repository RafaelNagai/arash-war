import { Admin } from "../../admin/presentation/Admin";
import Logout from "./components/Logout";

const Dashboard : React.FC = () => {
    return <>
        <div className="flex flex-row px-4 py-2 justify-center items-center bg-sky-800">
            <h1 className="flex-1 text-white font-bold">Dashboard Page</h1>
            <Logout />
        </div>
        <div className="p-4">
            <Admin></Admin>
        </div>
    </>
}

export default Dashboard;