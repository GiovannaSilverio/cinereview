// esse componente precisa ser server side porque precisa ler o cookie de autenticação e fazer a requisição para o backend
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Avaliacao from "@/components/Avaliacao";

import api from "@/services/api";
import { useRouter } from "next/navigation";

interface responseUser {
    id: number;
    username: string;
    email: string;
    favoriteMovies: [];
    reviews: [];
}

export default function Perfil() {
    const router = useRouter();

    const [usuario, setUsuario] = useState<responseUser>();
    const userId = window.localStorage.getItem("userId");
    const accessToken = window.localStorage.getItem("accessToken");

    useEffect(() => {

        if (!accessToken || !userId) {
            console.error("Usuário não autenticado");
            router.push("/login");
        }

        const config = {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        };
        async function getMovies() {
            try {
                const response = await api.get("/user/" + userId, config);

                const data = response.data as any;
                console.log("Data:", data);
                setUsuario(data);

                if (response.status === 403 || response.status === 401) {
                    console.error("Usuário não autenticado");
                    router.push("/login");
                }
            } catch (error: any) {
                if (
                    error.response &&
                    (error.response.status === 403 ||
                        error.response.status === 401)
                ) {
                    console.error("Usuário não autenticado");
                    router.push("/login");
                } else {
                    console.error("Erro na requisição:", error);
                }
            }
        }

        getMovies();
    }, []);


    return (
        <>
            <Header />

            <div className="bg-black flex flex-col items-center py-28 gap-12">
                <section className="text-white flex flex-col justify-center items-center font-jura gap-10">
                    <Image
                        className="rounded-full"
                        src="/img/dwight.jpg"
                        alt="foto de perfil"
                        width={237}
                        height={237}
                    />
                    <p className="text-yellow text-3xl">USERNAME</p>
                    <div className="flex gap-24 text-center text-xl">
                        <div>
                            <p>10</p>
                            <p>Total</p>
                        </div>
                        <div>
                            <p>3</p>
                            <p>Esse mês</p>
                        </div>
                    </div>
                </section>
                <section className="bg-gray w-3/4 h-fit py-5 flex flex-col items-center rounded-md">
                    <h3 className="text-white text-2xl font-jura">Favoritos</h3>
                </section>
                <section className="flex flex-col justify-center gap-5 w-3/4 items-center">
                    {usuario?.reviews.map((review, index) => (
                        <Avaliacao key={index} review={review} />
                    ))}
                </section>
            </div>
            <Footer />
        </>
    );
}
