const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

// Configuração multer para receber arquivo na memória
const upload = multer();

// >>>>>> SEU E-MAIL GMAIL E SENHA DE APLICATIVO <<<<<<
const EMAIL_USER = "juliochreis@gmail.com";
const EMAIL_PASS = "wknq ewgh etoo joao";

// Função para gerar código de verificação
function gerarCodigo() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Função para enviar código de verificação
async function enviarEmail(destinatario) {
  const codigo = gerarCodigo();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: `"Seu App" <${EMAIL_USER}>`,
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

// Rota para verificar se email já existe
app.post("/verificarEmail", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    res.json({ exists: !!user });
  } catch (error) {
    console.error("Erro ao verificar e-mail:", error);
    res.status(500).json({ error: "Erro ao verificar o e-mail" });
  }
});

// Enviar código por email
app.post("/enviarCodigo", async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
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

// Cadastro de usuário
app.post("/cadastrar", async (req, res) => {
  const { name, email, cpf } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Este e-mail já está registrado." });
    }

    await prisma.user.create({
      data: { name, email, cpf },
    });

    res.status(200).json({ success: true, message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ success: false, message: "Erro ao cadastrar o usuário." });
  }
});

// Cadastro de restaurante COM upload de imagem
app.post("/cadastrar-restaurante", upload.single("imagem"), async (req, res) => {
  try {
    const { name, email, cnpj, endereco, telefone } = req.body;

    const restauranteExiste = await prisma.restaurante.findUnique({ where: { email } });
    if (restauranteExiste) {
      return res.status(400).json({ success: false, message: "Este e-mail já está registrado." });
    }

    const imagemBuffer = req.file ? req.file.buffer : null;

    const novoRestaurante = await prisma.restaurante.create({
      data: {
        name,
        email,
        cnpj,
        endereco,
        telefone,
        imagem: imagemBuffer,
      },
    });

    console.log("Restaurante cadastrado:", novoRestaurante);

    res.status(200).json({ success: true, message: "Restaurante cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar restaurante:", error);
    res.status(500).json({ success: false, message: "Erro ao cadastrar o restaurante." });
  }
});

// Listar restaurantes
app.get("/restaurantes", async (req, res) => {
  try {
    const restaurantes = await prisma.restaurante.findMany();

    // Converter o buffer da imagem para base64
    const restaurantesComImagem = restaurantes.map((restaurante) => {
      return {
        ...restaurante,
        imagem: restaurante.imagem
          ? `data:image/png;base64,${restaurante.imagem.toString("base64")}`
          : null,
      };
    });

    res.json(restaurantesComImagem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar restaurantes" });
  }
});

// Cadastro de prato
app.post("/cadastrar-prato", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, preco, descricao, restauranteId } = req.body;
    const imagemBuffer = req.file ? req.file.buffer : null;

    const novoPrato = await prisma.prato.create({
      data: {
        nome,
        preco: parseFloat(preco),
        descricao,
        imagem: imagemBuffer,
        restauranteId,
      },
    });

    res.status(201).json({ success: true, dish: novoPrato });
  } catch (error) {
    console.error("Erro ao cadastrar prato:", error);
    res.status(500).json({ success: false, message: "Erro ao cadastrar o prato." });
  }
});

// Listar pratos
app.get("/pratos", async (req, res) => {
  try {
    const pratos = await prisma.prato.findMany();

    const pratosComImagem = pratos.map((prato) => ({
      ...prato,
      imagem: prato.imagem ? `data:image/png;base64,${prato.imagem.toString("base64")}` : null,
    }));

    res.json(pratosComImagem);
  } catch (error) {
    console.error("Erro ao listar pratos:", error);
    res.status(500).json({ error: "Erro ao listar pratos" });
  }
});

// Editar prato
app.put("/editar-prato/:id", upload.single("imagem"), async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, descricao } = req.body;
    const imagemBuffer = req.file ? req.file.buffer : null;

    const pratoAtualizado = await prisma.prato.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        preco: parseFloat(preco),
        descricao,
        ...(imagemBuffer && { imagem: imagemBuffer }),
      },
    });

    res.json({ success: true, prato: pratoAtualizado });
  } catch (error) {
    console.error("Erro ao editar prato:", error);
    res.status(500).json({ success: false, message: "Erro ao editar o prato." });
  }
});

// Excluir prato
app.delete("/excluir-prato/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.prato.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: "Prato excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir prato:", error);
    res.status(500).json({ success: false, message: "Erro ao excluir o prato." });
  }
});

// Enviar nota fiscal por e-mail
app.post("/enviar-nota", async (req, res) => {
  const { carrinho, total, email } = req.body;

  const htmlNota = `
    <h1>Nota Fiscal Eletrônica</h1>
    <p>Obrigado por sua compra!</p>
    <h2>Itens Comprados:</h2>
    <ul>
      ${carrinho
        .map(
          (item) => `<li>${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}</li>`
        )
        .join("")}
    </ul>
    <h3>Total: R$ ${total.toFixed(2)}</h3>
    <p>Data: ${new Date().toLocaleString()}</p>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Nota Fiscal" <${EMAIL_USER}>`,
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
    res.status(500).json({ status: "erro", message: "Erro ao enviar nota fiscal" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});