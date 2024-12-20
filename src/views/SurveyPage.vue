<!-- src/views/SurveyPage.vue -->
<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Nouvelle enquête</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <form @submit.prevent="handleSubmitSurvey">
          <ion-item>
            <ion-label position="floating">Numéro de téléphone</ion-label>
            <ion-input type="tel" v-model="phone" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Nom et Prénom</ion-label>
            <ion-input v-model="fullName" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Marché</ion-label>
            <ion-input v-model="market" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Province</ion-label>
            <ion-select v-model="province" required>
              <ion-select-option value="kinshasa">Kinshasa</ion-select-option>
              <ion-select-option value="kongo-central">Kongo Central</ion-select-option>
              <!-- Ajoutez d'autres provinces selon vos besoins -->
            </ion-select>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Description</ion-label>
            <ion-textarea v-model="description" required></ion-textarea>
          </ion-item>
  
          <ion-button expand="block" type="submit" class="ion-margin-top">
            Enregistrer l'enquête
          </ion-button>
        </form>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, 
           IonInput, IonButton, IonSelect, IonSelectOption, IonTextarea } from '@ionic/vue';
  import { useStore } from 'vuex';
  import { ref } from 'vue';
  
      const store = useStore();
      const phone = ref('');
      const fullName = ref('');
      const market = ref('');
      const province = ref('');
      const description = ref('');
  
      const handleSubmitSurvey = async () => {
        try {
          await store.dispatch('submitSurvey', {
            phone: phone.value,
            fullName: fullName.value,
            market: market.value,
            province: province.value,
            description: description.value
          });
          // Réinitialiser le formulaire
          phone.value = '';
          fullName.value = '';
          market.value = '';
          province.value = '';
          description.value = '';
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement:', error);
        }
      };

  
  </script>
  
  <!-- src/views/UserListPage.vue -->
 