"use client"
import Star from "./Star";
import { act, useState } from "react";
import Image from "next/image";
import api from "@/services/api";

interface ModalAvaliarProps{
    onCloseModal: (estado: boolean) => void;
    filme: any
}

const stars=[1,2,3,4,5];

export default function ModalAvaliar({onCloseModal, filme} : ModalAvaliarProps) {
    const [activeIndex,setActiveIndex] = useState<number>();
    const [textoAvaliacao, setTextoAvaliacao] = useState ("");

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
            ...filme,
            movieId: filme.id,
            content: textoAvaliacao,
            rating: activeIndex,
            userId: userId
        }
        console.log(avaliacao);
        
        const response = await api.post("/review/create", avaliacao, config)
        if(response.status === 200)
            handleCloseModal()
        else
            console.log(response);
            
    }

    const handleFavorite = async () => {
        const favorito = {
            ...filme,
            movieId: filme.id,
            userId: userId
        }
        const response = await api.put("/user/add/favorites", favorito, config);
        if(response.status === 200)
            handleCloseModal()
        else
            console.log(response);
    }
    return(
        <div className="absolute z-50 bg-gray rounded-md text-white font-jura px-16 py-11 ">
            <div className="flex justify-end w-full">
                <button onClick={handleCloseModal} className="text-2xl">X</button>
            </div>
            <div className="flex flex-row gap-10">
                <div >
                    <Image 
                        src={`https://image.tmdb.org/t/p/original${filme.poster_path}`}
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
                    <textarea onBlur={(ev) => setTextoAvaliacao(ev.target.value)} className="text-black bg-[#666666] font-bold h-48 rounded-md"></textarea>
                    <div className="flex gap-5">
                        <button onClick={() => handleFavorite()} className="bg-white hover:bg-[#C2C1BF] w-fit text-black font-bold px-8 py-1 rounded-md">Favoritar</button>
                        <button onClick={() => handleSubmit()} className="bg-yellow hover:bg-[#D0A31C] w-fit text-black font-bold px-8 py-1 rounded-md">Salvar</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
