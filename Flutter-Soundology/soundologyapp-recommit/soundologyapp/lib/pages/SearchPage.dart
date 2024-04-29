import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart'; 
import '../widgets/clickable_card.dart';
import '../widgets/tile_data.dart';
import 'firebase_service.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  late FirebaseService firebaseService; 
  TextEditingController _searchController = TextEditingController();
  List<String> _searchResults = [];

  @override
  void initState() {
    super.initState();
    firebaseService = FirebaseService();
    firebaseService.initializeFirebase();
  }

  void _performSearch() {
    // future coded functionality
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Center(
            child: Text('Soundology Search',
            style: TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ), 
          ),
        ),
      ),
      body:  Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Color(0xFFFFE6E6), // Pale Pink
                Color(0xFFE6E6FF), // Lavender Purple
                Color(0xFFE6F9FF), // Baby Blue
              ],
            ),
          ), 
        child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Type: Song Title, Artist, Genre, ETC.',
                suffixIcon: IconButton(
                  icon: Icon(Icons.search),
                  onPressed: _performSearch,
                ),
              ),
            ),
            SizedBox(height: 5),
              Expanded(
                child: FutureBuilder<List<TileData>>(
                  future: firebaseService.fetchTitlesAndSubtitles(),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(child: CircularProgressIndicator());
                    } else if (snapshot.hasError) {
                      return Text('Error fetching data');
                    } else {
                      return GridView.builder(
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 4, 
                          crossAxisSpacing: 55, 
                          mainAxisSpacing: 55, 
                        ),
                        itemCount: snapshot.data!.length,
                        itemBuilder: (context, index) {
                          return ClickableCard(
                            Title: snapshot.data![index].Title,
                            Subtitle: snapshot.data![index].Subtitle,
                            favTitle: '',
                            Album: '',
                            Artist: '',
                            Time: '',
                          );
                        },
                      );
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}