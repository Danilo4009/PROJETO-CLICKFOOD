const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();
const upload = multer();

const EMAIL_USER = "juliochreis@gmail.com";
const EMAIL_PASS = "mdqc fhpl ieku fzxo";

function gerarCodigo() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function enviarEmail(destinatario) {
  const codigo = gerarCodigo();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Seu App" <${EMAIL_USER}>`,
    to: destinatario,
    subject: "Código de Verificação",
    html: `<p>Seu código de verificação é: <strong>${codigo}</strong></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
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
    const user = await prisma.user.findUnique({ where: { email } });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: "Erro ao verificar o e-mail" });
  }
});

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



app.post("/registrar-pedido", async (req, res) => {
  const { carrinho, total, email, enderecoEntrega, metodoPagamento } = req.body;

  try {
    const pedido = await prisma.pedido.create({
      data: {
        email,
        enderecoRua: enderecoEntrega.rua,
        enderecoCidade: enderecoEntrega.cidade,
        enderecoEstado: enderecoEntrega.estado,
        enderecoCep: enderecoEntrega.cep,
        metodoPagamento,
        total,
        itens: carrinho,
      },
    });

    res.status(201).json({ status: "ok", pedido });
  } catch (error) {
    console.error("Erro ao registrar pedido:", error);
    res.status(500).json({ status: "erro", message: "Erro ao registrar pedido" });
  }
});





app.post("/cadastrar", async (req, res) => {
  const { name, email, cpf } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Este e-mail já está registrado." });
    }

    await prisma.user.create({ data: { name, email, cpf } });
    res.status(200).json({ success: true, message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao cadastrar o usuário." });
  }
});



app.post("/cadastrar-restaurante", upload.single("imagem"), async (req, res) => {
  try {
    const { name, email, cnpj, endereco, telefone } = req.body;

    const restauranteExiste = await prisma.restaurante.findUnique({ where: { email } });
    if (restauranteExiste) {
      return res.status(400).json({ success: false, message: "Este e-mail já está registrado." });
    }

    const imagemBuffer = req.file ? req.file.buffer : null;

    await prisma.restaurante.create({
      data: { name, email, cnpj, endereco, telefone, imagem: imagemBuffer },
    });

    res.status(200).json({ success: true, message: "Restaurante cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao cadastrar o restaurante." });
  }
});


app.get("/restaurantes", async (req, res) => {
  try {
    const restaurantes = await prisma.restaurante.findMany();
    const restaurantesComImagem = restaurantes.map((restaurante) => ({
      ...restaurante,
      imagem: restaurante.imagem ? `data:image/png;base64,${restaurante.imagem.toString("base64")}` : null,
    }));
    res.json(restaurantesComImagem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar restaurantes" });
  }
});



app.get("/restaurantes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const restaurante = await prisma.restaurante.findUnique({ where: { id } });

    if (!restaurante) {
      return res.status(404).json({ error: "Restaurante não encontrado" });
    }

    res.json({
      ...restaurante,
      imagem: restaurante.imagem ? `data:image/png;base64,${restaurante.imagem.toString("base64")}` : null,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar restaurante" });
  }
});


app.post("/cadastrar-prato", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, preco, descricao, restauranteId } = req.body;
    const imagemBuffer = req.file ? req.file.buffer : null;

    const restaurante = await prisma.restaurante.findUnique({ where: { id: restauranteId } });
    if (!restaurante) {
      return res.status(404).json({ success: false, message: "Restaurante não encontrado." });
    }

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
    res.status(500).json({ success: false, message: "Erro ao cadastrar o prato." });
  }
});


app.get("/restaurantes/:id/pratos", async (req, res) => {
  try {
    const pratos = await prisma.prato.findMany({
      where: { restauranteId: req.params.id },
    });

    const pratosComImagem = pratos.map((prato) => ({
      ...prato,
      imagem: prato.imagem ? `data:image/png;base64,${prato.imagem.toString("base64")}` : null,
    }));

    res.json(pratosComImagem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar pratos" });
  }
});


app.get("/pratos/:id", async (req, res) => {
  try {
    const prato = await prisma.prato.findUnique({ where: { id: req.params.id } });

    if (!prato) {
      return res.status(404).json({ error: "Prato não encontrado" });
    }

    res.json({
      ...prato,
      imagem: prato.imagem ? `data:image/png;base64,${prato.imagem.toString("base64")}` : null,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar prato" });
  }
});


app.put("/pratos/:id", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;
    const imagemBuffer = req.file ? req.file.buffer : null;

    const pratoAtualizado = await prisma.prato.update({
      where: { id: req.params.id },
      data: {
        nome,
        preco: parseFloat(preco),
        descricao,
        ...(imagemBuffer && { imagem: imagemBuffer }),
      },
    });

    res.json({ success: true, prato: pratoAtualizado });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao editar o prato." });
  }
});


app.delete("/pratos/:id", async (req, res) => {
  try {
    await prisma.prato.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Prato excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao excluir o prato." });
  }
});


app.post("/enviar-nota", async (req, res) => {
  const { carrinho, total, email } = req.body;

  const htmlNota = `
    <h1>Nota Fiscal Eletrônica</h1>
    <p>Obrigado por sua compra!</p>
    <h2>Itens Comprados:</h2>
    <ul>
      ${carrinho.map((item) => `<li>${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}</li>`).join("")}
    </ul>
    <h3>Total: R$ ${total.toFixed(2)}</h3>
    <p>Data: ${new Date().toLocaleString()}</p>
  `;

  try {
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

    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "erro", message: "Erro ao enviar nota fiscal" });
  }
});

app.get("/relatorio-vendas", async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      orderBy: { criadoEm: "desc" },
    });

    const filtroMes = parseInt(req.query.mes); // 1-12
    const filtroAno = parseInt(req.query.ano);

    const vendasFiltradas = pedidos.filter((pedido) => {
      const data = new Date(pedido.criadoEm);
      const mes = data.getMonth() + 1;
      const ano = data.getFullYear();
      return (!filtroMes || mes === filtroMes) && (!filtroAno || ano === filtroAno);
    });

    const totalFiltrado = vendasFiltradas.reduce((acc, pedido) => acc + pedido.total, 0);
    const totalGeral = pedidos.reduce((acc, pedido) => acc + pedido.total, 0);

    const vendasPorMes = {};
    pedidos.forEach((pedido) => {
      const data = new Date(pedido.criadoEm);
      const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
      vendasPorMes[mesAno] = (vendasPorMes[mesAno] || 0) + pedido.total;
    });

    res.status(200).json({
      totalFiltrado: totalFiltrado.toFixed(2),
      totalGeral: totalGeral.toFixed(2),
      vendasPorMes,
    });
  } catch (error) {
    console.error("Erro no relatório:", error);
    res.status(500).json({ error: "Erro ao gerar relatório" });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
