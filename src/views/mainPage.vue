<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab1" href="/main/dispo">
            <!-- <ion-icon aria-hidden="true" :icon="triangle" /> -->
            <Icon icon="healthicons:pharmacy-outline"  
            inline="true" width="30" height="30"/>
            <ion-label>Dispo</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="tab2" href="/main/vendu">
            <!-- <ion-icon aria-hidden="true" :icon="ellipse"/> -->
            <Icon icon="ep:sold-out"    
            inline="true" width="30" height="30"/>
            <ion-label>Vendu</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="tab3" href="/main/achats">
            <!-- <ion-icon aria-hidden="true" :icon="square" /> -->
            <Icon icon="arcticons:purchased-apps"     
            inline="true" width="30" height="30"/>
            <ion-label>Achats</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="tab4" href="/main/rotation">
            <ion-icon aria-hidden="true" :icon="addOutline" />
            <ion-label>Rotation</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="tab5" href="/main/plus">
            <!-- <ion-icon aria-hidden="true" :icon="micOffCircleOutline" /> -->
            <Icon icon="icon-park-twotone:more-app"   
            inline="true" width="30" height="30"/>
            <ion-label>Plus</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
  import { ellipse, square, triangle, addOutline, micOffCircleOutline } from 'ionicons/icons';
  import { Icon } from '@iconify/vue';
  </script>
  
  