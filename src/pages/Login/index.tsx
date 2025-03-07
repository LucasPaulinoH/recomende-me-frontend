import { useRef } from "react";
import { UNLOGGED_CONTAINER } from "../../styles/shared";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleLogin } from "./functions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className={UNLOGGED_CONTAINER}>
      <form
        onSubmit={(e) =>
          handleLogin(e, emailRef!.current!.value, passwordRef!.current!.value).then(() => navigate("/"))
        }
        className="max-w-[400px] w-full flex flex-col gap-8 p-10"
      >
        <h1 className="font-bold self-center text-xl">RecomendeMe</h1>
        <div className="flex flex-col gap-6">
          <Input type="text" required placeholder="Email *" ref={emailRef} />
          <Input
            type="password"
            required
            placeholder="Senha *"
            ref={passwordRef}
          />

          <Button type="submit" className="cursor-pointer">
            Entrar
          </Button>
        </div>

        <p className="self-center">
          Não possui conta?
          <Button
            className="cursor-pointer p-0 pl-1"
            variant="link"
            onClick={() => navigate("/register")}
          >
            Registrar-se
          </Button>
        </p>
      </form>
    </div>
  );
};

export default Login;
