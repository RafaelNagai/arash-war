import { useAuth } from "../../../../core/authentication/AuthContext";

const Logout: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
      Logout
    </button>
  );
};

export default Logout;