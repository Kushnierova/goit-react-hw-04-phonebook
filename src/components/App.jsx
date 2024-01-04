import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        {
          id: '1',
          name: 'Harry Potter',
          number: '459-12-56',
        },
        {
          id: '2',
          name: 'Hermione Granger',
          number: '443-89-12',
        },
        {
          id: '3',
          name: 'Ronald Weasley',
          number: '645-17-79',
        },
        {
          id: '4',
          name: 'Luna Lovegood',
          number: '227-91-26',
        },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  const checkName = name => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name}is already in contacts`);
      return false;
    }
    return true;
  };

  const addContact = (name, number) => {
    if (checkName(name)) {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts(state => [contact, ...state]);
    }
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.container}>
      <div className={css.phonebook}>
        <h1 className={css.titlePhonebook}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
      </div>
      <div className={css.contacts}>
        <h2 className={css.titleContacts}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
}
