export async function useFetch(props) {
  const { initialState, url } = props;
  const response = await fetch(url, {});

  if (response.ok) {
    try {
      const json = await response.json();
      return json;
    } catch (err) {
      console.error(err);
    }
  }

  return initialState;
}
