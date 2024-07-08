import React from "react";
import Image from "next/image";
import Star from "./Star";
import { number } from "yup";
import api from "@/services/api";

const stars = [1, 2, 3, 4, 5];

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

interface Review {
    id: number;
    rating : number;
    content: string;
    movie: Movie;
}

interface AvaliacaoProps {
    review: Review;
}

export default function Avaliacao({review} : AvaliacaoProps) {
    const userId = window.localStorage.getItem("userId");
    const accessToken = window.localStorage.getItem("accessToken");
    const config = {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    };

    const handleDelete = async () => {
        if(window.confirm("Deseja excluir a avaliação?")){
          const response = await api.delete(`/review/delete/${userId}/${review.id}`, config);
          if(response.status === 200){
            window.alert("Excluido com sucesso");
          }
        }
    };

    
    return (
        <div className="bg-gray rounded-md flex flex-col px-20 py-10 gap-10 h-fit w-full">
            <div className="flex justify-end gap-4 ">
                <button>
                    <Image src="/img/edit.png" width={30} height={30} alt="botao de edição de avaliacao"/>
                </button>
                <button
                    onClick={handleDelete}
                >
                    <Image src="/img/delete.png" width={30} height={30} alt="botao de exclusao de avaliacao"/>
                </button>
            </div>
            <div className="flex flex-row px-20 py-10 gap-10 h-fit w-3/4">
                <Image
                    className="rounded-md"
                    src={`https://image.tmdb.org/t/p/original${review.movie.poster_path}`}
                    alt="filme avaliado"
                    height={255}
                    width={172}
                />
                <div className="font-jura flex flex-col gap-4">
                    <h3 className="text-yellow text-xl font-bold">{review.movie.title}</h3>
                    <div className="flex ">
                        {stars.map((star, index) => {
                            return index < review.rating ? <Star key={star} isActive /> : <Star key={star}/>;
                        })}
                    </div>
                    <p className="text-white">
                        {review.content}
                    </p>
                </div>
            </div>
        </div>
    );
}
