import { Colors } from "@/constants";
export const cardsGoodNews = [
  {
    id: "good-news",
    title: "Today's Good News",
    subtitle: "Start your day with something uplifting",
    image: require("@assets/images/home/news.png"),
    screen: {
      name: "GoodNews",
      params: {
        storyId: null, // placeholder to be set later
      },
    },
    textColor: Colors.textDark,
  },
];
