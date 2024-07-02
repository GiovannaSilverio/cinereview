import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Cadastro() {
    return (
        <div className="bg-black flex items-center justify-center h-screen w-screen font-jura">
            <section className=" bg-gray flex flex-col w-2/5 px-8 py-12 rounded-lg items-center gap-3">
            <Image alt="logo do cinereview" width={215} height={135} src="/img/logo.png" />
                <label className="self-start text-white font-heavitas" htmlFor="username">USERNAME</label>
                <input
                    id="username"
                    placeholder="Escolha um username"
                    className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-full py-2 rounded-md text-white self-start"
                    type="text"
                />
                <label className="self-start font-heavitas text-white" htmlFor="email">E-MAIL</label>
                <input
                    id="email"
                    placeholder="Digite seu e-mail"
                    className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-full py-2 rounded-md text-white self-start"
                    type="email"
                />
                <label className="self-start font-heavitas text-white" htmlFor="senha">SENHA</label>
                <input
                    id="senha"
                    placeholder="Digite sua senha"
                    className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-full py-2 rounded-md text-white self-start"
                    type="password"
                />
                <label className="self-start text-white font-heavitas" htmlFor="confirmarSenha">CONFIRME SUA SENHA</label>
                <input
                    id="confirmarSenha"
                    placeholder="Digite novamente a sua senha"
                    className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-full py-2 rounded-md text-white self-start"
                    type="password"
                />
                <div className="flex flex-row self-start text-white w-full justify-between">
                    <p className="self-end">Já possui cadastro? <span className="text-yellow"><Link href="/login">Faça seu login</Link></span></p>
                    <button className="bg-red hover:bg-redhover font-heavitas text-white px-5 w-fit py-2 rounded-md">CADASTRAR</button>
                </div>
            </section>
        </div>
    );
}
