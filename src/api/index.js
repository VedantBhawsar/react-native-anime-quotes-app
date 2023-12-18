export const fetchAnime = async (name = "jujutsu kaise") => {
  let response = await fetch(
    `https://api.jikan.moe/v4/anime?q=${name}&limit=1`
  );
  response = await response.json();
  return response;
};

export const fetchQuote = async () => {
  // try {
  let response = await fetch("https://animechan.xyz/api/quotes");

  response = await response.json();
  return response;
};
