import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_PLACEHOLDER_API_URL
})

export interface PlaceholderItem {
  id: number
  title: string
  url: string
  thumbnailUrl: string
  albumId: number
}

export interface PlaceholderResponse {
  items: PlaceholderItem[]
  totalCount: number
}

export async function getPlaceholderItems( page = 1, pageSize = 20): Promise<PlaceholderResponse> {
  const res = await api.get<PlaceholderItem[]>(`/photos?_page=${page}&_limit=${pageSize}`)

  return {
    items: res.data,
    totalCount: Number(res.headers['x-total-count'])
  }
}
