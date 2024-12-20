<template>
    <ion-page>
      ...
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-checkbox label-placement="end" justify="start">
              <h1>Create Idea</h1>
              <ion-note>Run Idea By Brandy</ion-note>
            </ion-checkbox>
            <ion-badge color="success" slot="end">5 Days</ion-badge>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup >
    import {
      IonBadge,
      IonCheckbox,
      IonContent,
      IonHeader,
      IonItem,
      IonList,
      IonNote,
      IonPage,
      IonTitle,
      IonToolbar,
    } from '@ionic/vue';
  </script>