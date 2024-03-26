// youtubeUtils.ts
import axios from 'axios';

export const fetchRandomVideo = async () => {
  try {
    const API_KEY = 'AIzaSyDo_x-HFriuA6_CIWdd2Yi6RUfTd2K1YCk'; // Replace with your actual API key
    const searchQuery = 'music'; // You can change the search query as needed

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchQuery}&type=video&maxResults=50`
    );

    const videos = response.data.items;
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideoId = videos[randomIndex].id.videoId;

    return randomVideoId;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return null;
  }
};
