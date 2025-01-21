<template>
    <ion-page>
        <h1>MODIFICATION : {{fullName }}</h1>
        <p>Province {{ province }}</p>
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
                <ion-select-option  v-for="p in burundianProvinces" :value="p"
                  :key="p"
                  
                  >
                  {{ p }}
                </ion-select-option>
            
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
              <ion-button expand="block" type="submit" class="submit-button custom-toolbar" >
               Modifier les Informations 
              </ion-button>
            </div>
          </form>
    </ion-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
         IonItem, IonLabel, IonItemSliding, IonItemOption, IonItemOptions,
         IonFab, IonFabButton, IonIcon, IonCard, IonCardContent, IonButtons, 
         IonButton, IonRow, IonNote, IonCol, IonSpinner
} from '@ionic/vue';
import { onMounted, watch, onUpdated, ref } from 'vue';
import axiosInstance from '../plugins/axios';

const route = useRouter();
//const formulaire = ref({
const form = ref();

onUpdated(() => {
    getCustomer();
})

// onMounted(() => {
//     //
// })
const itemID = ref('');
const phone = ref('');
const fullName = ref('');
const market = ref('');
const province = ref('');
const description = ref('');
const router = useRouter();
const burundianProvinces = ref([
  'Bubanza', 'Bujumbura Mairie', 'Bujumbura Rural', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi', 'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi', 'Rutana', 'Ruyigi'
])

const getCustomer = async () => {
    const resp = await axiosInstance.get(`clients/${route.currentRoute.value.params.surveyId}`)
    //form.value = resp.data;
    //  alert("Je suis un hacker")
    phone.value = resp.data.phone_number;
    fullName.value = resp.data.full_name;
    market.value = resp.data.market;
    province.value = resp.data.province;
    description.value = resp.data.description;
    itemID.value = resp.data.id
}

const handleSubmitSurvey = async () => {

  const response = await axiosInstance.put(`clients/${itemID.value}`, {
    id : itemID.value,
    phone_number: phone.value,
    full_name: fullName.value,
    market: market.value,
    province: province.value,
    description: description.value
  })
}


</script>

<style lang="scss" scoped>

</style>