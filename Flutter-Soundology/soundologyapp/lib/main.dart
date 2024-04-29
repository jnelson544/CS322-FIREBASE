import 'package:flutter/material.dart';
import 'package:crystal_navigation_bar/crystal_navigation_bar.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:youtube_player_iframe/youtube_player_iframe.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'widgets/clickable_card.dart';
import 'pages/firebase_service.dart';
import 'pages/LoginPage.dart'; 
import 'pages/SignUpPage.dart';
import 'pages/SearchPage.dart';
import 'pages/FavPage.dart';
import 'pages/AddPage.dart';

final _controller = YoutubePlayerController(
  params: YoutubePlayerParams(
    mute: false,
    showControls: true,
    showFullscreenButton: true,
  ),
);

enum _SelectedTab { home, search, favorite, add }

void main() {
  runApp(MyApp());
}

const List<String> _videoIds = [
  'tcodrIK2P_I',
  'H5v3kku4y6Q',
  'nPt8bK2gbaU',
  'K18cpp_-gP8',
  'iLnmTe5Q2Qw',
  '_WoCV4c6XOE',
  'KmzdUe0RSJo',
  '6jZDSSZZxjQ',
  'p2lYr3vM_1w',
  '7QUtEmBT_-w',
  '34_PXCzGw1M'
];

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Soundology',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        backgroundColor: Colors.white,
        useMaterial3: true,
      ),
      home: Navigator(
        onGenerateRoute: (settings) {
          return MaterialPageRoute(
            builder:(context) => MyHomePage(title: 'Soundology in Flutter'),
          );
        },
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  var _selectedTab = _SelectedTab.home;
  int _counter = 0;
  bool _showSearchPage = false; 
  bool _showFavPage = false; 
  bool _showAddPage = false; 

  void _incrementCounter(int i) {
    setState(() {
      _selectedTab = _SelectedTab.values[i];
        if (_selectedTab == _SelectedTab.search){
          _showSearchPage = true;
        }else if(_selectedTab == _SelectedTab.favorite){
          _showFavPage = true;
        }else if(_selectedTab == _SelectedTab.add){
          _showAddPage = true;
        }else{
          print('increment counter note working right');
        }
      }
    );
  }

  void _navigateToSearchPage(BuildContext context) {
    setState(() {
      _selectedTab = _SelectedTab.search;
      _showSearchPage = true;
    });
  }

  void _navigateToFavPage(BuildContext context) {
    setState(() {
      _selectedTab = _SelectedTab.favorite;
      _showFavPage = true;
    });
  }

  void _navigateToAddPage(BuildContext context){
    setState((){
      _selectedTab = _SelectedTab.add;
      _showAddPage = true;
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      body: IndexedStack(
        index: _SelectedTab.values.indexOf(_selectedTab),
        children: [
          Container(
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
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 10.0),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 10.0),
                  child: Center(
                    child: Text(
                      'Soundology',
                      style: TextStyle(
                        fontSize: 36,
                        fontFamily: 'Protest Riot',
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                  ),
                ),
                YoutubePlayer(
                  controller: _controller,
                  aspectRatio: 16 / 9,
                ),
              ],
            ),
          ),
          //search page
          if (_showSearchPage) SearchPage(),
          //favorites page
          if (_showFavPage) FavPage(),
          //add page
          if (_showAddPage) AddPage(),

        ],
      ),
      bottomNavigationBar: CrystalNavigationBar(
        currentIndex: _SelectedTab.values.indexOf(_selectedTab),
        unselectedItemColor: Colors.white70,
        backgroundColor: Colors.black.withOpacity(0.1),
        onTap: _incrementCounter,
        items: [
          CrystalNavigationBarItem(
            icon: _selectedTab == _SelectedTab.home
                ? IconlyBold.home
                : IconlyLight.home,
            selectedColor: Colors.white,
          ),
          CrystalNavigationBarItem(
            icon: _selectedTab == _SelectedTab.search
                ? IconlyBold.search
                : IconlyLight.search,
            selectedColor: Colors.blue,
          ),
          CrystalNavigationBarItem(
            icon: _selectedTab == _SelectedTab.favorite
                ? IconlyBold.heart
                : IconlyLight.heart,
            selectedColor: Colors.red,
          ),
          CrystalNavigationBarItem(
            icon: _selectedTab == _SelectedTab.add
                ? IconlyBold.plus
                : IconlyLight.plus,
            selectedColor: Colors.yellow,
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text('Choose Action'),
                content: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pop(context);
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => LoginPage(),
                          ),
                        );
                      },
                      child: Text('Login'),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pop(context);
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => SignUpPage(),
                          ),
                        );
                      },
                      child: Text('Sign Up'),
                    ),
                  ],
                ),
              );
            },
          );
        },
        child: Icon(Icons.account_circle),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.startTop,
    );
  }
}
