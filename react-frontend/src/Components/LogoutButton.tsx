import { LogoutButtonProps } from "../Interfaces/Interfaces";
import { logout } from "../Services/auth";
import { MenuButton, StyledLink } from "../Styles/Styles";





const LogoutButton: React.FC<LogoutButtonProps> = ({ setIsLoggedIn }) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      logout().then((res) => {
        if (res.success) {
          setIsLoggedIn(false);
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