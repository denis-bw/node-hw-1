const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

    async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(data);
}

async function getContactById(contactId) {
            const data = await listContacts()
            const contact = data.filter(el => el.id === contactId);
            return contact || null;
}

async function removeContact(contactId) {
    const dataContacts = await listContacts();
    const index = dataContacts.findIndex(el => el.id === contactId)
    if (index === -1) {
        return null;
    }
    const data = dataContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(dataContacts, null, 2));
    return data;
    
}

async function addContact(name, email, phone) {
    const dataContacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone: `${phone}`
    }
    dataContacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(dataContacts, null, 2));
    return newContact;
}


module.exports = {
    addContact,
    listContacts,
    getContactById,
    removeContact,
};