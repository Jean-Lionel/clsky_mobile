<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Tableau de bord</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="handleLogout">
              <ion-icon :icon="logOutOutline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <!-- En-tête statistiques -->
        <div class="stats-container ion-padding">
          <ion-card class="stat-card">
            <ion-card-content>
              <div class="stat-value">{{ totalClients }}</div>
              <div class="stat-label">Total Enquêtes</div>
            </ion-card-content>
          </ion-card>
          
          <ion-card class="stat-card">
            <ion-card-content>
              <div class="stat-value">{{ todayClients }}</div>
              <div class="stat-label">Aujourd'hui</div>
            </ion-card-content>
          </ion-card>
        </div>
  
        <!-- Liste des enquêtes -->
        <ion-list>
          <ion-item-sliding v-for="client in clients" :key="client.id">
            <!-- Client Main Info -->
            <ion-item>
              <ion-label>
                <h2>{{ client.full_name }}</h2>
                <p>{{ client.market }} - {{ client.province }}</p>
                <p>{{ client.phone_number }}</p>
              </ion-label>
            </ion-item>
        
            <!-- Client Details -->
            <ion-item>
              <ion-label>
                <p>{{ client.description }}</p>
                <ion-row>
                  <ion-col>
                    <p>{{ formatDate(client.created_at) }}</p>
                  </ion-col>
                  <ion-col>
                    <p>Par: {{ client.user?.name || 'Unknown' }}</p>
                  </ion-col>
                </ion-row>
              </ion-label>
            </ion-item>
        
            <!-- Action Buttons -->
            <ion-item class="ion-text-end">
              <ion-buttons slot="end">
                <ion-button color="primary" @click="editClient(client.id)">
                  <ion-icon :icon="createOutline"></ion-icon>
                </ion-button>
                <ion-button color="danger" @click="deleteClient(client.id)">
                  <ion-icon :icon="trashOutline"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-item>
          </ion-item-sliding>
        </ion-list>
  
        <!-- FAB pour ajouter une nouvelle enquête -->
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button @click="goToNewSurvey" :style="{ '--background': '#FF6600' }">
            <ion-icon :icon="addOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
           IonItem, IonLabel, IonItemSliding, IonItemOption, IonItemOptions,
    IonFab, IonFabButton, IonIcon, IonCard, IonCardContent, IonButtons, IonButton,
    IonRow, IonNote,IonCol
 
    
  } from '@ionic/vue';
  import { addOutline, createOutline, trashOutline, logOutOutline } from 'ionicons/icons';
import axiosInstance from '../plugins/axios';
import { useStore } from 'vuex';
import formatDate from '../plugins/utils';
  
  const router = useRouter();
  
  const store = useStore();
  // Statistiques
  const totalClients = computed(() => clients.value.length);
  const todayClients = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return clients.value.filter(client => 
      client.created_at.startsWith(today)
    ).length;
  });


  
  // Charger les données
  const loadClients = async () => {
    try {
      const response = await axiosInstance.get('clients');

      store.state.clients = response.data;
    } catch (error) {
      console.error('Erreur lors du chargement des clients:', error);
    }
  };

  const clients = computed(() => store.state.clients );
  
  // Actions
  const editClient = (client) => {
    router.push(`/survey/${client.id}`);
  };
  
  const deleteClient = async (id) => {
    try {
      await axiosInstance.delete(id);
      await loadClients();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };
  
  const goToNewSurvey = () => {
    router.push('/survey');
  };
  
  const handleLogout = async () => {
    try {
      await axiosInstance.post('logout');
      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };
  
  onMounted(() => {
    loadClients();
  });
  </script>
  
  <style scoped>
  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  }
  
  .stat-card {
    margin: 0;
    --background: white;
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: 600;
    color: var(--ion-color-primary);
    text-align: center;
  }
  
  .stat-label {
    font-size: 14px;
    color: var(--ion-color-medium);
    text-align: center;
    margin-top: 4px;
  }
  
  ion-item-sliding {
    margin-bottom: 1px;
  }
  
  ion-item {
    --padding-start: 16px;
    --inner-padding-end: 16px;
  }
  
  ion-item h2 {
    font-weight: 600;
    color: var(--ion-color-dark);
  }
  
  ion-item p {
    margin-top: 4px;
    color: var(--ion-color-medium);
  }
  
  ion-fab-button {
    margin-bottom: 16px;
    margin-right: 16px;
  }
  </style>