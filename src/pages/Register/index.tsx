import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UNLOGGED_CONTAINER_STYLES } from "@/styles/shared";
import { useRef } from "react";
import { handleRegister } from "./functions";
import { BackButtonContainer } from "@/components/BackButton";
import { registerSchema } from "@/validation/loginAndRegisterSchemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";

const Register = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className={UNLOGGED_CONTAINER_STYLES}>
      <BackButtonContainer />
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(() =>
            handleRegister(
              usernameRef!.current!.value,
              emailRef!.current!.value,
              passwordRef!.current!.value
            )
          )}
          className="max-w-[400px] w-full flex flex-col gap-8 p-10"
        >
          <h1 className="font-bold self-center text-xl">
            Preencha os campos de cadastro
          </h1>
          <div className="flex flex-col gap-6">
            <FormInput
              control={registerForm.control}
              name="username"
              label="Nome de usuário *"
            >
              {(field) => <Input {...field} ref={usernameRef} />}
            </FormInput>

            <FormInput
              control={registerForm.control}
              name="email"
              label="Email *"
            >
              {(field) => <Input {...field} ref={emailRef} />}
            </FormInput>

            <FormInput
              control={registerForm.control}
              name="password"
              label="Senha *"
            >
              {(field) => (
                <Input {...field} type="password" ref={passwordRef} />
              )}
            </FormInput>

            <FormInput
              control={registerForm.control}
              name="confirmPassword"
              label="Confirme sua senha *"
            >
              {(field) => (
                <Input {...field} type="password" ref={confirmPasswordRef} />
              )}
            </FormInput>

            <Button className="cursor-pointer" type="submit">
              Registrar-se
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;
