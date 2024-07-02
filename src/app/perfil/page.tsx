import React from "react";
import Image from "next/image";
import Link from "next/link"
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Perfil() {
    return(
        <>
            <Header/>
            <div className="bg-black flex flex-col py-28">
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
                <section>

                </section>
                <section>

                </section>
            </div>
            <Footer/>       
        </>
    );
};
