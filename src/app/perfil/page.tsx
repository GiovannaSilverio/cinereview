"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Avaliacao from "@/components/Avaliacao";

import api from "@/services/api";
import { useRouter } from "next/navigation";
import ModalAvaliar from "@/components/ModalAvaliar";
import ModalEditar from "@/components/ModalEditar";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface responseUser {
    id: number;
    username: string;
    email: string;
    favoriteMovies: Movie[];
    reviews: [];
}

interface Review {
  id: number;
  content: string;
  rating: number;
  movie: Movie;
}


export default function Perfil() {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [usuario, setUsuario] = useState<responseUser>();
    const [selectedReview, setSelectedReview] = useState<Review>();
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
                    <p className="text-yellow text-3xl">{usuario?.username}</p>
                    <div className="flex gap-24 text-center text-xl">
                        <div>
                            <p>{usuario?.reviews.length}</p>
                            <p>Total de reviews</p>
                        </div>
                    </div>
                </section>
                <section className="bg-gray w-3/4 h-fit py-5 flex flex-col items-center rounded-md">
                    <h3 className="text-white text-2xl font-bold font-jura">Favoritos</h3>
                    <div className="flex gap-20 my-4">
                        {usuario?.favoriteMovies.map((movie, index) => {
                            return (
                                <Image
                                    key={index}
                                    className="object-cover rounded-md hover:scale-105"
                                    alt="poster de filme"
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    width={238}
                                    height={350}
                                    
                                />
                            );
                        })}
                    </div>
                </section>
                <section className="flex flex-col justify-center gap-5 w-3/4 items-center">
                    {usuario?.reviews.map((review, index) => (
                       <Avaliacao onOpenModal={(estado, review) => { setOpenModal(estado); setSelectedReview(review); }} key={index} review={review} />
                    ))}
                    {openModal && selectedReview && <ModalEditar modalIsOpen={openModal} onCloseModal={setOpenModal} review={selectedReview}/>}
                </section>
            </div>
            <Footer />
        </>
    );
}
