import { useRef, useState } from "react";
import { PAGE_CONTAINER } from "../../styles/shared";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../utils/firebaseConfig";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// TODO: refactor completely
const Login = () => {
  localStorage.clear();

  const usernameRef = useRef<HTMLInputElement>(null);
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

      await updateProfile(registerResponse.user, {
        displayName: usernameRef?.current?.value,
      });

      alert("Account successfully created!");
    } catch (error) {
      alert("Registration failed: " + error);
    }
  };

  return (
    <div className={PAGE_CONTAINER}>
      <div className="flex flex-col gap-10">
        {!loginMode && (
          <Input
            type="text"
            required
            placeholder="Nome de usuário *"
            ref={usernameRef}
          />
        )}
        
        <Input type="text" required placeholder="Email *" ref={emailRef} />
        <Input
          type="password"
          required
          placeholder="Senha *"
          ref={passwordRef}
        />
        {!loginMode && (
          <Input
            type="password"
            required
            placeholder="Confirme a senha *"
            ref={passwordConfirmationRef}
          />
        )}

        <Button
          className="cursor-pointer"
          type="submit"
          onClick={loginMode ? handleLogin : handleRegister}
          color="#000"
        >
          {loginMode ? "Logar-se" : "Confirmar cadastro"}
        </Button>
      </div>

      {loginMode && (
        <Button
          className="cursor-pointer"
          onClick={() => setLoginMode(false)}
          variant="link"
        >
          Registrar-se
        </Button>
      )}

      {!loginMode && (
        <Button
          className="cursor-pointer"
          onClick={() => setLoginMode(true)}
          variant="link"
        >
          Cancelar
        </Button>
      )}
    </div>
  );
};

export default Login;
