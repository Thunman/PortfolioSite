
import styled from 'styled-components';

export const GameContainer = styled.div`
    position: relative;
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #553030;
    border: 4px solid #475569;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

export const Circle = styled.div<{ randomColor: string, top: string, left: string }>`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${(props) => props.randomColor};
`;



export const GameBackground = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #475569, #1a202c);
    position: relative;
`;

export const Button = styled.button`
    position: absolute;
    
    bottom: 20px;
    display: flex;
    justify-content: center;
    background: #475569;
    color: white;
    &:hover {
        background: #1a202c;
        border: 4px solid #1a202c;
    }
    padding: 10px;
    font-size: 16px;
    border: 4px solid #475569;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;

export const Score = styled.button`
    position: absolute;
    
    top: 20px;
    display: flex;
    justify-content: center;
    background: #475569;
    color: white;
    &:hover {
        background: #1a202c;
        border: 4px solid #1a202c;
    }
    padding: 10px;
    font-size: 16px;
    border: 4px solid #475569;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;

export const Timer = styled.button`
    position: absolute;
    
    left: 20px;
    display: flex;
    justify-content: center;
    background: #475569;
    color: white;
    &:hover {
        background: #1a202c;
        border: 4px solid #1a202c;
    }
    padding: 10px;
    font-size: 16px;
    border: 4px solid #475569;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;