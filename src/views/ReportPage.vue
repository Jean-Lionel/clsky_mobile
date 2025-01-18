<template>
    <ion-page>
      <ion-header>
        <ion-toolbar class="custom-toolbar">
          <ion-title class="page-title">Recherche</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div class="search-container">
          <form @submit.prevent="handleSubmitSearch">
            <div class="form-grid ion-padding">
              <!-- Première rangée -->
              <div class="input-group">
                <ion-item class="custom-item">
                    <ion-lable>
                        <ion-icon :icon="callOutline" slot="start" class="input-icon"></ion-icon>
                    </ion-lable>
                    <ion-label>
                        
                    </ion-label>
                   
                  <ion-input
                    label="Téléphone"
                    label-placement="floating"
                    fill="solid"
                    type="tel"
                    size="small"
                    v-model="search.phone_number"
                    placeholder="Numéro"
                  >
                    
                  </ion-input>
                </ion-item>
              </div>
  
              <div class="input-group">
                <ion-item class="custom-item">
                  <ion-input
                    label="Nom complet"
                    label-placement="floating"
                    fill="solid"
                    v-model="search.full_name"
                    placeholder="Nom"
                  >
                    <!-- <ion-icon :icon="personOutline" slot="start" class="input-icon"></ion-icon> -->
                  </ion-input>
                </ion-item>
              </div>
  
              <!-- Deuxième rangée -->
              <div class="input-group">
                <ion-item class="custom-item">
                  <ion-input
                    label="Marché"
                    label-placement="floating"
                    fill="solid"
                    v-model="search.market"
                    placeholder="Marché"
                  >
                    <!-- <ion-icon :icon="storefrontOutline" slot="start" class="input-icon"></ion-icon> -->
                  </ion-input>
                </ion-item>
              </div>
  
              <div class="input-group">
                <ion-item class="custom-item">
                  <ion-select
                    label="Province"
                    label-placement="floating"
                    fill="solid"
                    v-model="search.province"
                    placeholder="Province"
                    interface="action-sheet"
                    :interfaceOptions="{ header: 'Provinces' }"
                >
                <ion-select-option value="">Tous</ion-select-option>
                    <!-- <ion-icon :icon="locationOutline" slot="start" class="input-icon"></ion-icon> -->
                    <ion-select-option v-for="province in provinces" 
                      :value="province"
                      :key="province">
                      {{ province }}
                    </ion-select-option>
                  </ion-select>
                </ion-item>
              </div>
  
              <!-- Troisième rangée -->
              <div class="input-group full-width">
                <ion-item class="custom-item">
                  <ion-select
                    label="Utilisateur"
                    label-placement="floating"
                    fill="solid"
                    v-model="search.user_id"
                    placeholder="Utilisateur"
                    interface="action-sheet"
                    :interfaceOptions="{ header: 'Utilisateurs' }"
                  >
                  <ion-select-option value="">Tous</ion-select-option>
                    <!-- <ion-icon :icon="peopleOutline" slot="start" class="input-icon"></ion-icon> -->
                    <ion-select-option v-for="user in users" 
                      :value="user.id"
                      :key="user.id">
                      {{ user.name }}
                    </ion-select-option>
                  </ion-select>
                </ion-item>
              </div>
            </div>
  
            <div class="button-container ion-padding">
              <div class="button-grid">
                <ion-button 
                  fill="outline" 
                  @click="resetForm" 
                  class="reset-button"
                >
                  <ion-icon :icon="refreshOutline" slot="start"></ion-icon>
                  Réinitialiser
                </ion-button>
                
                <ion-button 
                  type="submit" 
                  class="submit-button"
                >
                  <ion-icon :icon="searchOutline" slot="start"></ion-icon>
                  Rechercher
                </ion-button>

              </div>
            </div>
          </form>
        </div>
     <div>
        <h1>Resultats de la recherche</h1>
        <div>
          Totals des Clients :  <strong>{{ clients.length }}</strong>
        </div>
     </div>
      
        <ion-list>
            <ion-item v-for="client in clients" :key="client.id">
                <ion-label>
                <h2> {{ client.full_name }}</h2>
                <p> Phone :  {{ client.phone_number }}</p>
                <p> Marche :  {{ client.market }} </p>
                <p> Province : {{ client.province }}</p>
                <p>Enqueteur : {{client.user.name ?? ""}}</p>
                </ion-label>
                
            </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, 
           IonButton, IonSelect, IonSelectOption, IonItem, IonIcon } from '@ionic/vue';
  import { searchOutline, refreshOutline, callOutline, personOutline, 
           storefrontOutline, locationOutline, peopleOutline } from 'ionicons/icons';
  import { computed, ref , onMounted} from 'vue';
  import { useStore } from 'vuex';
