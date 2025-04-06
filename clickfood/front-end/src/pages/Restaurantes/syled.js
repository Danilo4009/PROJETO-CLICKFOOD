import styled from 'styled-components';

export const FormContainer = styled.div`
  background-color: #fff;
    padding: 30px;
    max-width: 450px;
    margin: auto;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 0px 5px #ccc;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Input = styled.input`
  color: #3e3e3e;
            background: transparent;
            font-weight: 500;
            outline: none;
            border: 1px solid #dcdcdc;
            position: relative;
            height: auto;
            z-index: 1;
            font-size: 1rem;
            line-height: 20px;
            width: 100%;
            box-sizing: border-box;
            align-items: center;
            padding: 13px 20px;
            width: 100%;
            border-radius: 4px;
            margin-bottom: 15px;
`;

export const Button = styled.button`
    align-items: center;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: 0px;
    outline: none;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    transition: 0.4s;
    cursor: pointer;

    &:hover {
        background-color: #ea1d2c;
        color: #fff;
    }
`;