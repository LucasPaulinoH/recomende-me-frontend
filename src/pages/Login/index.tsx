import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleLogin } from "./functions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/loginAndRegisterSchemas";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import { UNLOGGED_CONTAINER_STYLES } from "@/styles/shared";

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={UNLOGGED_CONTAINER_STYLES}>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(() =>
            handleLogin(
              emailRef!.current!.value,
              passwordRef!.current!.value
            ).then(() => navigate("/"))
          )}
          className="max-w-[400px] w-full flex flex-col gap-8 p-10"
        >
          <h1 className="font-bold self-center text-xl">RecomendeMe</h1>
          <div className="flex flex-col gap-6">
            <FormInput control={loginForm.control} name="email" label="Email *">
              {(field) => <Input {...field} ref={emailRef} />}
            </FormInput>

            <FormInput
              control={loginForm.control}
              name="password"
              label="Senha *"
            >
              {(field) => (
                <Input {...field} type="password" ref={passwordRef} />
              )}
            </FormInput>

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
      </Form>
    </div>
  );
};

export default Login;
