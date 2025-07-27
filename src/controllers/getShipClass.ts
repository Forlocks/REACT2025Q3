export async function getShipClass(uid: string) {
  const API_URL: string = 'https://stapi.co/api/v1/rest/spacecraftClass';
  const queryOptions = `?uid=${uid}`;

  try {
    const response = await fetch(`${API_URL}${queryOptions}`);
    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
