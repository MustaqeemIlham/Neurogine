import { BASE_URL } from '../utils/constants';
export async function request<T>(path: string): Promise<T> {
  const respones = await fetch(BASE_URL + path)

  if (!respones.ok) {
    throw new Error(`Fetch failed: ${respones.status} ${respones.statusText || ''}`.trim());
  }

  return respones.json();
}
