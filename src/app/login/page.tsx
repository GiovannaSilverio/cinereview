import React from "react";
import Image from "next/image";
import Link from "next/link"

export default function Login() {
    return(
        <div className="bg-black flex items-center justify-center font-jura h-screen w-screen">
            <section className=" bg-gray flex flex-col w-2/5 px-8 py-12 rounded-lg items-center gap-3">
                <Image alt="logo do cinereview" width={215} height={135} src="/img/logo.png"/>
                <label className="self-start font-heavitas text-white" htmlFor="">E-MAIL</label>
                <input placeholder="Digite seu e-mail" className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-full py-2 rounded-md text-white self-start" type="email" />
                <label className="self-start font-heavitas text-white" htmlFor="">SENHA</label>
                <input placeholder="Digite sua senha" className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-full py-2 rounded-md text-white self-start" type="password" />
                <div className="flex flex-row self-start w-full justify-between">
                    <p className="self-end text-white">Não possui login? <span className="text-yellow">
                    <Link href="/cadastro">Cadastre-se</Link></span></p>
                    <button 
                    className="bg-red hover:bg-redhover bg-red2 font-heavitas text-white px-5 w-fit py-2 rounded-md">ENTRAR</button>
                </div>
            </section>                    
    </div>
    );
};
