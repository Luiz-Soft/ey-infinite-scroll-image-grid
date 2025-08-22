import axios from 'axios'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
/*using parseLinkHeader was necessary because picsum api relies on the Link header for pagination, 
which requires the header to be parsed before it can be used. JSONPlaceHolder API, on the other hand, would not require this,
since it has a simpler pagination attribute on the header called "x-total-count"
*/
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

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

export async function getPicsumItems(
  page = 1,
  pageSize = 20
): Promise<PicsumResponse> {
  try {
    const res = await api.get<PicsumItem[]>(`/v2/ist?page=${page}&limit=${pageSize}`)

    const linkHeader = res.headers['link'] as string | undefined
    const parsedLinkHeader = linkHeader ? parseLinkHeader(linkHeader) : null

    return {
      items: res.data,
      hasMore: Boolean(parsedLinkHeader?.next)
    }
  } catch (error) {
    toast.error('⚠️ Failed to fetch Picsum items', {
      autoClose: 3000,
      position: 'bottom-right'
    })
    throw error
  }
}
