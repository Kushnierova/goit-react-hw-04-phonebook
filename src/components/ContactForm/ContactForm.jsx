import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

function ContactForm({onSubmit}) {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    const { name, number } = formData;
    e.preventDefault();
    onSubmit(name,number);
    reset();
  };

  const reset = () => {
    setFormData({ name: '', number: '' });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor={nameInputId}>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          required
          onChange={handleChange}
          className={css.input}
          id={nameInputId}
        />
      </label>
      <label className={css.label} htmlFor={numberInputId}>
        Number:
        <input
          type="tel"
          name="number"
          value={formData.number}
          required
          onChange={handleChange}
          className={css.input}
          id={numberInputId}
        />
      </label>
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}


ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
