import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart'; 
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';
import 'firebase_service.dart';

class AddPage extends StatefulWidget {
    const AddPage({Key? key}) : super(key: key);

    @override
    _AddPageState createState() => _AddPageState();
}

class _AddPageState extends State<AddPage>{
    final FirebaseFirestore _firestore = FirebaseFirestore.instance;
    late List<double> itemHeights;

    final ItemScrollController itemScrollController = ItemScrollController();
    final ItemPositionsListener itemPositionsListener =
        ItemPositionsListener.create();
    final List<Color> itemColors = [
        Colors.blue.shade100,
        Colors.green.shade100,
    ];
    bool reversed = false;
    double alignment = 0;
    late List<DocumentSnapshot> documents;    

    @override
    void initState() {
        super.initState();
        fetchDataFromFirestore(); 
        initializeItemHeights();
    }

    void initializeItemHeights() {
        final fixedHeight = 50.0;
        itemHeights = List<double>.filled(
            21,
            fixedHeight,
        );
    }

    void fetchDataFromFirestore() async {
        try {
            var snapshot = await _firestore.collection('Playlists').doc('Song-Info').collection('Playlist_Name').get();

            setState(() {
                documents = snapshot.docs.toList();
            });

        } catch (e) {
            print('Error fetching data: $e');
        }
    }

    @override
    Widget build(BuildContext context) {
            return Scaffold(
                body: IndexedStack(
                    children: [
                        Container(
                            decoration: BoxDecoration(
                                gradient: LinearGradient(
                                    begin: Alignment.topLeft,
                                    end: Alignment.bottomRight,
                                    colors: [
                                    Color(0xFFFFE6E6), // Pale Pink
                                    Color(0xFFE6E6FF), // Lavender Purple
                                    Color(0xFFE6F9FF), // Baby Blue
                                    ],
                                ),
                            ),
                            child: Column(
                            children: [
                                Padding(
                                padding: const EdgeInsets.only(top: 10.0),
                                ),
                                Padding(
                                padding: const EdgeInsets.only(top: 10.0),
                                    child: Center(
                                        child: Text(
                                        'Soundology Playlists',
                                            style: TextStyle(
                                                fontSize: 36,
                                                fontFamily: 'Protest Riot',
                                                fontWeight: FontWeight.bold,
                                                color: Colors.black,
                                            ),
                                        ),
                                    ),
                                ),
                                Expanded(
                                    child: ScrollablePositionedList.builder(
                                        itemCount: documents.length,
                                        itemBuilder: (context, index) =>
                                            item(index, MediaQuery.of(context).orientation),
                                        itemScrollController: itemScrollController,
                                        itemPositionsListener: itemPositionsListener,
                                        reverse: reversed,
                                        scrollDirection: Axis.vertical,
                                    ),
                                ),
                            ],
                        ),
                    ),
                ],
            ),
        );
    }
    Widget item(int i, Orientation orientation) {
        return Container(
            height: orientation == Orientation.portrait ? itemHeights[i] : null,
            width: orientation == Orientation.landscape ? itemHeights[i] : null,
            decoration: BoxDecoration(
                color: itemColors[i % itemColors.length],
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(10),
            ),
            margin: EdgeInsets.symmetric(vertical: 10, horizontal: 10),
            padding: EdgeInsets.all(10),
            child: Center(
                child: Text(
                'Playlist: ${documents[i]['Title']}, Genre: ${documents[i]['Genre']}, Total Songs: ${documents[i]['Songs']}, approx. Runtime: (${documents[i]['Runtime']})',
                style: TextStyle(
                    color: Colors.black,
                    fontSize: 24,
                ),
                ),
            ),
        );
    }
}
