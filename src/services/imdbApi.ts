import axios from "axios";

const API_URL = "https://imdb.iamidiotareyoutoo.com/search";

export interface IMDBResult {
  "#TITLE": string;
  "#YEAR": number;
  "#IMDB_ID": string;
  "#RANK": number;
  "#ACTORS": string;
  "#AKA": string;
  "#IMDB_URL": string;
  "#IMDB_IV": string;
  "#IMG_POSTER": string;
  photo_width: number;
  photo_height: number;
}

interface IMDBResponse {
  ok: boolean;
  description: IMDBResult[];
  error_code: number;
}

export const searchMovies = async (query: string): Promise<IMDBResult[]> => {
  try {
    const response = await axios.get<IMDBResponse>(API_URL, {
      params: { q: query },
    });
    if (response.data.ok && response.data.description) {
      return response.data.description;
    }
    return [];
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
