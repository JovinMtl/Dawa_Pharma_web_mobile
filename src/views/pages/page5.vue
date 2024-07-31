<template>
    <ion-page>
      <ion-header style="display: flex; background-color: black; width: 100%; height: 5vh;
      align-items: center; padding: 10px;">
        <!-- <div class="circlesMenu" style="text-align: center; 
                justify-content: center; align-items: center; padding-top: 15%"> -->
            <div class="mainContainerCircle">
                <!-- Here are the circles -->
                <div class="item violet" @click="getLowStock"></div>
                <div class="item yellow" @click="getEndStock"></div>
                <div class="item red" @click="getOutDate"></div>
                <div class="item black" @click="getAllFine"></div>
            </div>
        <!-- </div> -->
    
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
  import { useDateStore } from '../../store/dates'


  const { is_Stored, getPagedImiti, addPagedImiti } = useImitiSetStore()
  const disponible = ref(null)
  const totaux = ref(null)
  const qte_t = ref(0)
  const pa_t = ref(0)
  const pv_t = ref(0)
  const ben_t = ref(0)
  const date1 = ref(null)
  const manDateTime = ref(null)
  const { getDate1, getDate2, setDate1, setDate2  } = useDateStore()

  const turnDate = ()=>{
    manDateTime.value.firstChild.shadowRoot.firstChild.click()
    console.log(" REF holds: ", manDateTime.value.firstChild.shadowRoot.firstChild)
    console.log("The date gotten : ", date1.value)
  }
  
  const url_kuvoma = 'api/out/dispo/'
  const page_number = ref(1)
  // before calling the composable, first check its availability in the store. 
  const [dispo, kuvoma_function] = useKuvoma(url_kuvoma, page_number.value)
 
  const search = ()=>{
    // should send a request to the server according to dates and input
    //  or filter based on dates provided
    console.log("THe date : ", getDate1())
  }
  onMounted(()=>{
    kuvoma_function()
  })
  watch(date1, (value)=>{
    console.log("The date gotten by watch : ", value)
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
  .circlesMenu{
    display: block;
    background-color: transparent; 
    width: 100%;height: 20%; 
    padding: 5px 5px; 
    border-bottom: 2px solid white;
}
  .mainContainerCircle{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* background: #333; */
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-auto-rows: 20px;
    justify-items: center;
}
.item{
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 15px;
}
.item:active{
    background-color: transparent;
    scale: 1.4;
}
.black{
    background-color: white;
    border: 2px solid white;
}
.yellow{
    background-color: rgb(117, 9, 206);
    box-shadow: 0 0 10px greenyellow;
    border: 2px solid rgb(117, 9, 206);
}
.violet{
    background-color: rgb(12, 124, 216);
    border: 2px solid rgb(12, 124, 216);
}
.red{
    background-color: rgb(206, 9, 35);
    border: 2px solid rgb(206, 9, 35);
}
  .manDate{
    display: none;
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