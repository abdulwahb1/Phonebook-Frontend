// new form
const Form = ({ newName, phone, handleNewName, handlePhone, formAction }) => {
  return (
    <form onSubmit={formAction}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        phone: <input value={phone} onChange={handlePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

  export default Form 
 