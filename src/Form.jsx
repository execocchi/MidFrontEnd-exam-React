import { useState } from 'react';
import Card from './Card';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [isError, setIsError] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const handleChange = (setState) => (e) => setState(e.target.value);

  let formIsValid = false;
  if (name && email && age) {
    formIsValid = true;
  }

  const invalidName = name.trim() === '' || name.length < 3;
  const invalidEmail = !email.includes('@') || email.length < 6;
  const invalidAge = age <= 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (invalidName || invalidEmail || invalidAge) {
      setIsError(true);
      return;
    }

    if (!invalidAge && !invalidEmail && !invalidName) {
      setShowUser(true);
    }

    setIsError(false);
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: '1rem' }}>
            <label htmlFor='name'>Name</label>
            <input
              required
              onChange={handleChange(setName)}
              id='name'
              placeholder='Insert name'
              value={name}
            ></input>
          </div>
          <div style={{ margin: '1rem' }}>
            <label htmlFor='email'>Email</label>
            <input
              required
              onChange={handleChange(setEmail)}
              id='email'
              placeholder='Insert email'
              value={email}
            ></input>
          </div>
          <div style={{ margin: '1rem' }}>
            <label htmlFor='age'>Age</label>
            <input
              required
              onChange={handleChange(setAge)}
              id='age'
              placeholder='Insert your age'
              value={age}
            ></input>
          </div>
          <div>
            <button
              style={{ marginTop: '1rem' }}
              type='submit'
              disabled={!formIsValid}
            >
              Submit
            </button>
          </div>
        </form>
        {isError && (
          <Card>
            <ul style={{ color: 'red' }}>
              <li>Name must be at least 3 characters</li>
              <li>Email must be at least 6 characters long</li>
              <li>You must insert a valid age {'>'} 0</li>
            </ul>
            <div style={{ fontWeight: 'bolder' }}>
              Please check the information is correct
            </div>
          </Card>
        )}
      </section>
      {showUser && formIsValid && !isError && (
        <Card>
          <div>{name}</div>
          <div>{email}</div>
          <div>{age}</div>
        </Card>
      )}
    </>
  );
};

export default Form;
