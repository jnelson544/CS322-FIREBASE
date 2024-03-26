import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTubeComponent from '../components/YoutubeComponent';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonRow, IonText, IonTitle } from '@ionic/react';

import './main.css';
import './RadioPage.css';
import './PlaylistPage.css';
import { playOutline, playSkipBackOutline, playSkipForwardOutline } from 'ionicons/icons';
import { firestore } from '../firebaseConfig';


const RadioPage = () => {

      // firestore database access
      const [favorites, setfavorites] = useState<{ id: string, Title: string, Artist: string, Album: string, Time: string}[]>([]);
    
      useEffect(() => {
          const fetchfavorites = async () => {
              try {
                const favoriteRef = firestore.collection('Favorites'); 
                const querySnapshot = await favoriteRef.get();
                if (querySnapshot.empty) {
                  console.log('No favorites found');
                  return;
                }
                const favoritesData = querySnapshot.docs.map((doc) => {
                  const data = doc.data();
                  return {
                    id: doc.id,
                    Title: data.Title,
                    Artist: data.Artist,
                    Album: data.Album,
                    Time: data.Time,
                  };
                });
                setfavorites(favoritesData);
  
                console.log('favorites:', favoritesData);
              } catch (error) {
              console.error('Error fetching favorites:', error);
              }
          };
          fetchfavorites(); 
      }, []);
   
  const [showModal, setShowModal] = useState(false);
  
  const handleOpenModal = () => {
      setShowModal(true);
  };

  const handleCloseModal = () => {
      setShowModal(false);
  };
  
  return (
    <>
    <IonHeader className="header">
                <IonTitle className="app-title">SOUNDOLOGY</IonTitle>
            </IonHeader>
            <IonContent className="content">
              <IonRow>
                <IonCol size="8">
              <IonCard className="title-card">
                <IonCardHeader>Favorites</IonCardHeader>  
              </IonCard>
              </IonCol>
              <IonCol size="4">
              <IonCard className="play-icon">
                <IonIcon icon={playSkipBackOutline} ></IonIcon>
                <IonIcon icon={playOutline} onClick={handleOpenModal}></IonIcon>
                <IonIcon icon={playSkipForwardOutline}></IonIcon>
              </IonCard>
              </IonCol>
              </IonRow>

                      <IonRow>
                      <IonCol>
                      <IonCard className="outer-list-card" color="success">
                          <IonCardHeader>
                              <IonCardTitle className="playlist-title">Your Top 10 List</IonCardTitle>
                          </IonCardHeader>
                                  {favorites.map((favorite) => (
                                          <IonCard className="list-card" key={favorite.id}>
                                          <IonCardHeader>
                                          <IonCardTitle>{favorite.Title}</IonCardTitle>
                                          </IonCardHeader>
                                      <IonCardContent>
                                          <IonText>Artist: {favorite.Artist} Album: {favorite.Album}</IonText>
                                          <IonText></IonText>
                                          <IonText>Time: {favorite.Time}</IonText>
                                      </IonCardContent>
                                  </IonCard>
                                  ))}
                      </IonCard>
                      </IonCol>
                      </IonRow>
              </IonContent>

              <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
              <IonCardTitle className="modal-title">Hello!</IonCardTitle>
              <IonCard className="modal-play">
                <IonIcon icon={playSkipBackOutline} ></IonIcon>
                <IonIcon icon={playSkipForwardOutline}></IonIcon>
              </IonCard>
              
                <IonCardSubtitle className="modal-subtitle">Thank you for choosing to listen to Soundology! We are unable to play your video at this time. Have a great day!  </IonCardSubtitle>
                <IonButton onClick={handleCloseModal}>Close</IonButton>
            </IonModal>

    </>
  );
};
export default RadioPage;
