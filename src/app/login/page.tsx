"use client";
import React from "react";
import api from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// react hook form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// yup
import { object, string } from "yup";

const schema = object({
  email: string().required("campo de email obrigatório"),
  password: string()
    .required("campo de senha obrigatório")
    .min(4, "Sua senha deve ter pelo menos 4 digitos"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const router = useRouter();
  // const cookiesStorage = cookies();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post("/user/login", data, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("Login realizado com sucesso!");

        localStorage.setItem('userId', response.data.userId)
        localStorage.setItem('accessToken', response.data.accessToken)
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao realizar login. Verifique suas credenciais e tente novamente.");
    }
  };

  return (
    <div className="bg-black flex items-center justify-center font-jura h-screen w-screen">
      <section className="bg-gray flex flex-col w-2/5 px-8 py-12 rounded-lg items-center gap-3">
        <Image alt="logo do cinereview" width={215} height={135} src="/img/logo.png" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
          <label className="self-start font-heavitas text-white" htmlFor="email">
            E-MAIL
          </label>
          <input
            {...register("email")}
            id="email"
            placeholder="Digite seu e-mail"
            className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-full py-2 rounded-md text-white self-start"
            type="email"
          />
          <span className="text-white self-start">{errors?.email?.message}</span>
          
          <label className="self-start font-heavitas text-white" htmlFor="password">
            SENHA
          </label>
          <input
            {...register("password")}
            id="password"
            placeholder="Digite sua senha"
            className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-full py-2 rounded-md text-white self-start"
            type="password"
          />
          <span className="text-white self-start">{errors?.password?.message}</span>

          <div className="flex flex-row self-start w-full justify-between items-center mt-4">
            <p className="self-end text-white">
              Não possui login?{" "}
              <span className="text-yellow">
                <Link href="/cadastro">Cadastre-se</Link>
              </span>
            </p>
            <button
              type="submit"
              className="bg-red hover:bg-redhover font-heavitas text-white px-5 w-fit py-2 rounded-md"
            >
              ENTRAR
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
