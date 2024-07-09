// interfaces.ts
export interface Movie {
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
  
  export interface Review {
    id: number;
    content: string;
    rating: number;
    movie: Movie;
    date: Date; 
  }
  
  export interface ResponseUser {
    id: number;
    username: string;
    email: string;
    favoriteMovies: Movie[];
    reviews: Review[];
  }
  