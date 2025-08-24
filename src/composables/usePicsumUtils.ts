import { computed } from 'vue'

/**
 * Build a Picsum thumbnail URL.
 * Defaults to 150x150 but size can be overridden.
 */
export function usePicsumThumbnail(id: string, w = 150, h = 150) {
  const baseUrl = import.meta.env.VITE_PICSUM_API_URL
  return computed(() => `${baseUrl}/id/${id}/${w}/${h}`)
}