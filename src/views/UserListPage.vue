<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Liste des personnes enregistrées</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <ion-list>
          <ion-item v-for="user in users" :key="user.id">
            <ion-label>
              <h2>{{ user.firstName }} {{ user.lastName }}</h2>
              <p>Téléphone: {{ user.phone }}</p>
              <p>Email: {{ user.email }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
  import { useStore } from 'vuex';
  import { computed, onMounted } from 'vue';
  
  export default {
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel },
    setup() {
      const store = useStore();
      const users = computed(() => store.state.users);
  
      onMounted(async () => {
        try {
          await store.dispatch('fetchUsers');
        } catch (error) {
          console.error('Erreur lors du chargement des utilisateurs:', error);
        }
      });
  
      return {
        users
      };
    }
  };
  </script>