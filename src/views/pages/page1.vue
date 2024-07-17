<template>
    <ion-page>
      <ion-header style="display: flex; background-color: black; width: 100%; height: 5vh;
      align-items: center; padding: 10px;">
        <div class="icon1 inTitle" >
          <ion-icon :icon="chevronBackOutline" style="font-size: 2.5rem;
          font-weight: 900; margin: 0 10px;"></ion-icon>
        </div>
        <div class="title inTitle">
           Filtrer
        </div>
        <div class="cherc inTitle">
          
          <div ref="manDateTime" class="manDate">
            <ion-datetime-button datetime="datetime"></ion-datetime-button>

            <ion-modal :keep-contents-mounted="true">
              <ion-datetime id="datetime"></ion-datetime>
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
          font-weight: 700; margin: 0 10px;">
          </ion-icon>
          </div>
          
          <div class="cherc inTitle">
            <ion-input placeholder="tapez"></ion-input>
          </div>
          <div class="cherc inTitle">
            <ion-icon :icon="searchOutline" style="font-size: 2rem;
          font-weight: 700;">
          </ion-icon>
          </div>
          
          <ion-icon :icon="chevronForwardOutline" style="font-size: 2.5rem;
          font-weight: 900; margin: 0 10px;"></ion-icon>
          
      </ion-header>
      <ion-content>
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
  
            <div class="element2 gestyle">
              <div v-for="(med, index) in disponible" 
                class="element1"
                :class=" index % 2 == 0 ? 'bg2': 'bg1'" 
                style="display: flex;width: 100%; height: 25px;
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
  
            <div class="element2" style="position: fixed;width: 100%; height: 5%; color: #000; top: 84vh;
                ">
              <div class="element1" style="display: flex;width: 100%; height: 25px; text-align: left;background-color: #fff;">
                <div class="elem1" style="width: 30%; height: 100%; border: 1px solid black; color: #000;
                      text-align: center;">
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
           <div class="content3" style="background-color: greenyellow; width: 100%; height: 4px;"></div>
           <div class="content4" style="background-color: greenyellow; width: 100%; height: 6vh"></div>
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
  import { useImitiSetStore } from '../../store/imitiset'


  const { is_Stored, getPagedImiti, addPagedImiti } = useImitiSetStore()
  const disponible = ref(null)
  const totaux = ref(null)
  const qte_t = ref(0)
  const pa_t = ref(0)
  const pv_t = ref(0)
  const ben_t = ref(0)
  const manDateTime = ref(null)

  const turnDate = (event)=>{
    const ele = event.target.parentNode
    console.log("the content: ", ele.textContent)
    const elem = document.querySelector('.manDate')
    // document.getElementById('open-modal').click();
    // elem.style.display = 'block'
    const dateInput = document.getElementById('date-button');
    // dateInput.style.display = 'block';
    // dateInput.click();
    // ele.click()
    manDateTime.value.firstChild.shadowRoot.firstChild.click()
    console.log(" REF holds: ", manDateTime.value.firstChild.shadowRoot.firstChild)
  }
  
  const url_kuvoma = 'api/out/dispo/'
  const page_number = ref(1)
  // before calling the composable, first check its availability in the store. 
  const [dispo, kuvoma_function] = useKuvoma(url_kuvoma, page_number.value)
 
  
  onMounted(()=>{
    kuvoma_function()
  })
  
  watch(page_number, (value)=>{
    if(is_Stored(value)){
      disponible.value = getPagedImiti(value)
    } else{
      kuvoma_function()
    }
  })
  watch(dispo, (value)=>{
    console.log("Dispo changed into :", value)
    disponible.value = value.data
    qte_t.value = value.syntesis.qte
    pa_t.value = value.syntesis.pa_t
    pv_t.value = value.syntesis.pv_t
    ben_t.value = value.syntesis.benefice
    // adding in the store
    addPagedImiti(value.syntesis.page_number, value.data)
  })
  </script>
  
  <style scoped>
  .manDate{
    /* display: none; */
    /* position: relative;
    top: 150px; */
  }
  .title{
    font-weight: 700;
  }
  .inTitle{
    width: 15vw;
  }
  </style>