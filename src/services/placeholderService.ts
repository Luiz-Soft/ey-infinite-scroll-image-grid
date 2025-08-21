import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_PLACEHOLDER_API_URL || 'https://jsonplaceholder.typicode.com',
})

export interface PlaceholderItem {
  id: number
  title: string
  url: string
  thumbnailUrl: string
  albumId: number
}

export const getPlaceholderItems = async (page: number = 1, pageSize: number = 20): Promise<PlaceholderItem[]> => {
  const response = await api.get<PlaceholderItem[]>(`/photos?_page=${page}&_limit=${pageSize}`)
  return response.data
}
