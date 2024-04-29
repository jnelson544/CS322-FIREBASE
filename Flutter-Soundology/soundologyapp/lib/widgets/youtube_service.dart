import 'package:googleapis/youtube/v3.dart' as youtube;

class YoutubeService {
  final youtube.YouTubeApi youtubeApi;

  YoutubeService(this.youtubeApi);

  Future<void> searchVideos(String query) async {
    try {
      final searchListResponse = await youtubeApi.search.list(
        'snippet',
        q: query,
        type: 'video',
      );


      final items = searchListResponse.items;
      if (items != null) {
        for (var item in items) {
          print('Title: ${item.snippet?.title}');
          print('Video ID: ${item.id?.videoId}');
        }
      }
    } catch (e) {
      print('Error searching videos: $e');
    }
  }
}
