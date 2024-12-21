<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="register-container">
        <div class="header-section">
          <img src="../assets/logo/logo.png" alt="Logo" class="logo" />
          <h1 class="title">Création de compte</h1>
        </div>
        
        <div class="form-container">
          <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-grid">
              <ion-input
                v-model="lastName"
                label="Nom"
                label-placement="floating"
                fill="outline"
                placeholder="Entrer votre nom"
                class="custom-input"
                required
              ></ion-input>

              <ion-input
                v-model="firstName"
                label="Prénom"
                label-placement="floating"
                fill="outline"
                placeholder="Entrer votre prénom"
                class="custom-input"
                required
              ></ion-input>
            </div>

            <ion-input
              v-model="phone"
              label="Téléphone"
              label-placement="floating"
              fill="outline"
              type="tel"
              placeholder="Entrer votre numéro de téléphone"
              class="custom-input"
              required
            ></ion-input>

            <ion-input
              v-model="email"
              label="Email"
              label-placement="floating"
              fill="outline"
              type="email"
              placeholder="Entrer votre email"
              class="custom-input"
              required
            ></ion-input>

            <ion-input
              v-model="password"
              label="Mot de passe"
              label-placement="floating"
              fill="outline"
              type="password"
              placeholder="Entrer votre mot de passe"
              class="custom-input"
              required
            ></ion-input>

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
import { IonPage, IonContent, IonInput, IonButton } from '@ionic/vue';
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
const role = ref('ENQUETEUR');

const handleRegister = async () => {
  try {
    await store.dispatch('register', {
      lastName: lastName.value,
      firstName: firstName.value,
      role: role.value,
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
:root {
  --clsky-orange: #FF6600;
  --clsky-dark: #333333;
}

.register-container {
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
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
  border-radius: 4px;
  margin-bottom: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  color: var(--clsky-dark);
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.form-container {
  background: white;
  border-radius: 24px;
  padding: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.custom-input {
  --border-radius: 8px;
  --border-width: 1px;
  --border-color: #d1d5db;
  --background: white;
  --padding-start: 12px;
  --padding-end: 12px;
  --highlight-color: var(--clsky-orange);
  --placeholder-color: #666;
  --color: var(--clsky-dark);
}

.custom-input:hover {
  --border-color: var(--clsky-orange);
}

.button-container {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.register-button {
  --background: rgba(255, 102, 0, 0.9);
  --background-hover: #ff7519;
  --background-activated: #e65c00;
  --border-radius: 8px;
  --box-shadow: 0 4px 12px rgba(255, 102, 0, 0.3);
  margin: 0;
  height: 48px;
  font-weight: 600;
  font-size: 16px;
}

.login-link {
  --color: rgba(255, 102, 0, 0.9);
  --border-radius: 8px;
  margin: 0;
  font-weight: 500;
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

/* Media queries pour le responsive */
@media (max-width: 480px) {
  .form-container {
    padding: 10px;
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

/* États focus */
.custom-input:focus {
  --border-color: var(--clsky-orange);
  --border-width: 2px;
}
</style>