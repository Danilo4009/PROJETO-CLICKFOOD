import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Api from '../../Api';

import { AreaLogin, TelaLogin } from './styled';
import { BtnDefautIcons, BtnDefaut, BtnBack } from '../../components/styled';

import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

export default ({ onReceiveGoogle }) => {
    const [showPhoneInput, setShowPhoneInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const actionLoginGoogle = async () => {
        let result = await Api.googleLogin();
        if (result) {
            onReceiveGoogle(result.user);
        } else {
            alert('Error');
        }
    };

    return (
        <BrowserRouter>
            <TelaLogin>
                <AreaLogin>
                    {!showPhoneInput && !showEmailInput ? (
                        <>
                    
                            <h1>Falta pouco para matar sua fome!</h1>         
                            <h2 className='sub-titulo'>Como deseja continuar?</h2>

                            <BtnDefautIcons>
                                <FacebookIcon />
                                <div className="center">Continuar com Facebook</div>
                            </BtnDefautIcons>

                            <BtnDefautIcons onClick={actionLoginGoogle}>
                                <GoogleIcon />
                                <div className="center">Continuar com Google</div>
                            </BtnDefautIcons>

                            <p>OU</p>

                            <div className="botao">
                                <BtnDefaut onClick={() => setShowPhoneInput(true)}>Celular</BtnDefaut>
                                <BtnDefaut onClick={() => setShowEmailInput(true)}>E-mail</BtnDefaut>
                            </div>
                        </>
                    ) : showPhoneInput ? (
                        <>
                            <form>
                                <h2>Informe o número do seu celular para continuar</h2>
                                <input
                                    type="tel"
                                    placeholder="Informe o seu número de celular"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <p className='textoCelular'>Como deseja receber seu código?</p>
                                <BtnDefaut onClick={() => alert(`Número enviado: ${phone}`)}>WhatsApp</BtnDefaut>
                            </form>
                            <BtnBack onClick={() => setShowPhoneInput(false)}/>
                        
                        </>
                    ) : (
                        <>
                            <form>
                                <h2>Informe o seu e-mail</h2>
                                <input
                                    type="email"
                                    placeholder="Informe o seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p className='textoEmail'>
                                    O ClickFood poderá enviar comunicações neste e-mail. Caso não queira receber comunicações nesse canal, é só acessar a opção “Configurações” no aplicativo ou se desinscrever na sua caixa de e-mail.
                                </p>
                                <BtnDefaut onClick={() => alert(`E-mail enviado: ${email}`)}>Continuar</BtnDefaut>
                            </form>
                            <BtnBack onClick={() => setShowEmailInput(false)}/>  
                        </>
                    )}
                </AreaLogin>
            </TelaLogin>  
        </BrowserRouter>
    );
};