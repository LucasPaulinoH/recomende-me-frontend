import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UNLOGGED_CONTAINER } from "@/styles/shared";
import { useRef } from "react";
import { handleRegister } from "./functions";
import { BackButtonContainer } from "@/components/BackButton";

const Register = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  return (
    <div className={UNLOGGED_CONTAINER}>
      <BackButtonContainer />
      <form
        onSubmit={(e) =>
          handleRegister(
            e,
            usernameRef!.current!.value,
            emailRef!.current!.value,
            passwordRef!.current!.value
          )
        }
        className="max-w-[400px] w-full flex flex-col gap-8 p-10"
      >
        <h1 className="font-bold self-center text-xl">
          Preencha os campos de cadastro
        </h1>
        <div className="flex flex-col gap-6">
          <Input
            type="text"
            required
            placeholder="Nome de usuário *"
            ref={usernameRef}
          />
          <Input type="text" required placeholder="Email *" ref={emailRef} />
          <Input
            type="password"
            required
            placeholder="Senha *"
            ref={passwordRef}
          />
          <Input
            type="password"
            required
            placeholder="Confirme a senha *"
            ref={confirmPasswordRef}
          />

          <Button className="cursor-pointer" type="submit">
            Registrar-se
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
