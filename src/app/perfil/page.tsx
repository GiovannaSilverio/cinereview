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
import { Review, ResponseUser } from "@/interfaces/interface";

export default function Perfil() {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [usuario, setUsuario] = useState<ResponseUser>();
    const [selectedReview, setSelectedReview] = useState<Review>();
    const userId = window.localStorage.getItem("userId");

    useEffect(() => {
        const accessToken = window.localStorage.getItem("accessToken");

        if (!accessToken || !userId) {
            console.error("Usuário não autenticado");
            router.push("/login");
            return;
        }

        const config = {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        };

        async function getUser() {
            try {
                const response = await api.get("/user/" + userId, config);
                const data = response.data as any;
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

        getUser();
    }, [router]);

    function getReviewsOnMonth() {
        const reviews = usuario?.reviews;
        const date = new Date();
        const month = date.getMonth();
        let reviewsOnMonth = 0;

        reviews?.forEach((review: Review) => {
            const reviewDate = new Date(review.date);
            if (reviewDate.getMonth() === month) {
                reviewsOnMonth++;
            }
        });

        return reviewsOnMonth;
    }
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
                            <p>Total</p>
                        </div>
                        <div>
                            <p>{getReviewsOnMonth()}</p>
                            <p>Esse mês</p>
                        </div>
                    </div>
                    <div className="flex gap-10">
                        <button
                            onClick={() => router.push("/atualizar-email")}
                            className="bg-red hover:bg-redhover text-white px-4 py-2 rounded"
                        >
                            Atualizar Email
                        </button>

                        <button
                            onClick={() => router.push("/atualizar-senha")}
                            className="bg-red hover:bg-redhover text-white px-4 py-2 rounded"
                        >
                            Atualizar Senha
                        </button>
                    </div>
                </section>
                <section className="bg-gray w-3/4 h-fit py-5 flex flex-col items-center rounded-md">
                    <h3 className="text-white text-2xl font-bold font-jura">
                        Favoritos
                    </h3>
                    <div className="flex gap-20 my-4">
                        {usuario?.favoriteMovies.map((movie, index) => {
                            return (
                                <Image
                                    key={index}
                                    className="object-cover rounded-md"
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
                        <Avaliacao
                            onOpenModal={(estado, review) => {
                                setOpenModal(estado);
                                setSelectedReview(review);
                            }}
                            key={index}
                            review={review}
                        />
                    ))}
                    {openModal && selectedReview && (
                        <ModalEditar
                            modalIsOpen={openModal}
                            onCloseModal={setOpenModal}
                            review={selectedReview}
                        />
                    )}
                </section>
            </div>
            <section className="flex flex-col items-center gap-4"></section>
            <Footer />
        </>
    );
}
