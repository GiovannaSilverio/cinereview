"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import api from "@/services/api";

interface RootObject {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
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

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await api.get("/movies/page/1", {
          withCredentials: true, // para enviar o cookie
        });

        const data = response.data as RootObject;
        console.log("Data:", data);

      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          console.error("Usuário não autenticado");
          router.push("/login");
   
        } else {
          console.error("Erro na requisição:", error);
        }
      }
    }

    getMovies();
  }, []);

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
