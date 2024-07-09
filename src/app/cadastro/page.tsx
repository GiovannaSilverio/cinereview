'use client'
import api from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// react hook form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//yup
import { object, string } from "yup"

const schema = object({
    username: string().required("campo de nome obrigatório"),
    email: string().required("campo de email obrigatório"),
    password: string().required("campo de senha obrigatório").min(4, "Sua senha deve ter pelo menos 4 digitos"),
    confirmarSenha: string().required("campo de confirmação obrigatório").min(4, "Sua senha deve ter pelo menos 4 digitos"),
})

export default function Cadastro() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const router = useRouter();

    const onSubmit = async (data: any) => {

        try {
            const response = await api.post("/user/create", data, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log(response.status);
            if (response.status === 201) {
                alert("Usuário cadastrado com sucesso!")
                router.push("/login")
            }

            else {
                alert("Erro ao cadastrar usuário!")
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="bg-black flex items-center justify-center h-full w-full font-jura">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="m-10 bg-gray flex flex-col w-2/5 px-8 py-12 rounded-lg items-center gap-3"
            >
                <Image
                    alt="logo do cinereview"
                    width={215}
                    height={135}
                    src="/img/logo.png"
                />
                <label
                    className="self-start text-white font-heavitas"
                    htmlFor="username"
                >
                    USERNAME
                </label>
                <input
                    {...register("username")}
                    id="username"
                    placeholder="Escolha um username"
                    className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-full py-2 rounded-md text-white self-start"
                    type="text"
                />
                <span className="text-white self-start">{errors?.username?.message}</span>
                <label
                    className="self-start font-heavitas text-white"
                    htmlFor="email"
                >
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
                <label
                    className="self-start font-heavitas text-white"
                    htmlFor="senha"
                >
                    SENHA
                </label>
                <input
                    {...register("password")}
                    id="senha"
                    placeholder="Digite sua senha"
                    className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-full py-2 rounded-md text-white self-start"
                    type="password"
                />
                <label
                    className="self-start text-white font-heavitas"
                    htmlFor="confirmarSenha"
                >
                    CONFIRME SUA SENHA
                </label>
                <span className="text-white self-start">{errors?.password?.message}</span>
                <input
                    {...register("confirmarSenha")}
                    id="confirmarSenha"
                    placeholder="Digite novamente a sua senha"
                    className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-full py-2 rounded-md text-white self-start"
                    type="password"
                />
                <span className="text-white self-start">{errors?.confirmarSenha?.message}</span>

                <div className="flex flex-row self-start text-white w-full justify-between">
                    <p className="self-end">
                        Já possui cadastro?{" "}
                        <span className="text-yellow">
                            <Link href="/login">Faça seu login</Link>
                        </span>
                    </p>
                    <button
                        type="submit"
                        className="bg-red hover:bg-redhover font-heavitas text-white px-5 w-fit py-2 rounded-md">
                        CADASTRAR
                    </button>
                </div>
            </form>
        </div>
    );
}
