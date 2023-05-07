const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(id) {
  const contactsList = await listContacts();
  const result = contactsList.find((contact) => contact.id === id);
  return result || null;
}

async function removeContact(id) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify([...contactsList], null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContac = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactsList.push(newContac);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContac;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
