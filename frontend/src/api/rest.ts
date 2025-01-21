const baseUrl = 'http://127.0.0.1:8000';

export async function getAsync(slug: string) {
  return fetch(`${baseUrl}/${slug}`, { method: 'GET' })
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      return body;
    });
}

export async function postAsync(
  slug: string,
  payload: BodyInit | null | undefined
) {
  return fetch(`${baseUrl}/${slug}/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: payload,
  })
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      return body;
    });
}
