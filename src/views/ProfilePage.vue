<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Profil</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-avatar class="ion-margin-bottom">
          <img alt="Profile photo" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
        </ion-avatar>
  
        <ion-list>
          <ion-item>
            <ion-label>
              <h2>Nom d'utilisateur</h2>
              <p>John Doe</p>
            </ion-label>
          </ion-item>
  
          <ion-item>
            <ion-label>
              <h2>Email</h2>
              <p>john.doe@example.com</p>
            </ion-label>
          </ion-item>
  
          <ion-item>
            <ion-label>
              <h2>Téléphone</h2>
              <p>+33 6 12 34 56 78</p>
            </ion-label>
          </ion-item>
        </ion-list>
  
        <ion-button expand="block" color="primary" class="ion-margin-top">
          Modifier le profil
        </ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAvatar,
    IonList,
    IonItem,
    IonLabel,
    IonButton
  } from '@ionic/vue';
  </script>
  
  <style scoped>
  ion-avatar {
    width: 128px;
    height: 128px;
    margin: 0 auto;
  }
  </style>