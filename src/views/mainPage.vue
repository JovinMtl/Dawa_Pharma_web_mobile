<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab1" href="/main/dispo">
            <Icon icon="healthicons:pharmacy-outline"  
            inline="true" width="30" height="30"/>
            <ion-label>Dispo</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="tab2" href="/main/vendu">
            <Icon icon="ep:sold-out"    
            inline="true" width="30" height="30"/>
            <ion-label>Vendu</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="tab3" href="/main/achats">
            <Icon icon="arcticons:purchased-apps"     
            inline="true" width="30" height="30"/>
            <ion-label>Achats</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="tab4" href="/main/rotation">
            <Icon icon="hugeicons:recycle-01"      
            width="30" height="30"/>
            <ion-label>Rotation</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="tab5" href="/main/plus">
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
  import { Icon } from '@iconify/vue';
  </script>
  
  