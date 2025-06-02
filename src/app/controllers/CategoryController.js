const CategoriesRepository = require('../repositories/CategoriesRepository')

class CategoryController {

//* listar TODOS os registros
  async index(request, response) {
    const categories = await CategoriesRepository.findAll()

    response.json(categories)
  }

  //* cria UM novo registro
  async store(request, response) {
    const { name } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is require' })
    }

    const category = await CategoriesRepository.create({ name })

    return response.json(category)
  }

  //* Obtem UM registro (através do id)
  async show(request, response) {
    const { id } = request.params
    const category = await CategoriesRepository.findById(id)

    if(!category) {
      return response.status(404).json({ error: 'Category not found' })
    }
    response.json(category)
  }

  //* Atualiza UM registro (através do id)
  async update(request, response) {
    const { id } = request.params
    const { name } = request.body

    const categoryExist = await CategoriesRepository.findById(id)
    if (!categoryExist) {
      return response.status(400).json({ error: 'Category not found' })
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }
    const categoryByName = await CategoriesRepository.findByName(name)
    if (categoryByName && categoryByName.id !== id) {
      return response.status(400).json({ error: 'This category already exists' })
    }

    const category = await CategoriesRepository.update(id, { name })

    response.json(category)
  }

  //* Deleta UMA categoria (através do id)
  async delete(request, response) {
    const { id } = request.params

    await CategoriesRepository.delete(id)
    // 204: No Content
    response.sendStatus(204)
  }
}

module.exports = new CategoryController()