import axiosInstance from '../plugins/axios';
  
  const store = useStore();
  
  const search = ref({
    phone_number: '',
    full_name: '',
    market: '',
    province: '',
    user_id: ''
  });
  
  const provinces = ref([
   
    'Bubanza', 'Bujumbura Mairie', 'Bujumbura Rural', 'Bururi', 
    'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi', 'Kayanza', 
    'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 
    'Ngozi', 'Rutana', 'Ruyigi'
  ]);
  
  const users = computed(() => store.state.users)

  onMounted(async () => {
    try {
      const resp = await axiosInstance.get("users");
      store.state.users = resp.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des rapports:', error);
    }
  });


  const handleSubmitSearch = async () => {
    try {
        //await store.dispatch('searchReports', search.value);
        const resp = await axiosInstance.post("reports", search.value);
        store.state.reports = resp.data;
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
};

const clients = computed(() =>  store.state.reports)
  
  const resetForm = () => {
    search.value = {
      phone_number: '',
      full_name: '',
      market: '',
      province: '',
      user_id: ''
    };
  };
  </script>
  
  <style scoped>
  .custom-toolbar {
    --background: #FF6600;
    --color: white;
  }
  
  .page-title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
  
  .search-container {
    padding-top: 8px;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    padding: 8px;
  }
  
  .input-group {
    width: 100%;
  }
  
  .full-width {
    grid-column: 1 / -1;
  }
  
  .custom-item {
    --padding-start: 0;
    --inner-padding-end: 0;
    --background: transparent;
    margin: 0;
    min-height: 50px;
  }
  
  ion-input, ion-select {
    --background: #f8f9fa;
    --border-radius: 8px;
    --padding-start: 24px; /* Réduit la marge à gauche pour un look plus compact */
    --padding-end: 8px;
    --highlight-height: 1px;
    font-size: 12px; /* Réduit la taille de la police */
    max-height: 40px; /* Réduit la hauteur du champ */
    min-height: 40px; /* Réduit la hauteur du champ */
  }
  
  .input-icon {
    color: #FF6600;
    margin-left: 8px;
    font-size: 14px; /* Réduit la taille des icônes */
    position: absolute;
    z-index: 2;
  }
  
  .button-container {
    margin-top: 16px;
    padding: 0 8px;
  }
  
  .button-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  
  .reset-button {
    --border-color: #FF6600;
    --color: #FF6600;
    --border-width: 1px;
    --border-radius: 8px;
    --box-shadow: none;
    height: 36px; /* Réduit la hauteur des boutons */
    font-size: 12px; /* Réduit la taille du texte */
    margin: 0;
  }
  
  .submit-button {
    --background: #FF6600;
    --background-activated: #e65c00;
    --border-radius: 8px;
    --box-shadow: 0 2px 6px rgba(255, 102, 0, 0.2);
    height: 36px; /* Réduit la hauteur des boutons */
    font-size: 12px; /* Réduit la taille du texte */
    margin: 0;
  }
  
  .submit-button ion-icon, .reset-button ion-icon {
    font-size: 16px; /* Réduit la taille des icônes dans les boutons */
  }
  
  /* Animation d'entrée */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .input-group {
    animation: fadeInUp 0.2s ease-out forwards;
  }
  
  .input-group:nth-child(2) {
    animation-delay: 0.05s;
  }
  
  .input-group:nth-child(3) {
    animation-delay: 0.1s;
  }
  
  .input-group:nth-child(4) {
    animation-delay: 0.15s;
  }
  
  .input-group:nth-child(5) {
    animation-delay: 0.2s;
  }
  
  .button-container {
    animation: fadeInUp 0.2s ease-out forwards;
    animation-delay: 0.25s;
  }
  
  @media (max-width: 320px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
    
    .button-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
  