// New PersonList component
const PersonsList = ({persons, searchQuery, handleDelete}) => {
    const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()))
     
    return (
        <div>
            <h2>Numbers</h2>
            {filteredPersons.map((person, index) =>
            <p key={index}>
                {person.name} {person.phone}
                <button onClick={() => handleDelete(person.id)}>Delete</button>
            </p>
            )}
        </div>
    )
  }

  export default PersonsList