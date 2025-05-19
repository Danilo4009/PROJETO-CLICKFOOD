require("dotenv").config();

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
    return res
      .status(400)
      .json({ success: false, message: "Este e-mail já está registrado." });
  }

  const codigo = await enviarEmail(email);
  if (codigo) {
    res.status(200).json({ success: true, codigo });
  } else {
    res
      .status(500)
      .json({ success: false, message: "Erro ao enviar o e-mail." });
  }
});

app.post("/cadastrar", async (req, res) => {
  const { name, email, cpf } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Este e-mail já está registrado." });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        cpf,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Erro ao cadastrar o usuário." });
  }
});

app.post("/enviar-nota", async (req, res) => {
  const { carrinho, total, email } = req.body;

  const htmlNota = `
        <h1>Nota Fiscal Eletrônica</h1>
        <p>Obrigado por sua compra!</p>
        <h2>Itens Comprados:</h2>
        <ul>
            ${carrinho
              .map(
                (item) => `
                <li>${item.quantidade}x ${item.nome} - R$ ${(
                  item.preco * item.quantidade
                ).toFixed(2)}</li>
            `
              )
              .join("")}
        </ul>
        <h3>Total: R$ ${total.toFixed(2)}</h3>
        <p>Data: ${new Date().toLocaleString()}</p>
    `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "juliochreis@gmail.com",
      pass: "npzy kchb kbbn lplw",
    },
  });

  const mailOptions = {
    from: '"Nota Fiscal" <juliochreis@gmail.com>',
    to: email,
    subject: "Sua Nota Fiscal - Compra Realizada",
    html: htmlNota,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Nota fiscal enviada para:", email);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Erro ao enviar nota fiscal:", error);
    res
      .status(500)
      .json({ status: "erro", message: "Erro ao enviar nota fiscal" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
