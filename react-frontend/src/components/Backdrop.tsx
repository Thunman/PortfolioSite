
import { StyledBackdrop } from "../styles/styles";
import { BackdropProps } from "./interface";


const Backdrop = ({children, onClick}: BackdropProps) => {

    return (
        <StyledBackdrop
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </StyledBackdrop>
    )
}
export default Backdrop;