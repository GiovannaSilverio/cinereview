"use client";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/api";
import Image from "next/image";
// import { cookies } from "next/headers";
import ModalAvaliar from "@/components/ModalAvaliar";

interface RootObject {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
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

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const router = useRouter();
    // const cookiesStorage = cookies();

    const [openModal, setOpenModal] = useState(false);
    const [hoverFilme, setHoverFilme] = useState(false)
    const [filmeAtual, setFilmeAtual] = useState<Movie>();
    const [indexHoverFilme, setIndexHoverFilme] = useState<number>()
    const [pesquisa, setPesquisa] = useState("");

    const userid = localStorage.getItem("userId");
    const accessToken  = localStorage.getItem("accessToken");


    if (!accessToken || !userid) {
        console.error("Usuário não autenticado");
        router.push("/login");
    }

    const config = {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    };

    useEffect(() => {
        async function getMovies() {
            try {
                const response = await api.get(
                    `/movies/page/1`,
                    config
                );

                const data = response.data as RootObject;
                setMovies(data.results);
                console.log("Data:", data);
            } catch (error: any) {
                if (error.response && error.response.status === 403) {
                    console.error("Usuário não autenticado");
                    router.push("/login");
                } else {
                    console.error("Erro na requisição:", error);
                }
            }
        }

        getMovies();
    }, []);

    // useEffect(() => {
    //     async function searchMovies() {
    //         try {
    //             const response = await api.get(`/search/page/1?query=${pesquisa}`, config)

    //             const data = response.data as RootObject
    //             setMovies(data.results)
    //         } catch (error) {
    //             if (error.response && error.response.status === 403) {
    //                 console.error("Usuário não autenticado");
    //                 router.push("/login");
    //             } else {
    //                 console.error("Erro na requisição:", error);
    //             }
    //         }
    //     }

    //     searchMovies(); 

    // },[pesquisa])

    const listaFiltrada = movies.filter((movie) => {
        return movie.title
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(pesquisa.toLowerCase());
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.target.value;
        
        setPesquisa(newSearch)
    };

    return (
        <>
            <Header />
            <div className="relative">

                <section className="bg-hero-pipoca w-full h-[710px] bg-no-repeat bg-cover flex flex-col justify-center items-center gap-28">
                    <h2 className="text-white text-center font-heavitas text-3xl">
                        Tenha organizado todas as <br />
                        suas resenhas do cinema
                    </h2>
                    <div className=" flex items-center justify-between bg-lightgray px-4 w-1/2 py-2 rounded-md ">
                        <input
                            placeholder="Pesquise seu filme"
                            className="placeholder-black flex-1 bg-lightgray placeholder-opacity-50 text-black focus:border-none focus:outline-none"
                            type="text"
                            onChange={handleInputChange}
                        />
                        <button>
                            <Image
                                src="/img/search.png"
                                alt="lupa"
                                width={25}
                                height={25}
                            />
                        </button>
                    </div>
                </section>
                <section className="bg-black flex flex-col items-center justify-center gap-14 py-14">
                    <h2 className="text-yellow text-3xl font-heavitas">
                        QUE TAL ASSISTIR?
                    </h2>
                    <div className="grid grid-cols-4 gap-20">
                    {listaFiltrada.map((movie, index) => {
                            if (!movie.adult) {
                                return (
                                    <div 
                                        onMouseEnter={() => { setHoverFilme(true); setIndexHoverFilme(index)} } 
                                        onMouseLeave={() => { setHoverFilme(false); setIndexHoverFilme(-1)} } 
                                        onClick={() => {setOpenModal(true); setFilmeAtual(movie)}}
                                        
                                        key={index} 
                                        className="relative hover:scale-110"
                                    >
                                        <div className="rounded-lg flex overflow-hidden justify-center items-center">
                                            <button 
                                                className={`${hoverFilme && indexHoverFilme === index ? "text-yellow" : "text-transparent"} font-bold text-2xl z-20 w-full h-full font-jura text-center inset-0 bg-black opacity-0 hover:opacity-75 transition-opacity absolute break-words`}
                                            >
                                                Adicionar resenha
                                            </button>
                                            <Image
                                                className="object-cover"
                                                alt="poster de filme"
                                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                                width={238}
                                                height={350}
                                            />
                                        </div>
                                        {/* <div className="absolute inset-0 z-10 bg-black opacity-0 hover:opacity-75 transition-opacity"></div> */}
                                    </div>
                                );
                        
                            }
                        })}
                    </div>
                    {openModal && (
                        <ModalAvaliar
                            filme={filmeAtual}
                            onCloseModal={(estado) => setOpenModal(estado)}
                        />
                    )}
                </section>
            </div>

            <Footer />
        </>
    );
}
