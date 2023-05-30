export const convertURLtoFile = async (url) => {
  const response = await fetch(url);
  const data = await response.blob();
  const filename = `${url.split("/").pop()}.jpg`.replaceAll("?", ""); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/jpeg` };
  return new File([data], filename, metadata);
};

export const getReviewImageUrl = (imageId) => {
  return `/api/reviews/image/one?imageId=${imageId}`;
};

export const getCommunityImageUrl = (imageId) => {
  return `${process.env.REACT_APP_BACKEND_BASE_URL}/communities/one/image?imageId=${imageId}`;
};

export const getCocktailImageUrl = (cocktailId) => {
  return `${process.env.REACT_APP_BACKEND_BASE_URL}/recipes/image/${cocktailId}`;
};
