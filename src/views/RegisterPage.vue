<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Création de compte</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <form @submit.prevent="handleRegister">
          <ion-item>
            <ion-label position="floating">Nom</ion-label>
            <ion-input v-model="lastName" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Prénom</ion-label>
            <ion-input v-model="firstName" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Téléphone</ion-label>
            <ion-input type="tel" v-model="phone" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" v-model="email" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Mot de passe</ion-label>
            <ion-input type="password" v-model="password" required></ion-input>
          </ion-item>
  
          <ion-button expand="block" type="submit" class="ion-margin-top">
            S'inscrire
          </ion-button>
  
          <ion-button expand="block" fill="clear" router-link="/login">
            Déjà inscrit ? Se connecter
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
      const lastName = ref('');
      const firstName = ref('');
      const phone = ref('');
      const email = ref('');
      const password = ref('');
  
      const handleRegister = async () => {
        try {
          await store.dispatch('register', {
            lastName: lastName.value,
            firstName: firstName.value,
            phone: phone.value,
            email: email.value,
            password: password.value
          });
          router.push('/login');
        } catch (error) {
          console.error('Erreur d\'inscription:', error);
        }
      };
  
      return {
        lastName,
        firstName,
        phone,
        email,
        password,
        handleRegister
      };
    }
  };
  </script>