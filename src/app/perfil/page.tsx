import React from "react";
import Image from "next/image";
import Link from "next/link"
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Avaliacao from "@/components/Avaliacao";

export default function Perfil() {
    return(
        <>
            <Header/>
            <div className="bg-black flex flex-col items-center py-28 gap-12">
                <section className="text-white flex flex-col justify-center items-center font-jura gap-10">
                    <Image className="rounded-full" src="/img/dwight.jpg" alt="foto de perfil" width={237} height={237}/>
                    <p className="text-yellow text-3xl">USERNAME</p>
                    <div className="flex gap-24 text-center text-xl">
                        <div>
                            <p>10</p>
                            <p>Total</p>
                        </div>
                        <div>
                            <p>3</p>
                            <p>Esse mês</p>
                        </div>
                    </div>
                </section>
                <section className="bg-gray w-3/4 h-fit py-5 flex flex-col items-center rounded-md">
                    <h3 className="text-white text-2xl font-jura">Favoritos</h3>
                </section>
                <section className="flex flex-col justify-center items-center">
                    <Avaliacao/>
                </section>
            </div>
            <Footer/>       
        </>
    );
};
