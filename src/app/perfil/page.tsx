// esse componente precisa ser server side porque precisa ler o cookie de autenticação e fazer a requisição para o backend

import React from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { redirect } from 'next/navigation'

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Avaliacao from "@/components/Avaliacao";

import api from "@/services/api";

interface JwtPayloadNew extends JwtPayload{
  
  user: {
    id: number;
    username: string;
  }
}

interface responseUser {
  id: number;
  username: string;
  email: string;
  favoriteMovies: [];
  reviews: [];
}


export const decodeToken = (token: string) => {
  try {
    // console.log("Token:", token);
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.log("Erro ao decodificar o token:", error);
  }

}

export default async function Perfil() {
  const cookiesStorage = cookies();
  const token  = cookiesStorage.get("accessToken");

  if (!token) {
    console.error("Usuário não autenticado");
    redirect("/login");
  }
  // console.log("Access Token:", token); // Adicione este log para verificar se o token está sendo lido
  // console.log("Token:", token.value);
  const decodedToken = decodeToken(token.value) as JwtPayloadNew;

  if (!decodedToken) {
    console.error("Erro ao decodificar o token");
    redirect("/login");
  }

try{
  const response = await api.get(`/user/${decodedToken.user.id}`, {
    withCredentials: true,
  })

  const data = response.data as responseUser;
  // console.log("Data:", data);

  console.log("Response:", response.status);
  // console.log("Response:", response.data);

  if (response.status === 403) {
    console.error("Usuário não autenticado");
    redirect("/login");
  }


}


catch (error: any) {
  // console.log("Erro na requisição:", error);

  if (error.response && error.response.status === 403) {
    console.error("Usuário não autenticado");
    redirect("/login");
  }

}
 


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
