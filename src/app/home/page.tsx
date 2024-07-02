"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <section className="bg-hero-pipoca w-full h-[710px] bg-no-repeat bg-cover flex flex-col justify-center items-center gap-28">
        <h2 className="text-white text-center font-heavitas text-3xl">
          Tenha organizado todas as <br />
          suas resenhas do cinema
        </h2>
        <input
          placeholder="Pesquise seu filme"
          className="placeholder-black placeholder-opacity-50 bg-lightgray pl-4 w-1/2 py-2 rounded-md text-black"
          type="text"
        />
      </section>
      <section className="bg-black flex justify-center pt-14">
        <h2 className="text-yellow text-xl font-heavitas">QUE TAL ASSISTIR?</h2>
      </section>
      <Footer />
    </>
  );
}
