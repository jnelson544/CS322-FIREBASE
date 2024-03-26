import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonModal, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';

import './main.css';
import './SearchPage.css';

interface Video {
    id: string;
    snippet: {
        title: string;
    };
}

const SearchPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<string>('');
    const [modalClass, setModalClass] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Video[]>([]);
    const [showModal2, setShowModal2] = useState(false);

    const handleOpenModal = (content: string, className: string) => {
        setModalContent(content);
        setModalClass(className);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setModalContent('');
        setModalClass('');
        setShowModal(false);
    };

    const handleSearchInputChange = (event: CustomEvent) => {
        setSearchQuery(event.detail.value || ''); 
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    q: searchQuery,
                    key: 'AIzaSyDo_x-HFriuA6_CIWdd2Yi6RUfTd2K1YCk',
                    type: 'video',
                    maxResults: 10,
                    part: 'snippet',
                },
            });
            setSearchResults(response.data.items);
            setShowModal2(true);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const handleCloseModal2 = () => {
        setShowModal2(false);
        setSearchResults([]);
    };

    return (
        <>
            <IonHeader className="header">
                <IonTitle className="app-title">SOUNDOLOGY</IonTitle>
            </IonHeader>
            <IonContent className='content'>
                <IonGrid fixed>
                    <IonRow>
                        <IonCol size="12">
                            <IonSearchbar className="search-bar"
                                value={searchQuery}
                                placeholder="Enter search query"
                                onIonChange={handleSearchInputChange}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            <IonButton className="search-button" onClick={handleSearch}>Search</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonModal isOpen={showModal2}>
                     <IonHeader>
                         <IonToolbar>
                             <IonTitle className="modal-search-results">Search Results</IonTitle>
                             <IonButton className='modal-search-close' onClick={handleCloseModal2}>Close</IonButton>
                         </IonToolbar>
                     </IonHeader>
                     <IonContent>
                         {searchResults.map((video: Video, index: number) => (
                            <IonCard key={video.id || index}>
                                <IonCardHeader>
                                    <IonCardTitle>{video.snippet ? video.snippet.title: 'Title not available'}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                </IonCardContent>
                            </IonCard>
                        ))}
                        
                    </IonContent>
                </IonModal>
            
            <IonContent className="content">
                <IonGrid fixed>
                    <IonRow>
                        <IonCol size="6">
                            <IonCard >
                                <IonCardHeader>
                                    <IonCardTitle>Podcasts</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="podcast-button" fill="clear" onClick={() => handleOpenModal("Interviews; Conversational; Monologue;", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>New Releases</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="release-button" fill="clear" onClick={() => handleOpenModal("Billie Elish; Ariana Grande; Djo; Cris Mj;", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Sleep Sounds</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="sleep-button" fill="clear" onClick={() => handleOpenModal("Ambient Music; Calming Lullabies; Meditation; Sound Therapy;", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>

                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Wellness</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="wellness-button" fill="clear" onClick={() => handleOpenModal("Tony Robbins Explains; Live Podcasts; Dimensions of Wellness;", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>

                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Pop Genre</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="pop-button" fill="clear" onClick={() => handleOpenModal("Classic Pop Picks; Rock before Pop later; 70s Pop Hits; Now That's What I call Music!;", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Hip-Hop Genre</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="hiphop-button" fill="clear" onClick={() => handleOpenModal("L'Trimm; Lil Jon; M.I.A.; Jay Z; Latto; Lil Baby; Ice Spice; Kendrick Lamar;", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Rap Genre</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="rap-button" fill="clear" onClick={() => handleOpenModal("The Sugarhill Gang; Run-DMC; Geto Boys; Public Enemy; The Notorious B.I.G.;", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Rock Genre</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="rock-button" fill="clear" onClick={() => handleOpenModal("Joan Jett; Bruce Springsteen; David Bowie; Talking Heads;", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Electronic Genre</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="electronic-button" fill="clear" onClick={() => handleOpenModal("Alan Walker; Paul Damixie; Marnik; SERE; Steve Aoki; Martin Garrix;", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>

                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Classical Genre</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="classical-button" fill="clear" onClick={() => handleOpenModal(" Mozart; Beethoven; Bach; Chopin; Puccini; Tchaikovsky;", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow style={{paddingBottom: "120px"}}>
                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Country Genre</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="country-button" fill="clear" onClick={() => handleOpenModal("Florida Georgie Line; Sam Hunt; George Strait; Conway Twitty; Merle Haggard", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Metal Genre</IonCardTitle>
                                </IonCardHeader>
                                <IonButton className="metal-button" fill="clear" onClick={() => handleOpenModal("Metallica; Venom; Warlock; Life of Agony; Van Halen; Korn; Slipknot; ", "modal-content")}>View</IonButton>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <IonCard>
                            </IonCard>
                        </IonCol>
                        <IonCol size="6">
                            <IonCard>
                                <IonCardHeader>
                                </IonCardHeader>
                                <IonButton className="empty-button" fill="clear"></IonButton>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            
            <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
                <IonCard className={modalClass} style={{ width: '80%', maxWidth: '500px', height: '80vh', margin: 'auto', padding: '20px' }}>
                    <IonCardHeader>
                        <IonCardTitle className="modal-title">Available Videos</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>Searchable Options:<div className="modal-content">{modalContent}</div></IonCardContent>
                </IonCard>
                <IonButton  onClick={handleCloseModal}>Close</IonButton>
            </IonModal>
            </IonContent>
        </>
    );
};

export default SearchPage;
