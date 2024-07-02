import React from "react";
import Image from "next/image";
import Star from "./Star";

export default function Avaliacao() {
    return(
        <div className="bg-gray rounded-md flex flex-row px-20 py-10 gap-10 h-fit w-3/4">
            <Image src="/img/filme.png" alt="filme avaliado" height={255} width={172}/>
            <div className="font-jura">
                <h3 className="text-yellow">Titulo</h3>
                <Star isActive/>
                <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae itaque dolorem sit delectus molestiae quo, architecto natus sint ipsum distinctio magnam. Porro officia quod, architecto provident totam corrupti quibusdam! Recusandae.</p>
            </div>
        </div>
    );
};
