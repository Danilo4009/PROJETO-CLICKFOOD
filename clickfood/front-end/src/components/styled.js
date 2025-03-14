import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const BtnDefautIcons = styled.button`

    display: flex;
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

    .center {
        text-align: center;
        width: 100%;
    }
`;

export const BtnDefaut = styled.button`
    color: #000000;
    width: 45%;
    display: inline-block;
    border: none;
    border-radius: 3px;
    padding: 20px;
    font-size: 16px;
    font-weight: bold;
    transition: 0.4s;
    justify- content: space-between;
    cursor: pointer;

    &:hover {
        background-color: #ea1d2c;
        color: #fff;
    }
`;

export const BtnBack = styled(ArrowBackIosNewIcon)`
    cursor: pointer;
    color: #ea1d2c;
`;