<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tableau de bord
        </ion-title>
      <ion-item>
        <ion-note slot="end">
          Bonjour :  {{ connectedUser.user.name }}
        </ion-note>
        <ion-label>
          <ion-button>
            <ion-icon name="notifications-outline"></ion-icon>
          </ion-button>
         
        </ion-label>
      </ion-item>
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
        <ion-item-sliding v-for="client in currentClients" :key="client.id">
          <ion-item>
            <ion-label>
              <h2>{{ client.full_name }}</h2>
              <p>{{ client.market }} - {{ client.province }}</p>
              <p>{{ client.phone_number }}</p>
            </ion-label>
          </ion-item>
          
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
          
          <ion-item class="ion-text-end">
            <ion-buttons slot="end">
              <ion-button color="primary" @click="editClient(client.id)">
                <ion-icon :icon="createOutline"></ion-icon>
              </ion-button>
              <!-- <ion-button color="danger" @click="deleteClient(client.id)">
                <ion-icon :icon="trashOutline"></ion-icon>
              </ion-button> -->
            </ion-buttons>
          </ion-item>
          
          <ion-accordion-group v-if="client.client_history.length > 0
&& connectedUser.user.role == 'ADMINISTRATEUR'
">
            <ion-accordion value="first">
              <ion-item slot="header" color="light">
                <ion-label>
                  <h3>Historique</h3>
                </ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">
               
                <ion-list>
                  <ion-item v-for="history in client.client_history" :key="history.id">
                    <ion-icon color="danger" slot="start" :icon="listCircle" size="large"></ion-icon>
                      <ion-label>{{history.full_name}} | {{history.province}}</ion-label>
                      <ion-note slot="end">{{ history.phone_number }} <br>
                       
                        <ion-label color="primary" v-if="history.used == 'ACCEPTED'"> {{ history.used  }}</ion-label>
                        <ion-label color="danger" v-if="history.used == 'REFUSE'"> {{ history.used  }}</ion-label>
                      </ion-note>
                      <ion-icon color="primary" @click="validateChange(history.id)" slot="end" :icon="checkmarkCircle" size="large"
                      v-if="!history.used "
                      ></ion-icon>
                      <ion-icon   v-if="!history.used " color="default" slot="end" @click="refuseChange(history.id)" :icon="closeCircle" size="large"></ion-icon>
                  </ion-item>
                  
                  </ion-list>  
              </div>
            </ion-accordion>
          </ion-accordion-group>
        </ion-item-sliding>
      </ion-list>
      
      <!-- Indicateur de chargement -->
      <div ref="loadingTrigger" class="loading-trigger">
        <ion-spinner v-if="isLoading"></ion-spinner>
      </div>
      
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
  IonFab, IonFabButton, IonIcon, IonCard, IonCardContent, IonButtons, 
  IonButton, IonRow, IonNote, IonCol, IonSpinner,
  IonAccordion,
  IonAccordionGroup,

} from '@ionic/vue';
import { addOutline,checkmarkCircle,closeCircle, createOutline, logOutOutline ,listCircle} from 'ionicons/icons';
import axiosInstance from '../plugins/axios';
import { useStore } from 'vuex';
import formatDate from '../plugins/utils';

const router = useRouter();
const store = useStore();
const loadingTrigger = ref(null);
const isLoading = ref(false);
const currentPage = ref(1);
const hasMorePages = ref(true);
const clients = ref([]);


const currentClients = computed(() => clients.value.sort((a, b) => a.totalModifications < b.totalModifications ? 1 : -1));

// Statistiques
const totalClients = computed(() => store.state.totalClients || 0);
const todayClients = computed(() => {
  const today = new Date().toISOString().split('T')[0];
  return clients.value.filter(client => 
  client.created_at.startsWith(today)
  ).length;
});

const refuseChange = async (item) => {
  await axiosInstance.get(`refuse/${item}`)
  window.location.reload();
 
}
const validateChange = async (item) => {
  await axiosInstance.get(`accepte/${item}`)
  window.location.reload();
}

// Configuration de l'Intersection Observer
const setupInfiniteScroll = () => {
  const observer = new IntersectionObserver(
  (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading.value && hasMorePages.value) {
      loadMoreClients();
    }
  },
  {
    threshold: 0.5
  }
  );
  
  if (loadingTrigger.value) {
    observer.observe(loadingTrigger.value);
  }
};

// Charger plus de clients
const loadMoreClients = async () => {
  if (isLoading.value || !hasMorePages.value) return;
  
  try {
    isLoading.value = true;
    const response = await axiosInstance.get(`clients?page=${currentPage.value}`);
    
    // Mettre à jour les données
    clients.value = [...clients.value, ...response.data.data];
    store.commit('setTotalClients', response.data.total);
    
    // Mettre à jour la pagination
    currentPage.value++;
    hasMorePages.value = currentPage.value <= response.data.last_page;
  } catch (error) {
    console.error('Erreur lors du chargement des clients:', error);
  } finally {
    isLoading.value = false;
  }
};

// Actions
const editClient = (clientId) => {
  router.push(`/survey/${clientId}`);
};

const deleteClient = async (id) => {
  try {
    await axiosInstance.delete(`clients/${id}`);
    clients.value = clients.value.filter(client => client.id !== id);
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
    localStorage.removeItem("user");
    localStorage.removeItem("token");

   // router.push('/login');
    window.location.href = '/login';
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};

const connectedUser = computed(() => {
  const u = JSON.parse(localStorage.getItem('user')); 
  ///console.log();
  return u
})

onMounted(() => {
  setupInfiniteScroll();
  loadMoreClients();
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

.loading-trigger {
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-bottom: 60px;
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