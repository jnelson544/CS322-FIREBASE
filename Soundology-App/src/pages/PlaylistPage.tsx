import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { firestore } from '../firebaseConfig';

import './main.css';
// import './RadioPage.css';
import './PlaylistPage.css';


const PlaylistPage = () => {

    // firestore database access
    const [playlists, setPlaylists] = useState<{ id: string, Genre: string, Runtime: string, Title: string, Songs: number}[]>([]);
    

    useEffect(() => {
        const fetchplaylists = async () => {
            try {
              const playlistRef = firestore.collection('Playlists').doc('Song-Info').collection('Playlist_Name'); 
              const querySnapshot = await playlistRef.get();
              if (querySnapshot.empty) {
                console.log('No playlists found');
                return;
              }
              const playlistsData = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                  id: doc.id,
                  Genre: data.Genre,
                  Runtime: data.Runtime,
                  Title: data.Title,
                  Songs: data.Songs,
                };
              });
              setPlaylists(playlistsData);

              console.log('Playlists:', playlistsData);
            } catch (error) {
            console.error('Error fetching playlists:', error);
            }
        };
        fetchplaylists(); 
    }, []);
    
    const [showModal1, setShowModal1] = useState(false);
    const [modalContent1, setModalContent1] = useState<string>('');
    const [modalClass1, setModalClass1] = useState<string>('');

    const [showModal2, setShowModal2] = useState(false);
    const [modalContent2, setModalContent2] = useState<string>('');
    const [modalClass2, setModalClass2] = useState<string>('');
    
    const handleOpenModal1 = (content: string, className: string) => {
        console.log("trying to open");
          setModalContent1(content);
          setModalClass1(className);
          setShowModal1(true);
      };
    
      const handleCloseModal1 = () => {
        console.log("trying to close");
          setModalContent1('');
          setModalClass1('');
          setShowModal1(false);
      };
    
      const handleOpenModal2 = (content: string, className: string) => {
        console.log("trying to open 2");
          setModalContent2(content);
          setModalClass2(className);
          setShowModal2(true);
      };
    
      const handleCloseModal2 = () => {
          setModalContent2('');
          setModalClass2('');
          setShowModal2(false);
      };
    return (
    <>
    <IonHeader className="header">
                <IonTitle className="app-title">SOUNDOLOGY</IonTitle>
            </IonHeader>
            <IonContent className="content">
                <IonRow>
                <IonCol size="12">
                <IonCard className="title-card">
                <IonCardHeader>Playlists</IonCardHeader>  
                </IonCard>
                </IonCol>
                </IonRow>

                <IonCard  className="playlist-card" color="success">
                <IonCardHeader>
                    <IonCardTitle className="playlist-title">Your Top 4 Playlists</IonCardTitle>
                </IonCardHeader>
                <IonGrid className="grid-playlist" fixed>
                    <IonRow >
                        <IonCol size="6">
                            <IonCard >
                                <IonCardHeader>
                                    <IonCardTitle>Today's Top Hits</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="podcast-button" fill="clear" onClick={() => handleOpenModal1("'Today's Top Hits' - Pop -  50 songs - 02:06:24","modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Rap Caviar</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="release-button" fill="clear" onClick={() => handleOpenModal1("'RapCaviar' - Hip-Hop/Rap - 231 songs - 11:55:00", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Classic Rock</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="sleep-button" fill="clear" onClick={() => handleOpenModal1("'Classic Rock Playlist' - Rock - 72 songs - 03:59:55", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>

                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Chillout Lounge</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="wellness-button" fill="clear" onClick={() => handleOpenModal1("'Chillout Lounge Music' - Electronic/Chillout - 93 songs - 04:55:21", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                    </IonRow>

                    </IonGrid>      
                    </IonCard>
                    <IonRow>
                    <IonCol>
                    <IonCard className="outer-list-card" color="success">
                        <IonCardHeader>
                            <IonCardTitle className="playlist-title">Playlist Library</IonCardTitle>
                        </IonCardHeader>
                                {playlists.map((playlist) => (
                                        <IonCard className="list-card" key={playlist.id}>
                                        <IonCardHeader>
                                        <IonCardTitle>{playlist.Title}</IonCardTitle>
                                        </IonCardHeader>
                                    <IonCardContent>
                                        <IonText>Genre: {playlist.Genre}</IonText><br />
                                        <IonText>Runtime: {playlist.Runtime}</IonText><br />
                                        <IonText>Total Songs: {playlist.Songs}</IonText>
                                    </IonCardContent>
                                </IonCard>
                                ))}
                    </IonCard>
                    </IonCol>
                    </IonRow>
            </IonContent>

                <IonModal isOpen={showModal1} onDidDismiss={handleCloseModal1}>
                <IonCardTitle className="modal-title">Hello!</IonCardTitle>
                <IonCardSubtitle className="modal-subtitle">{modalContent1}</IonCardSubtitle>
                <IonButton onClick={handleCloseModal1}>Close</IonButton>
            </IonModal>

    </>
    );
};
export default PlaylistPage;