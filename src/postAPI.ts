export async function postAPI(url: string, data: any) {
  const rawResponse = await fetch(`http://localhost:8000${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await rawResponse.json();
}
