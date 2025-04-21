import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const restauranteService = {
  async cadastrar(restauranteData) {
    return await prisma.restaurante.create({
      data: {
        name: restauranteData.nome,
        email: restauranteData.email,
        telefone: restauranteData.telefone,
        endereco: restauranteData.endereco,
        cnpj: restauranteData.cnpj,
        banner: restauranteData.banner || 'https://via.placeholder.com/800x400?text=Sem+Banner'
      }
    })
  },

  async adicionarPrato(restauranteId, pratoData) {
    return await prisma.prato.create({
      data: {
        nome: pratoData.nome,
        preco: parseFloat(pratoData.preco),
        descricao: pratoData.descricao,
        imagem: pratoData.imagem || 'https://via.placeholder.com/500x300?text=Sem+Imagem',
        restauranteId: restauranteId
      }
    })
  },

  async buscarPorId(id) {
    return await prisma.restaurante.findUnique({
      where: { id },
      include: { pratos: true }
    })
  },

  async listarTodos() {
    return await prisma.restaurante.findMany({
      include: { pratos: true }
    })
  },

  async atualizarPrato(id, pratoData) {
    return await prisma.prato.update({
      where: { id },
      data: {
        nome: pratoData.nome,
        preco: parseFloat(pratoData.preco),
        descricao: pratoData.descricao,
        imagem: pratoData.imagem
      }
    })
  },

  async deletarPrato(id) {
    return await prisma.prato.delete({
      where: { id }
    })
  },

  async deletarRestaurante(id) {
    await prisma.prato.deleteMany({ where: { restauranteId: id } })
    return await prisma.restaurante.delete({ where: { id } })
  }
}