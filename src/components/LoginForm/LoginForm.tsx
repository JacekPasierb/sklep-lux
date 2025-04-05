import {useState} from "react";
import styles from "./LoginForm.module.css";
import {loginUser} from "../../services/authAPI";
import { useUser } from "../../hooks/useUser";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useUser();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await loginUser(email, password);
      await mutate();
    } catch (err: any) {
      console.error("Nie można zalogować", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">
          {isLoading ? "Logowanie..." : "Zaloguj"}
        </button>
      </form>
    </div>
  );
}
