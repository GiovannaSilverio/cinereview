"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Avaliacao from "@/components/Avaliacao";

import api from "@/services/api";
import { useRouter } from "next/navigation";


export default function AtualizarSenha() {
    const router = useRouter();
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userId = window.localStorage.getItem('userId');
        const accessToken = window.localStorage.getItem('accessToken');
        const config = {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        }

        try {
            const response = await api.put("/user/update-password/" + userId, {
                userId: userId,
                currentPassword: senhaAtual,
                newPassword: novaSenha
            }, config);

            if (response.status === 200) {
                console.log("Senha atualizada com sucesso");
                alert("Senha atualizada com sucesso")
                router.push("/perfil");
            }
        } catch (error) {
            alert("Erro ao atualizar a senha!")
            console.error("Erro ao atualizar a senha:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="bg-black flex flex-col items-center py-28 gap-12">
                <section className="text-white flex flex-col justify-center items-center font-jura gap-10">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input

                            type="password"
                            placeholder="Senha Atual"
                            value={senhaAtual}
                            onChange={(e) => setSenhaAtual(e.target.value)}
                            className="p-2 rounded text-black"
                        />
                        <input
                            type="password"
                            placeholder="Nova Senha"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            className="p-2 rounded text-black"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Atualizar Senha
                        </button>
                    </form>
                    <button
                        onClick={() => router.push("/perfil")}
                        className="p-2 bg-green-500 rounded hover:bg-green-700"
                    >
                        Ir para Perfil
                    </button>
                </section>
            </div>
            <Footer />
        </>
    );
}
