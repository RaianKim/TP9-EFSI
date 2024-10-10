"use client"; // Marca este archivo como un Client Component
import styles from "./page.module.css";
import { useState,useContext } from "react";
import { useRouter } from "next/navigation"; // Usar useRouter para redirigir después del login
import { TokenContext } from "../context/TokenContext";

export default function Login() {
  const { saveToken } = useContext(TokenContext);
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const router = useRouter();

  const login = async () => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/user/login", {
      username: user,
      password: pass,
      /*const res = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Enviar el email con el nombre "username" en el body de la solicitud
      body: JSON.stringify({ username: email, password }),
    });*/
    });
  };

  const handleLogin = async (e) => {
    try {
      const response = await login();
      saveToken(response.data.token);
      router.push("/");
    } catch (error) {
      console.log(error);
    }

    const data = await res.json(); // Procesa la respuesta como JSON

    if (res.ok && data.success) {
      // Guarda el token en localStorage
      localStorage.setItem("token", data.token);
      // Redirige a la página principal después del login
      router.push("/");
    } else {
      alert("Error al iniciar sesión: " + data.message);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUser(e.target.value)}
          required
          className={styles["login-container"]}
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPass  (e.target.value)}
          required
          className={styles["login-container"]}
        />
        <button className={styles["login-container"]} type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
}
