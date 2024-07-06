"use client"
import Star from "./Star";
import { act, useState } from "react";

interface ModalAvaliarProps{
    onCloseModal: (estado: boolean) => void;
}

const stars=[1,2,3,4,5];

export default function ModalAvaliar({onCloseModal} : ModalAvaliarProps) {
    const [activeIndex,setActiveIndex] = useState<number>();
    const handleCloseModal = () => {
        onCloseModal(false)
      }
    const onClickStar = ( star : number) =>{
        setActiveIndex(star);

    }
    return(
        <div className="absolute bg-gray rounded-md text-white font-jura px-16 py-11 ">
            <div className="flex justify-end w-full">
                <button onClick={handleCloseModal} className="text-2xl">X</button>
            </div>
            <div className="flex flex-row">
                <div></div>
                <div className="flex gap-3 flex-col">
                    <h3>O que você achou desse filme?</h3>
                    <div className="flex gap-3 ">
                        {stars.map((star) => {
                            return <Star onClick={()=> onClickStar(star)} key={star} isActive = {star <= activeIndex!} />;
                        })}
                    </div>
                    <h3>Deixe um comentário sobre a obra:</h3>
                    <textarea className="text-black bg-[#666666] font-bold h-48 rounded-md"></textarea>
                    <div className="flex gap-5">
                        <button className="bg-white hover:bg-[#C2C1BF] w-fit text-black font-bold px-8 py-1 rounded-md">Favoritar</button>
                        <button className="bg-yellow hover:bg-[#D0A31C] w-fit text-black font-bold px-8 py-1 rounded-md">Salvar</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
