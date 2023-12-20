import axios from 'axios'
const baseUrl = import.meta.env.VITE_REACT_URL

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
    .catch(error => {
        console.error('Error deleting person: ', error)
        throw error
    })
}

const updatePhoneNumber = (id, newName, newPhoneNumber) => {
    return axios.put(`${baseUrl}/${id}`, {name: newName, phone: newPhoneNumber})
    .then(response => response.data)
    .catch(error => {
        console.error('Error deleting person: ', error)
        throw error
    })
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, create, update, deletePerson, updatePhoneNumber}

// import axios from 'axios'
// const baseUrl = 'http://localhost:3001/persons'

// const personService = (obj, setPersons, setNewName, setPhone) => {
//     return axios.post(baseUrl, obj)
//       .then(returnedPerson => {
//         setPersons(prevPersons => [...prevPersons, returnedPerson.data]);
//         setNewName('');
//         setPhone('');
//       })
//       .catch(error => {
//         console.error('Error creating person: ', error);
//       });
//   };

// export default personService 