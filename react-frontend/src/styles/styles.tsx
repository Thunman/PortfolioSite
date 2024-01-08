import styled, { createGlobalStyle } from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #475569, #1a202c);
  position: relative;
`;

const StyledFormContainer = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 2rem;
  background: #fff;
  border: 4px solid #475569;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledButton = styled.button`
  background: #475569;
  color: white;
  &:hover {
    background: #1a202c;
  };
  padding: 10px;
  font-size: 16px
  border: 4px solid #475569;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  
`;

const StyledInput = styled.input`
padding: 8px;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 3px;
background-color: #f7fafc; /* bg-gray-100 */

&:focus {
  outline: none;
  border-color: #6b7280; /* focus:border-gray-500 */
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.5); /* focus:ring-gray-500 */
}
`;


export {
    StyledContainer,
    StyledButton,
    StyledForm,
    StyledFormContainer,
    StyledInput

}

