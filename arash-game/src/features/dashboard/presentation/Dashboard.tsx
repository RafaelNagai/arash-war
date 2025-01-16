import { Admin } from "../../admin/presentation/Admin";
import Logout from "./components/Logout";

const Dashboard : React.FC = () => {
    return <>
        <h1>Logged</h1>
        <Admin></Admin>
        <Logout></Logout>
    </>
}

export default Dashboard;