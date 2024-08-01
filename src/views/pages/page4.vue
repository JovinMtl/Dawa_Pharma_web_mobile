<template>
  <ion-page>
      <ion-header style="display: flex; background-color: black; width: 100%; height: 5vh;
      align-items: center; padding: 10px;">
        <div class="title w-30">
          Suggestion
        </div>
        <div class="cherc inTitle">
          
          <div ref="manDateTime" class="manDate">
            <ion-datetime-button datetime="datetime"></ion-datetime-button>

            <ion-modal :keep-contents-mounted="true">
              <ion-datetime v-model="date1" id="datetime"></ion-datetime>
            </ion-modal>
          </div>
          <div class="dateControl" @click="turnDate">
            <ion-icon :icon="calendarClearOutline" style="font-size: 1.8rem;
            font-weight: 700; margin: 0 10px;">
            </ion-icon>
          </div>
          
        </div>
        
          <div class="cherc inTitle">
            <ion-icon :icon="calendarOutline" style="font-size: 2rem;
          font-weight: 700; margin: 0 2rem;">
          </ion-icon>
          </div>
          
          <ion-icon :icon="chevronForwardOutline" style="font-size: 2.5rem;
          font-weight: 900; margin: 0 2rem;"></ion-icon>
          
      </ion-header>
    <ion-content :fullscreen="true">

      <div class="page1Container" style="width: 100%; height: 100%; overflow: hidden;">
         <div class="content1" style="background-color: greenyellow; width: 100%; height: 4px">
          <div class="element1"></div>
         </div>
         <div class="content2" style="background-color: grey; width: 100%; height: 98%; font-weight: 700;">
          <div class="element1" style="display: flex;width: 100%; height: 25px">
            <div class="elem1" style="width: 30%; height: 100%; border: 1px solid black; color: #000;">
              Médicament
            </div>
            <div class="elem2" style="width: 10%; height: 100%; border: 1px solid black; color: #000;">
              Qte
            </div>
            <div class="elem3" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
              Px.A
            </div>
            <div class="elem4" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
              Px.V
            </div>
            <div class="elem5" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
              Bénéf
            </div>
          </div>

          <div class="element2" style="background-color: white; width: 100%; height: 91%; 
            color: #000;overflow: auto;">
            <div v-for="med in disponible" class="element1" style="display: flex;width: 100%; height: 25px;
                 ">
              <div class="elem1" style="width: 30%; height: 100%; border: 1px solid black; color: #000;">
                {{ (med.name_umuti).slice(0,8) }}
              </div>
              <div class="elem2" style="width: 10%; height: 100%; border: 1px solid black; color: #000;">
                {{ med.quantite_restant }}
              </div>
              <div class="elem3" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ med.price_in }}
              </div>
              <div class="elem4" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ med.price_out }}
              </div>
              <div class="elem5" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ (Number(med.price_out) - Number(med.price_in)) * (Number(med.quantite_restant)) }}
              </div>
            </div>
          </div>

          <div class="element2" style="width: 100%; height: 5%; color: #000;">
            <div class="element1" style="display: flex;width: 100%; height: 25px; text-align: center;">
              <div class="elem1" style="width: 30%; height: 100%; border: 1px solid black; color: #000;">
                Total
              </div>
              <div class="elem2" style="width: 10%; height: 100%; border: 1px solid black; color: #000;">
                {{ qte_t }}
              </div>
              <div class="elem3" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ pa_t }}
              </div>
              <div class="elem4" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ pv_t }}
              </div>
              <div class="elem5" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ ben_t }}
              </div>
            </div>
          </div>
         </div>
         <div class="content3" style="background-color: greenyellow; width: 100%; height: 4px"></div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
  import { 
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonIcon, IonInput, 
    IonDatetime, IonDatetimeButton, IonModal,
  } from '@ionic/vue';
  import { chevronBackOutline, chevronForwardOutline,
    calendarOutline, calendarClearOutline, searchOutline
   } from 'ionicons/icons'


import { useKuvoma } from '../hooks/kuvoma.js'
  import { useDateStore } from '../../store/dates'

const disponible = ref(null)
const totaux = ref(null)
const qte_t = ref(0)
const pa_t = ref(0)
const pv_t = ref(0)
const ben_t = ref(0)
  const date1 = ref(null)
  const manDateTime = ref(null)
  const { getDate1, getDate2, setDate1, setDate2  } = useDateStore()

const suggest_url = 'api/rep/workOn35/'
const suggest2_url = 'api/rep/beneficeEval/'
const [dispo, kuvoma_function] = useKuvoma(suggest_url)


const turnDate = ()=>{
    manDateTime.value.firstChild.shadowRoot.firstChild.click()
    console.log(" REF holds: ", manDateTime.value.firstChild.shadowRoot.firstChild)
    console.log("The date gotten : ", date1.value)
  }
const openDate = ()=>{
    // attempting to open date
    const dateElement = document.getElementById('date-button')
    // console.log("Now the date element is : ", dateJove.value.firstChild.click())
    // dateJove.value.firstChild.firstChild.click()
    // dateElement.click()
    console.log("THe content is: ", dateElement.innerHTML)
}
const totaux_function = ()=>{
  let qte = 0
  let pa = 0
  let pv = 0

  disponible.value.forEach(element => {
    qte += element.quantite_restant
    pa += element.price_in * element.quantite_restant
    pv += element.price_out * element.quantite_restant
  });

  qte_t.value = qte
  pa_t.value = pa
  pv_t.value = pv
  ben_t.value = pv - pa
}

onMounted(()=>{
  kuvoma_function()
})

watch(dispo, (value)=>{
  console.log("Dispo changed into :", value)
  if(value.response != 'empty'){
        disponible.value = value
        totaux_function()
    }
})
</script>
