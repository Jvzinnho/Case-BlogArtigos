import { API_CONFIG } from '../config/api';

export function formatImageUrl(url: string): string {
  if (!url) return '/default-image.webp';
  return `${API_CONFIG.BASE_URL}${url}`;
}
