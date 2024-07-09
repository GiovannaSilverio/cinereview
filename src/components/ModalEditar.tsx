"use client"
import Star from "./Star";
import { act, useEffect, useState } from "react";
import Image from "next/image";
import api from "@/services/api";

interface ModalAvaliarProps{
    onCloseModal: (estado: boolean) => void;
    review: Review
    modalIsOpen: boolean
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

interface ResponseUser {
    id: number;
    username: string;
    email: string;
    movies: Movie[];
    reviews: [];
}

interface Review {
    id: number;
    content: string;
    rating: number;
    movie: Movie;
    date?: Date;
}

const stars=[1,2,3,4,5];

export default function ModalEditar({modalIsOpen, onCloseModal, review} : ModalAvaliarProps) {
    const [activeIndex,setActiveIndex] = useState<number>();
    const [textoAvaliacao, setTextoAvaliacao] = useState(review?.content || "");

    const [usuario, setUsuario] = useState<ResponseUser>();

    const userId = window.localStorage.getItem('userId')
    const accessToken = window.localStorage.getItem('accessToken')


    const config = {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    };
    
    const handleCloseModal = () => {
        onCloseModal(false)
    }

    const onClickStar = ( star : number) =>{
        setActiveIndex(star);

    }

    //mandando dados para o backend
    const handleSubmit = async () => {
        const avaliacao = {
            ...review,
            movieId: review.id,
            content: textoAvaliacao,
            rating: activeIndex,
            userId: userId
        }
        console.log(avaliacao);
        
        const response = await api.put(`/review/update-review/${userId}/${review.id}`, avaliacao, config)
        if(response.status === 200)
            handleCloseModal()
        else
            console.log(response);
    }

    useEffect(()=>{
        async function getUser() {
            const response = await api.get("/user/" + userId, config);
            
            const data = response.data as any;
            console.log("Data:", data);
            setUsuario(data);

        }
        getUser();
    }, []);


    // const handleFavorite = async () => {
    //     const favorito = {
    //         ...filme,
    //         movieId: filme.id,
    //         userId: userId
    //     }
        
    //     const response = await api.put("/user/add/favorites", favorito, config);
    //     if(response.status === 200)
    //         handleCloseModal()
    //     else
    //         console.log(response);
    // }

    return(
        <div className={`${modalIsOpen ? "block" : "hidden"} absolute z-50 bg-gray rounded-md text-white font-jura px-16 py-11 `}>
            <div className="flex justify-end w-full">
                <button onClick={handleCloseModal} className="text-2xl">X</button>
            </div>
            <div className="flex flex-row gap-10">
                <div >
                    <Image 
                        src={`https://image.tmdb.org/t/p/original${review?.movie.poster_path}`}
                        width={300}
                        height={450}
                        alt="filme avaliado"
                        className="rounded-md"
                    />
                </div>
                <div className="flex gap-3 flex-col">
                    <h3>O que você achou desse filme?</h3>
                    <div className="flex gap-3 ">
                        {stars.map((star) => {
                            return <Star onClick={()=> onClickStar(star)} key={star} isActive = {star <= activeIndex!} />;
                        })}
                    </div>
                    <h3>Deixe um comentário sobre a obra:</h3>
                    <textarea placeholder={review?.content} onBlur={(ev) => setTextoAvaliacao(ev.target.value)} className="text-black bg-[#666666] font-bold h-48 rounded-md"></textarea>
                    <div className="flex gap-5">
                        <button className="bg-white hover:bg-[#C2C1BF] w-fit text-black font-bold px-8 py-1 rounded-md">Favoritar</button>
                        <button onClick={handleSubmit} className="bg-yellow hover:bg-[#D0A31C] w-fit text-black font-bold px-8 py-1 rounded-md">Salvar</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
