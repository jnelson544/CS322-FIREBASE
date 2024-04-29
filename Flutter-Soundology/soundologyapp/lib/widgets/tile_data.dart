
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class TileData {
  final String Title;
  final String Subtitle;

 
  final String favTitle;
  final String Album;
  final String Artist;
  final String Time;

  TileData({
    required this.Title,
    required this.Subtitle,

    required this.favTitle,
    required this.Album,
    required this.Artist,
    required this.Time,
  });

  factory TileData.fromSearchJson(Map<String, dynamic> json) {
    return TileData(
      Title: json['Title'] ?? '',
      Subtitle: json['Subtitle'] ?? '',
      favTitle: '',
      Album: '', 
      Artist: '', 
      Time: '', 
    );
  }

  factory TileData.fromFavoritesJson(Map<String, dynamic> json) {
    return TileData(
      Title: '',
      Subtitle: '', 
      favTitle: json['favTitle'] ?? '',
      Album: json['Album'] ?? '',
      Artist: json['Artist'] ?? '',
      Time: json['Time'] ?? '',
    );
  }
}
