import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ClickableCard extends StatelessWidget {
  final String Title;
  final String Subtitle;
  final String favTitle;
  final String Album;
  final String Artist;
  final String Time;

  

  ClickableCard({
    required this.Title, 
    required this.Subtitle,
  
    required this.favTitle,
    required this.Album,
    required this.Artist,
    required this.Time,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(Title),
              content: Text(Subtitle),
              actions: [
                IconButton(
                  icon: Icon(Icons.close),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                ),
              ],
            );
          },
        );
      },
        child: Card(
          color: Colors.grey.shade500, 
          child: Padding(
            padding: EdgeInsets.all(8.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Icon(Icons.info, size: 36),
                SizedBox(height: 8),
                Text(
                  Title,
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
        ),
    );
  }
}