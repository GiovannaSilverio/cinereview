"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Header() {
    const [telaAtiva, setTelaAtiva] = useState("home");
    const router = useRouter();

    const logout = () => {
        router.push("/login")
        window.localStorage.removeItem("accessToken")
        window.localStorage.removeItem("userId")
    }

    return(
        <header className="flex bg-gray px-16 py-5 items-center font-jura font-bold text-white justify-between">
            <Image height={24} width={215} alt="logo cine review" src="/img/logoheader.png"/>
            <div className="flex text-xl gap-28">
                <Link 
                    className={`${ telaAtiva === "home" ? "text-yellow" : "text-white" }`} 
                    href="/home" 
                    onClick={() => setTelaAtiva("home")}
                >
                    Home
                </Link>
                <Link 
                    className={`${ telaAtiva === "perfil" ? "text-yellow" : "text-white" }`}
                    href="/perfil" onClick={()=> setTelaAtiva("perfil")}>Perfil</Link>
                <Link 
                    className={`${ telaAtiva === "sair" ? "text-yellow" : "text-white" }`} 
                    href="/login" 
                    onClick={() => {logout(); setTelaAtiva("sair")}}
                >
                    Sair
                </Link>
            </div>
        </header>
    );
};
