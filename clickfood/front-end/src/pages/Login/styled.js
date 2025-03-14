import styled from 'styled-components';
import backgroundImage from '../../assets/fundo.png';

export const TelaLogin = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AreaLogin = styled.div`

    background-color: #fff;
    padding: 30px;
    max-width: 450px;
    margin: auto;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 0px 5px #ccc;
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);

    .botao {
        display: flex;
        justify-content: space-between;
    }

    .sub-titulo {
        font-size: 1.5rem;
        font-weight: 400;
        color: #717171;
    }

    form {
        width: 450px;
        margin-bottom: 25px;

        input {
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
        }

        .textoEmail {
            color: #717171;
            margin: 0;
            font-size: 12px;
            margin-bottom: 15px;
            text-align: justify;
        }

        .textoCelular {
            color: #717171;
            font-weight: 400;
            margin: 0;
            margin-bottom: 15px;
        }
    }
`;