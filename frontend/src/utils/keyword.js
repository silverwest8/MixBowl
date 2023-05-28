const KEYWORDS = [
  {
    id: 1,
    icon: "👍",
    value: "술이 맛있어요",
  },
  {
    id: 2,
    icon: "🍹",
    value: "술이 다양해요",
  },
  {
    id: 3,
    icon: "🍸",
    value: "혼술하기 좋아요",
  },
  {
    id: 4,
    icon: "🙌",
    value: "메뉴가 다양해요",
  },
  {
    id: 5,
    icon: "🍽️",
    value: "음식이 맛있어요",
  },
  {
    id: 6,
    icon: "🌃",
    value: "분위기가 좋아요",
  },
  {
    id: 7,
    icon: "😀",
    value: "직원이 친절해요",
  },
  {
    id: 8,
    icon: "🗣️",
    value: "대화하기 좋아요",
  },
  { id: 9, icon: "💵", value: "가성비가 좋아요" },
];

export const getKeywords = () => KEYWORDS;
export const getKeyword = (id) => KEYWORDS.find((item) => item.id === id);
