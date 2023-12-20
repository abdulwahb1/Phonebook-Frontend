import { useState, useEffect } from 'react'
import Form from './components/Form'
import PersonsList from './components/PersonsList'
import Search from './components/Search'
import personService from './components/person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('name')
  const [phone, setPhone] = useState("enter your number")
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    }).catch(error => {
      console.error('Error fetching data: ', error)
    })
  }, [])

  const formAction = (event) => {
    event.preventDefault();
    const obj = {
      name: newName,
      phone: phone
    };
  
    const existingPerson = persons.find(
      person => person.name && person.name.toLowerCase() === newName.toLowerCase()
    );
  
    if (existingPerson) {
      if (existingPerson.phone !== phone) {
        const confirmUpdate = window.confirm(
          `${newName} is already in the phonebook with a different number. Do you want to update the number?`
        );
  
        if (confirmUpdate) {
          const updatedPersons = persons.map(person =>
            person.id === existingPerson.id ? { ...person, phone } : person
          );
  
          setPersons(updatedPersons);
  
          personService.updatePhoneNumber(existingPerson.id, newName, phone)
            .catch(error => {
              console.error('Error updating phone number: ', error);
              // Rollback the local update on error
              setPersons(persons);
            });
  
          setNewName('');
          setPhone('');
          return;
        } else {
          // User chose not to update, clear the inputs
          setNewName('');
          setPhone('');
          return;
        }
      } else {
        alert(`${newName} is already added to the phone book with the same number.`);
        setNewName('');
        setPhone('');
        return;
      }
    }
  
    personService.create(obj)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        setNewName('');
        setPhone('');
      })
      .catch(error => {
        console.error('Error creating person: ', error);
      });
  };

  // const existingPerson = persons.find(
  //   person => person.name.toLowerCase() === newName.toLowerCase()
  // );

  // if (existingPerson && existingPerson.phone !== phone) {
  //   const confirmUpdate = window.confirm(
  //     `${newName} is already in the phonebook with a different number. Do you want to update the number?`
  //   );
  //   if (confirmUpdate) {
  //     const updatedPersons = persons.map(person =>
  //       person.id === existingPerson.id ? { ...person, phone } : person
  //     );
  //     setPersons(updatedPersons);

  //     personService
  //       .updatePhoneNumber(existingPerson.id, phone)
  //       .catch(error => {
  //         console.error('Error updating phone number: ', error);
  //         // Rollback the local update on error
  //         setPersons(persons);
  //       });
  //   }
  // }

  const handleNewName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handlePhone = (event) => {
    event.preventDefault()
    setPhone(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    setSearchQuery(event.target.value)
  } 

  const handleDelete = (id) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this person?');
    if (confirmDeletion) {
      personService.deletePerson(id)
        .then(() => {
          const updatedPersons = persons.filter(person => person.id !== id);
          setPersons(updatedPersons);
        })
        .catch(error => {
          console.error('Error deleting person: ', error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Form
      newName={newName}
      phone={phone}
      handleNewName={handleNewName}
      handlePhone={handlePhone}
      formAction={formAction}
      />

      <Search searchQuery = {searchQuery} handleSearch={handleSearch}/>

      <PersonsList persons={persons} searchQuery={searchQuery} handleDelete={handleDelete}
      />
      
    </div>
  )
}

export default App