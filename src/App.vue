<template>
  <ion-app>
    <!-- Afficher les tabs seulement si l'utilisateur est connecté -->
    <ion-tabs v-if="isAuthenticated">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Accueil</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/reports">
          <ion-icon :icon="documentOutline"></ion-icon>
          <ion-label>Rapports</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/tabs/settings">
          <ion-icon :icon="settingsOutline"></ion-icon>
          <ion-label>Paramètres</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    
    <!-- Si l'utilisateur n'est pas connecté, afficher juste le router-outlet -->
    <ion-router-outlet v-else></ion-router-outlet>
  </ion-app>
</template>

<script setup>
import { ref } from 'vue';
import { 
  IonApp, 
  IonRouterOutlet, 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel 
} from '@ionic/vue';
import { 
  homeOutline, 
  settingsOutline,
  documentOutline
} from 'ionicons/icons';

// État de connexion (à connecter avec votre système d'authentification)
const isAuthenticated = ref(true);
</script>