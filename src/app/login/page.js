"use client"; // Marca este archivo como un Client Component
import styles from "./page.module.css";
import { useState,useContext } from "react";
import { useRouter } from "next/navigation"; // Usar useRouter para redirigir después del login
import { TokenContext } from "../context/TokenContext";
import axios from "axios";

export default function Login() {
  const { saveToken } = useContext(TokenContext);
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const router = useRouter();

  const login = async () => {

    const res = await axios.post ("/api/user/login", {
      username: user,
      password: pass,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await login();
      saveToken(response.data.token);
      router.push("/");
    } catch (error) {
      console.log(error);
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
