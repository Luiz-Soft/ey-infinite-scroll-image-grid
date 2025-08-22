import axios from 'axios'
import { parseLinkHeader } from '@web3-storage/parse-link-header'

const api = axios.create({
  baseURL: import.meta.env.VITE_PICSUM_API_URL
})

export interface PicsumItem {
  id: string
  author: string
  download_url: string
  width: number
  height: number
  url: string
}

export interface PicsumResponse {
  items: PicsumItem[]
  hasMore: boolean
}

export async function getPicsumItems( page = 1, pageSize = 20 ): Promise<PicsumResponse> {
  try {
    const res = await api.get<PicsumItem[]>(`/v2/list?page=${page}&limit=${pageSize}`)

    const linkHeader = res.headers['link'] as string | undefined
    const parsedLinkHeader = linkHeader ? parseLinkHeader(linkHeader) : null

    return {
      items: res.data,
      hasMore: Boolean(parsedLinkHeader?.next)
    }
  } catch (error) {
    console.error('Failed to fetch Picsum items:', error)
    throw error
  }
}
