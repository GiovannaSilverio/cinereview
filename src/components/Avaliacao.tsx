import React from "react";
import Image from "next/image";
import Star from "./Star";
import { number } from "yup";

const stars = [1, 2, 3, 4, 5];

export default function Avaliacao() {
    return (
        <div className="bg-gray rounded-md flex flex-row px-20 py-10 gap-10 h-fit w-3/4">
            <Image
                src="/img/filme.png"
                alt="filme avaliado"
                height={255}
                width={172}
            />
            <div className="font-jura flex flex-col gap-4">
                <h3 className="text-yellow text-xl font-bold">Titulo</h3>
                <div className="flex ">
                    {stars.map((star) => {
                        return <Star key={star} isActive />;
                    })}
                </div>
                <p className="text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Beatae itaque dolorem sit delectus molestiae quo, architecto
                    natus sint ipsum distinctio magnam. Porro officia quod,
                    architecto provident totam corrupti quibusdam! Recusandae.
                </p>
            </div>
        </div>
    );
}
