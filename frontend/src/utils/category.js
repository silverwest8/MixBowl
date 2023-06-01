const CATEGORIES = [
  {
    id: 1,
    value: "칵테일 추천",
  },
  {
    id: 2,
    value: "질문과 답변",
  },
  {
    id: 3,
    value: "칵테일 리뷰",
  },
  {
    id: 4,
    value: "자유게시판",
  },
];

export const getCategories = () => CATEGORIES;
export const getCategoryById = (id) =>
  CATEGORIES.find((item) => item.id === id);
