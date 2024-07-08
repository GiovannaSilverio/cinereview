import React from "react";
import Image from "next/image";
import Star from "./Star";
import { number } from "yup";

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
    rating : number;
    content: string;
    movie: Movie;
}

interface AvaliacaoProps {
    review: Review;
}

export default function Avaliacao({review} : AvaliacaoProps) {
    return (
        <div className="bg-gray rounded-md flex flex-row px-20 py-10 gap-10 h-fit w-3/4">
            <Image
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
    );
}
