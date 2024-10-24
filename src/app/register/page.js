"use client"; // Marca este archivo como un Client Component
import styles from './page.module.css';
import { useState } from 'react';
import { usePathname } from 'next/navigation'; // Usa usePathname para obtener la ruta actual

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, username: email, password }),
      });
  
      const contentType = res.headers.get('content-type');
      let data;
  
      // Verifica si la respuesta es JSON
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Response not JSON: ${text}`);
      }
  
      if (res.ok) {
        // Guardar token en localStorage
        localStorage.setItem('token', data.token);
        // Redirigir al usuario a la página principal
        window.location.href = '/'; // Redirección manual
      } else {
        alert('Error al registrarse: ' + data.message);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro: ' + error.message); // Muestra el mensaje de error
    }
  };
  return (
    <div className={styles.registerConteiner}>
      <h1>Registrarse</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className={styles.registerFontFamily}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className={styles.registerFontFamily}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.registerFontFamily}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.registerFontFamily}
        />
        <button className={styles.registerFontFamily} type="submit">Registrarse</button>
      </form>
    </div>
  );
}
