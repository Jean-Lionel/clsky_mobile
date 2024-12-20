<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <ion-title class="page-title">Nouvelle enquête</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="survey-container">
        <div class="form-container">
          <h2 class="section-title">Informations de l'enquête</h2>
          
          <form @submit.prevent="handleSubmitSurvey" class="survey-form">
            <div class="form-grid">
              <ion-input
                label="Numéro de téléphone"
                label-placement="floating"
                fill="outline"
                type="tel"
                v-model="phone"
                required
                placeholder="Entrer le numéro"
              ></ion-input>

              <ion-input
                label="Nom et Prénom"
                label-placement="floating"
                fill="outline"
                v-model="fullName"
                required
                placeholder="Entrer le nom complet"
              ></ion-input>
            </div>

            <div class="form-grid">
              <ion-input
                label="Marché"
                label-placement="floating"
                fill="outline"
                v-model="market"
                required
                placeholder="Entrer le marché"
              ></ion-input>

              <ion-select
                label="Province"
                label-placement="floating"
                fill="outline"
                v-model="province"
                required
                placeholder="Sélectionner la province"
              >
                <ion-select-option value="kinshasa">Kinshasa</ion-select-option>
                <ion-select-option value="kongo-central">Kongo Central</ion-select-option>
              </ion-select>
            </div>

            <ion-textarea
              label="Description"
              label-placement="floating"
              fill="outline"
              v-model="description"
              required
              :rows="4"
              placeholder="Entrer une description détaillée"
            ></ion-textarea>

            <div class="button-container">
              <ion-button expand="block" type="submit" class="submit-button">
                Enregistrer l'enquête
              </ion-button>
            </div>
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, 
         IonButton, IonSelect, IonSelectOption, IonTextarea } from '@ionic/vue';
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

<style scoped>
.custom-toolbar {
  --background: #3880ff;
  --color: white;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
}

.survey-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.form-container {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: #2f3542;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  text-align: center;
}

.survey-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 8px;
}

ion-input, ion-select, ion-textarea {
  --border-radius: 8px;
  --border-width: 1px;
  --border-color: #d1d5db;
  --background: white;
  --padding-start: 12px;
  --padding-end: 12px;
  margin: 0;
}

ion-textarea {
  --border-radius: 8px;
  margin-top: 8px;
}

.button-container {
  margin-top: 24px;
}

.submit-button {
  --background: #3880ff;
  --border-radius: 8px;
  --box-shadow: 0 4px 12px rgba(56, 128, 255, 0.3);
  height: 48px;
  font-weight: 600;
  font-size: 16px;
}

/* Animation d'apparition */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-container {
  animation: slideIn 0.5s ease-out;
}

/* Media queries pour le responsive */
@media (max-width: 600px) {
  .survey-container {
    padding: 10px;
  }

  .form-container {
    padding: 16px;
    border-radius: 12px;
  }

  .section-title {
    font-size: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>