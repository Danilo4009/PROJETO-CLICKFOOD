const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client"); 

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

function gerarCodigo() {
    return Math.floor(100000 + Math.random() * 900000);
}

async function enviarEmail(destinatario) {
    const codigo = gerarCodigo(); 

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "juliochreis@gmail.com", 
            pass: "npzy kchb kbbn lplw", 
        },
    });

    let mailOptions = {
        from: '"Julio" <juliochreis@gmail.com>',
        to: destinatario,
        subject: "Código de Verificação",
        html: `<p>Seu código de verificação é: <strong>${codigo}</strong></p>`,

    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("E-mail enviado: " + info.response);
        return codigo;
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return null;
    }
}

app.post("/verificarEmail", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        res.json({ exists: !!user });
    } catch (error) {
        console.error("Erro ao verificar e-mail:", error);
        res.status(500).json({ error: "Erro ao verificar o e-mail" });
    }
});

app.post("/enviarCodigo", async (req, res) => {
    const { email } = req.body;


    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (user) {
        return res.status(400).json({ success: false, message: "Este e-mail já está registrado." });
    }

    const codigo = await enviarEmail(email);
    if (codigo) {
        res.status(200).json({ success: true, codigo });
    } else {
        res.status(500).json({ success: false, message: "Erro ao enviar o e-mail." });
    }
});

app.post("/cadastrar", async (req, res) => {
    const { name, email, cpf } = req.body;

    try {
        const userExists = await prisma.user.findUnique({
            where: { email },
        });
        if (userExists) {
            return res.status(400).json({ success: false, message: "Este e-mail já está registrado." });
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                cpf,
            },
        });

        res.status(200).json({ success: true, message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao cadastrar o usuário." });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});