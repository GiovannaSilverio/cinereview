"use client"
import React, { useEffect, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import api from "@/services/api";
import { useRouter } from "next/navigation";


export default function AtualizarEmail() {
    const router = useRouter();
    const [emailAtual, setEmailAtual] = useState("");
    const [novoEmail, setNovoEmail] = useState("");


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
            const response = await api.put("/user/update-email/" + userId, {
                userId: userId,
                currentEmail: emailAtual,
                newEmail: novoEmail
            }, config);

            if (response.status === 200) {
                console.log("Email atualizado com sucesso");
                alert("Email atualizado com sucesso")
                router.push("/perfil");
            }
        } catch (error) {
            alert("Erro ao atualizar o email!")
            console.error("Erro ao atualizar o email:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="bg-black flex flex-col items-center py-28 gap-12">
                <section className="text-white flex flex-col justify-center items-center font-jura gap-10">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Email Atual"
                            value={emailAtual}
                            onChange={(e) => setEmailAtual(e.target.value)}
                            className="p-2 rounded text-black"
                        />
                        <input
                            type="email"
                            placeholder="Novo Email"
                            value={novoEmail}
                            onChange={(e) => setNovoEmail(e.target.value)}
                            className="p-2 rounded text-black"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Atualizar Email
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
