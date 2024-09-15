import React from 'react';
import "../mina.css";

const Mina = ({name, hobbies}) => {

  return (
    <div className = "user">
        <h1>{name}</h1>
        <h2>Minu hobid</h2>
        <ul className='hobbies-list'>
            {hobbies.map((hobby, index) => (
                <li key={index}>{hobby}</li>
            ))}
        </ul>
        
        <form className='contact-form'>
            <label for="email">Email </label>
            <input type="email" name="email" id="email" placeholder='Sisesta oma email..' />

            <label for="message">Sõnum </label>
            <textarea name="message" id="message" placeholder='Sisesta oma sõnum...'></textarea>

            <button type='submit'>Saada</button>
        </form>
    </div>
  )
}

export default Mina
