const { request } = require('express')
const ContactsRepository = require('../repositories/ContactsRepository')

class ContactController {

  //* listar TODOS os registros
  async index(request, response) {
    const { orderBy }  = request.query
    const contacts = await ContactsRepository.findAll(orderBy)

    response.json(contacts)
  }

  //* obtem UM registro
  async show(request, response) {
    const { id } = request.params
    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'Contact not Found' })
    }

    response.json(contact)
  }

  //* cria UM novo registro
  async store(request, response) {
    const { name, email, phone, category_id } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is require' })
    }

    const contactExists = await ContactsRepository.findByEmail(email)

    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use.' })
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id
    })

    response.json(contact)
  }

  //* Edita UM registro
  async update(request, response) {
    const { id } = request.params
    const { name, email, phone, category_id } = request.body

    const contactExists = await ContactsRepository.findById(id)
    if (!contactExists) {
      return response.status(400).json({ error: 'User not found' })
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is require' })
    }

    const contactByEmail = await ContactsRepository.findByEmail(email)
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use.' })
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id
    })

    response.json(contact)
  }

  //* Deleta UM registro
  async delete(request, response) {
    const { id } = request.params

    await ContactsRepository.delete(id)
    // 204: No Content
    response.sendStatus(204)
  }
}

// Singleton -> posso utilizar apenas uma instancia do meu objeto
module.exports = new ContactController()
