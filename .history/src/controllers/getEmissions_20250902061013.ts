async function getEmissions() {
  const DATA_PATH = '../assets/co2-data.json';

  try {
    const response = await fetch(DATA_PATH);

    if (!response.ok) {
      throw new Error(`Failed fetch: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Ошибка при загрузке JSON:", err);
    return null;
  }
}

// пример использования
loadJSON('./data.json').then(data => {
  if (data) {
    console.log("Загруженные данные:", data);
  }
});
