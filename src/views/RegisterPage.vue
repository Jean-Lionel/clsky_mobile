<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="register-container">
        <div class="header-section">
          <img src="https://placehold.co/400" alt="Logo" class="logo" />
          <h1 class="title">Création de compte</h1>
        </div>
        
        <div class="form-container">
          <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-grid">
              <ion-item class="form-item">
                <ion-label position="floating">Nom</ion-label>
                <ion-input v-model="lastName" required class="custom-input"></ion-input>
              </ion-item>

              <ion-item class="form-item">
                <ion-label position="floating">Prénom</ion-label>
                <ion-input v-model="firstName" required class="custom-input"></ion-input>
              </ion-item>
            </div>

            <ion-item class="form-item">
              <ion-label position="floating">Téléphone</ion-label>
              <ion-input type="tel" v-model="phone" required class="custom-input"></ion-input>
            </ion-item>

            <ion-item class="form-item">
              <ion-label position="floating">Email</ion-label>
              <ion-input type="email" v-model="email" required class="custom-input"></ion-input>
            </ion-item>

            <ion-item class="form-item">
              <ion-label position="floating">Mot de passe</ion-label>
              <ion-input type="password" v-model="password" required class="custom-input"></ion-input>
            </ion-item>

            <div class="button-container">
              <ion-button expand="block" type="submit" class="register-button">
                S'inscrire
              </ion-button>

              <ion-button expand="block" fill="clear" router-link="/login" class="login-link">
                Déjà inscrit ? Se connecter
              </ion-button>
            </div>
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
</script>

<style scoped>
.register-container {
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  color: #2f3542;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.form-container {
  background: white;
  border-radius: 24px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 8px;
}

.form-item {
  --background: #f8f9fa;
  --border-color: transparent;
  --border-radius: 12px;
  --padding-start: 16px;
  --padding-end: 16px;
  margin: 0;
}

.form-item:hover {
  --background: #f1f3f5;
}

ion-item {
  --highlight-height: 2px;
  --highlight-color-focused: #3880ff;
}

.custom-input {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 12px;
  --padding-bottom: 12px;
}

.button-container {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.register-button {
  --background: #3880ff;
  --border-radius: 12px;
  --box-shadow: 0 4px 12px rgba(56, 128, 255, 0.3);
  margin: 0;
  height: 48px;
  font-weight: 600;
  font-size: 16px;
}

.login-link {
  --color: #3880ff;
  --border-radius: 12px;
  margin: 0;
  font-weight: 500;
}

/* Styles pour les états focus des inputs */
ion-input:focus {
  --background: #fff;
  --border-color: #3880ff;
}

/* Media queries pour le responsive */
@media (max-width: 480px) {
  .form-container {
    padding: 20px;
    border-radius: 20px;
  }

  .title {
    font-size: 24px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .logo {
    width: 60px;
    height: 60px;
  }
}

/* Animation d'apparition */
@keyframes fadeIn {
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
  animation: fadeIn 0.5s ease-out;
}
</style>