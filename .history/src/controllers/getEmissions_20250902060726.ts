async function getEmissions() {
  const DATA_PATH

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
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
