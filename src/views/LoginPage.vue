<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Connexion</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <form @submit.prevent="handleLogin">
          <ion-item>
            <ion-label position="floating">Nom d'utilisateur</ion-label>
            <ion-input v-model="username" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Mot de passe</ion-label>
            <ion-input type="password" v-model="password" required></ion-input>
          </ion-item>
  
          <ion-button expand="block" type="submit" class="ion-margin-top">
            Se connecter
          </ion-button>
  
          <ion-button expand="block" fill="clear" router-link="/register">
            Créer un compte
          </ion-button>
        </form>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
  import { useStore } from 'vuex';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton },
    setup() {
      const store = useStore();
      const router = useRouter();
      const username = ref('');
      const password = ref('');
  
      const handleLogin = async () => {
        try {
          await store.dispatch('login', {
            username: username.value,
            password: password.value
          });
          router.push('/survey');
        } catch (error) {
          console.error('Erreur de connexion:', error);
        }
      };
  
      return {
        username,
        password,
        handleLogin
      };
    }
  };
  </script>