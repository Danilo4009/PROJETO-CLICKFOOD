import React, { useState } from 'react';
import Api from '../../Api';
import { AreaLogin, TelaLogin } from './styled';
import { BtnDefautIcons, BtnDefaut, BtnBack } from '../../components/styled';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = ({ onReceiveGoogle }) => {
    const [showPhoneInput, setShowPhoneInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');

    const actionLoginGoogle = async () => {
        const result = await Api.googleLogin();
        if (result) {
            const userEmail = result.user.email;
            setEmail(userEmail);

            try {
                const response = await fetch("http://localhost:3000/verificarEmail", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: userEmail }),
                });

                const data = await response.json();

                if (data.exists) {
                    localStorage.setItem("user", JSON.stringify(result.user));
                    onReceiveGoogle(result.user);
                } else {
                    await enviarCodigo(userEmail);
                    setShowVerification(true);
                }
            } catch (error) {
                console.error("Erro ao verificar e-mail:", error);
                alert("Erro ao verificar conta. Tente novamente.");
            }
        } else {
            alert("Erro ao tentar login com o Google");
        }
    };

    const enviarCodigo = async (email) => {
        console.log("Enviando código para o e-mail:", email);

        try {
            const response = await fetch('http://localhost:3000/enviarCodigo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            console.log("Resposta do servidor:", data);

            if (response.status === 200) {
                setGeneratedCode(data.codigo);
                setShowVerification(true);
            } else {
                alert(data.message || "Erro ao enviar o código.");
            }
        } catch (error) {
            console.error("Erro ao enviar o código:", error);
            alert("Erro ao enviar o código.");
        }
    };

    const handleVerification = async () => {
        if (verificationCode === generatedCode.toString()) {
            alert('Código verificado com sucesso!');
            setShowVerification(false);

            const userExistsResponse = await fetch("http://localhost:3000/verificarEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const userExistsData = await userExistsResponse.json();

            if (!userExistsData.exists) {
                setShowRegistration(true);
            } else {
                alert("Você já está registrado!");
                const user = { email };
                localStorage.setItem("user", JSON.stringify(user));
                onReceiveGoogle(user);
            }
        } else {
            alert('Código inválido!');
        }
    };

    const handleRegistration = async () => {
        const userData = {
            name,
            email,
            cpf,
        };

        try {
            const response = await fetch("http://localhost:3000/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            if (result.success) {
                alert("Cadastro realizado com sucesso!");

                const user = { name, email };
                localStorage.setItem("user", JSON.stringify(user));
                onReceiveGoogle(user);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao tentar cadastrar. Tente novamente.");
        }
    };

    return (
        <TelaLogin>
            <AreaLogin>
                {!showPhoneInput && !showEmailInput && !showVerification && !showRegistration ? (
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
                            <h2>Informe o número do seu celular</h2>
                            <input
                                type="tel"
                                placeholder="Informe o seu número de celular"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <BtnDefaut onClick={() => alert(`Número enviado: ${phone}`)}>Enviar código</BtnDefaut>
                        </form>
                        <BtnBack onClick={() => setShowPhoneInput(false)} />
                    </>
                ) : showEmailInput ? (
                    <>
                        <form>
                            <h2>Informe o seu e-mail</h2>
                            <input
                                type="email"
                                placeholder="Informe o seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <BtnDefaut onClick={async () => {
                                await enviarCodigo(email);
                                setShowVerification(true);
                            }}>Enviar código</BtnDefaut>
                        </form>
                        <BtnBack onClick={() => setShowEmailInput(false)} />
                    </>
                ) : showVerification ? (
                    <>
                        <form>
                            <h2>Verifique seu código</h2>
                            <input
                                type="text"
                                placeholder="Informe o código de verificação"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <BtnDefaut onClick={handleVerification}>Verificar Código</BtnDefaut>
                        </form>
                        <BtnBack onClick={() => setShowVerification(false)} />
                    </>
                ) : showRegistration ? (
                    <>
                        <form>
                            <h2>Complete seu cadastro</h2>
                            <input
                                type="text"
                                placeholder="Informe seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Informe seu CPF"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Informe seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <BtnDefaut onClick={handleRegistration}>Finalizar Cadastro</BtnDefaut>
                        </form>
                        <BtnBack onClick={() => setShowRegistration(false)} />
                    </>
                ) : null}
            </AreaLogin>
        </TelaLogin>
    );
};

export default LoginPage;
