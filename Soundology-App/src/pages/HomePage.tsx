import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { playOutline } from 'ionicons/icons';

import './main.css';
import './HomePage.css';
import YouTubeComponent from '../components/YoutubeComponent';
import { fetchRandomVideo } from '../utils/youtubeUtils';

const HomePage = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [modalContent1, setModalContent1] = useState<string>('');
  const [modalClass1, setModalClass1] = useState<string>('');

  const [showModal2, setShowModal2] = useState(false);
  const [modalContent2, setModalContent2] = useState<string>('');
  const [modalClass2, setModalClass2] = useState<string>('');

  const [randomVideoId, setRandomVideoId] = useState<string | null>('Soundscape Ambience. Ethereal Music - ACCESS');
  
  // useEffect(() => {
  //   // Fetch random video when component mounts
  //   handlePlayRandomVideo();
  // }, []);
  
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

  const handlePlayRandomVideo = async () => {
    try {
        const videoId = await fetchRandomVideo();
        if (videoId) {
          setRandomVideoId(videoId);
          console.log(videoId)
        } else {
          console.error('Failed to fetch random video.');
        }
    } catch (error) {
      console.error('Error fetching random video:', error);
    }
  };

    return (
  <>
      <IonHeader className="header">
              {/* <div><img className="goldRecord" alt="goldRecord" src="src\assets\goldRecord.png"/></div> */}
              <IonTitle className="app-title">SOUNDOLOGY</IonTitle>
      </IonHeader>
      
      <IonContent className='content'>
        <div className="buttons-set">
                <IonButton className='log-in' fill="solid" onClick={() => handleOpenModal1("Enter Log-in Info", "modal-content")}>Log-In</IonButton>
                <IonButton className='sign-up' fill="solid" onClick={() => handleOpenModal2("Enter Info Below to Sign-Up", "modal-content")}>Sign-up</IonButton>
                <IonButton className="play-video" onClick={handlePlayRandomVideo}>Play Random Video<IonIcon icon={playOutline} slot="start" /></IonButton>
        </div>

          <div className="video-container" >
              <YouTubeComponent videoId={randomVideoId}/> {/* Include YouTubeComponent here */}

          </div>
      </IonContent>

          {/* Nodal for Log-In Page */}
            <IonModal isOpen={showModal1} onDidDismiss={handleCloseModal1}>
                <IonCard className={modalClass1} style={{ width: '80%', maxWidth: '500px', height: '80vh', margin: 'auto', padding: '20px' }}>
                    <IonCardHeader>
                        <IonCardTitle className="modal-title">Hello!</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <div className="modal-content">{modalContent1}</div>
                        <IonList>
                          <IonItem>
                            <IonInput label="Email Address" type="email" placeholder="email@domain.com"></IonInput>
                          </IonItem>
                          <IonItem>
                            <IonInput label="Password" type="password" placeholder="ABCdef123!@#"></IonInput>
                          </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
                <IonButton className='log-in' fill="solid" onClick={() => handleOpenModal1("Future site upgrades are required to log-in. Please press the 'CLOSE' button below and go back to the home page.", "modal-content")}>Log-In</IonButton>
                <IonButton onClick={handleCloseModal1}>Close</IonButton>
            </IonModal>

          {/* Modal for Sign-up Page */}
            <IonModal isOpen={showModal2} onDidDismiss={handleCloseModal2}>
                <IonCard className={modalClass1} style={{ width: '80%', maxWidth: '500px', height: '80vh', margin: 'auto', padding: '20px' }}>
                    <IonCardHeader>
                        <IonCardTitle className="modal-title">Hello!</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <div className="modal-content">{modalContent2}</div>
                        <IonList>
                          <IonItem>
                            <IonInput label="First Name" placeholder="Enter First Name"></IonInput>
                          </IonItem>
                          <IonItem>
                            <IonInput label="Last Name" placeholder="Enter Last Name"></IonInput>
                          </IonItem>
                          <IonItem>
                            <IonInput label="Email Address" type="email" placeholder="email@domain.com"></IonInput>
                          </IonItem>
                          <IonItem>
                            <IonInput label="Password" type="password" placeholder="ABCdef123!@#"></IonInput>
                          </IonItem>
                          <IonItem>
                            <IonInput label="Confirm Password" type="password" placeholder="Confirm your password"></IonInput>
                          </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
                <IonButton className='sign-up' fill="solid" onClick={() => handleOpenModal2("Future upgrades are needed to sign-up. Please press the 'CLOSE' button below and go back to the home page.", "modal-content")}>Sign-up</IonButton>
                <IonButton onClick={handleCloseModal2}>Close</IonButton>
            </IonModal>
    </>
  );
};

export default HomePage;