import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_DISNEY_API_URL,
})

export interface Character {
  _id: number
  name: string
  imageUrl: string
  films: string[]
}

export interface CharactersResponse {
  info: {
    count: number
    totalPages: number
    previousPage: string | null
    nextPage: string | null
  }
  data: Character[]
}

export const getCharacters = async (page: number = 1, pageSize: number = 10): Promise<CharactersResponse> => {
  const response = await api.get(`/character?page=${page}&pageSize=${pageSize}`)
  return response.data
}

export const getCharacterByName = async (name: string, page = 1, pageSize = 9): Promise<CharactersResponse> => {
  const response = await api.get(`/character?name=${name}&page=${page}&pageSize=${pageSize}`)
  return response.data
}

export const getCharacterById = async (id: string): Promise<Character> => {
  const response = await api.get(`/character/${id}`)
  return response.data
}