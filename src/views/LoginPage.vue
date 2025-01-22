<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="login-container">
        <div class="logo-container">
          <img src="../assets/logo/logo.png" alt="Logo" class="logo" />
        </div>      
        <div class="form-container">
          <h1 class="title">Connexion</h1>
          <form @submit.prevent="handleLogin" class="login-form">
            <ion-input
              v-model="username"
              label="Nom d'utilisateur"
              label-placement="floating"
              fill="outline"
              placeholder="Entrer votre nom d'utilisateur"
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
           <ion-list v-if="errorMessage">
            <ion-item>
              <ion-label color="danger">
                {{ errorMessage }}
              </ion-label>
            </ion-item>
           </ion-list>
            <ion-button expand="block" type="submit" class="login-button">
              Se connecter
            </ion-button>

           
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
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  try {
   // console.log(store)
    await store.dispatch('login', {
      username: username.value,
      password: password.value
    });
    router.push('/dashboard');
  } catch (error) {
    console.error('Erreur de connexion:', error);
    errorMessage.value = error.response.data.message
  }
};
</script>

<style scoped>
:root {
  --clsky-orange: #FF6600;
  --clsky-dark: #333333;
}

.login-container {
  min-height: 100%;
  background-image: url('../assets/logo/logo.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}

.logo-container {
  margin-top: 40px;
  margin-bottom: 30px;
}

.logo {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  color: var(--clsky-dark);
  font-size: 24px;
  margin-bottom: 24px;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.login-button {
  margin-top: 24px;
  --background: #ff7519;
  --background-hover: #ff6600;
  --background-activated: #e65c00;
  --border-radius: 8px;
  --box-shadow: 0 4px 12px rgba(255, 102, 0, 0.3);
  height: 48px;
  font-weight: 600;
  font-size: 16px;
}

.register-button {
  margin-top: 12px;
  --color: var(--clsky-orange);
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

/* Responsive design */
@media (max-width: 480px) {
  .form-container {
    padding: 16px;
  }

  .logo {
    width: 100px;
    height: 100px;
  }

  .title {
    font-size: 20px;
  }
}

/* États focus */
.custom-input:focus {
  --border-color: var(--clsky-orange);
  --border-width: 2px;
}
</style>