import css from './contactList.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilters } from 'redux/selector';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilters);

  const getFilteredContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const filteredContact = getFilteredContact();

  return (
    <ul>
      {filteredContact.map(contact => {
        const { id, name, number } = contact;
        return (
          <li key={id} className={css.contactsItem}>
            <p>{`${name} : ${number}`}</p>
            <button onClick={() => dispatch(deleteContact(id))}>delete</button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};
