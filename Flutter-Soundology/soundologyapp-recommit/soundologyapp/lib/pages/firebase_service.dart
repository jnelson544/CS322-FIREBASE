import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import '../widgets/tile_data.dart';

class FirebaseService {
  late final FirebaseFirestore _firestore;

  Future<void> initializeFirebase() async {
    try {
      await Firebase.initializeApp(
        options: FirebaseOptions(
          apiKey: "AIzaSyAnKJnt72UsVkr3arcXEFN6d4K_OtNGOjc",
          authDomain: "flutter-project-3586f.firebaseapp.com",
          projectId: "flutter-project-3586f",
          storageBucket: "flutter-project-3586f.appspot.com",
          messagingSenderId: "646682797522",
          appId: "1:646682797522:web:dc30b657635899e496140b",
          measurementId: "G-QHHNV8JF7X",
        ),
      );
        _firestore = FirebaseFirestore.instance;
      } catch (e) {
        print('Error initializing Firebase: $e');
      }
  }

  Future<List<TileData>> fetchTitlesAndSubtitles() async {
    try {
      QuerySnapshot querySnapshot = await _firestore.collection('SearchTiles').get(); 
      List<TileData> data = querySnapshot.docs.map((doc) {
        return TileData.fromSearchJson(doc.data() as Map<String, dynamic>);
      }).toList();

      return data;
    } catch (e) {
      print('Error fetching data: $e');
      return [];
    }
  }

  Future<List<TileData>> fetchFavorites() async {
    try {
      QuerySnapshot querySnapshot = await _firestore.collection('Favorites').get();
      List<TileData> data = querySnapshot.docs.map((doc) {
        return TileData.fromFavoritesJson(doc.data() as Map<String, dynamic>);
      }).toList();

      return data;
    } catch (e) {
      print('Error fetching favorites: $e');
      return [];
    }
  }

  Future<List<String>> fetchTopPlaylistTitles() async {
    try {
      QuerySnapshot querySnapshot = await _firestore.collection('Playlists').doc('Song-Info').collection('Playlist_Name').orderBy('Number of Songs in list', descending: true).limit(4).get();
      List<String> playlistTitles = querySnapshot.docs.map((doc) {
        final Map<String, dynamic>? data = doc.data() as Map<String, dynamic>?;
        if (data != null) {
          return data['Title of playlist'] as String;
        } else {
          throw 'Document data is null';
        }
      }).toList();
      return playlistTitles;
    } catch (e) {
      print('Error fetching playlist titles: $e');
      return [];
    }
  }

}
