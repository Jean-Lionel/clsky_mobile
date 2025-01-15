<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Paramètres</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label>Mode sombre</ion-label>
          <ion-toggle v-model="darkMode"></ion-toggle>
        </ion-item>

        <ion-item>
          <ion-label>Notifications</ion-label>
          <ion-toggle v-model="notifications"></ion-toggle>
        </ion-item>

        <ion-item>
          <ion-label>Langue</ion-label>
          <ion-select v-model="language">
            <ion-select-option value="fr">Français</ion-select-option>
            <ion-select-option value="en">English</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-button expand="block" color="danger" class="ion-margin-top">
        Déconnexion
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonButton
} from '@ionic/vue';

const darkMode = ref(false);
const notifications = ref(true);
const language = ref('fr');
</script>