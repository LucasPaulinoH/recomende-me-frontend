import { useRef, useState } from "react";
import { PAGE_CONTAINER } from "../../styles/shared";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../utils/firebaseConfig";

// TODO: refactor completely
const Login = () => {
  localStorage.clear();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);

  const [loginMode, setLoginMode] = useState(true);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    try {
      await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error) {
      alert("Erro no login: " + error);
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !passwordConfirmationRef.current
    )
      return;

    try {
      const registerResponse = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        emailRef.current.value,
        passwordRef.current.value
      );
      if (registerResponse) alert("Account successfully created!");
    } catch (error) {
      alert("Registration failed: " + error);
    }
  };

  return (
    <div className={PAGE_CONTAINER}>
      <div className="flex flex-col gap-10">
        <input
          type="text"
          required
          className="border"
          placeholder="Email *"
          ref={emailRef}
        />
        <input
          type="password"
          required
          className="border"
          placeholder="Senha *"
          ref={passwordRef}
        />
        {!loginMode && (
          <input
            type="password"
            required
            className="border"
            placeholder="Confirme a senha *"
            ref={passwordConfirmationRef}
          />
        )}

        <button
          className="cursor-pointer"
          type="submit"
          onClick={loginMode ? handleLogin : handleRegister}
        >
          {loginMode ? "Logar-se" : "Confirmar cadastro"}
        </button>
      </div>

      {loginMode && (
        <button className="cursor-pointer" onClick={() => setLoginMode(false)}>
          Registrar-se
        </button>
      )}

      {!loginMode && (
        <button className="cursor-pointer" onClick={() => setLoginMode(true)}>
          Cancelar
        </button>
      )}
    </div>
  );
};

export default Login;
