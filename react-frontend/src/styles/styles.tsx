import styled, { createGlobalStyle } from "styled-components";

const container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #475569, #1a202c);
  position: relative;
`;

const formContainer = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 2rem;
  background: #fff;
  border: 4px solid #475569;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const button = styled.button`
  background: #475569;
  color: white;
  &:hover {
    background: #1a202c;
  };
  padding: 10px;
  font-size: 16px;
  border: 4px solid #475569;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const input = styled.input`
padding: 8px;
margin: 0;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 3px;
background-color: #f7fafc;
width: 100%;


&:focus {
  outline: none;
  border-color: #6b7280;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.5);
}
`;

const div = styled.div`
position: absolute;
top: 50;
left: 50;
width: 100%;
height: 10px;
box-shadow: 0px 0px 2px -2px rgba(0, 0, 0, 0.25);
background-color: #4a5568;
`;

const TooltipContainer = styled.div`
position: relative;
width: 100%;
padding: 0;
margin: 0;
`;

const Tooltip = styled.div`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;

  ${TooltipContainer}:hover &,
  ${TooltipContainer}:focus-within & {
    visibility: visible;
    opacity: 1;
  }`;

export {
  container,
  button,
  form,
  formContainer,
  input,
  div,
  Tooltip,
  TooltipContainer
}
