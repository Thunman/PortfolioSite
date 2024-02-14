import { LogoutButtonProps } from "../Interfaces/Interfaces";
import { logout } from "../Services/auth";
import { MenuButton, StyledLink } from "../Styles/Styles";
import { useNavigate } from "react-router-dom";




const LogoutButton: React.FC<LogoutButtonProps> = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      logout().then((res) => {
        if (res.success) {
          setIsLoggedIn(false);
          navigate("/");
        } else {
          alert(res.message);
        }
      });
    };
  
    return (
      <MenuButton as={StyledLink} to="/" onClick={handleSubmit}>
        Log Out
      </MenuButton>
    );
  };

  export default LogoutButton;