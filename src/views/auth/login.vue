<template>
    <ion-page>
        <ion-content>
            <div class="LogContainer" id="authe">
                ICi authentification
                <div class="authentif">
                    <div class="username">
                        <label for="input">Username</label> <br>
                        <input v-model="username" type="text" style="padding: 15px 30px; 
                            border-radius: 15px;border-style: hidden;
                            background-color: rgb(28, 35, 49);">
                    </div>
                    <div class="username">
                        <label for="input">Password</label> <br>
                        <input v-model="password" type="password" style="padding: 15px 30px; 
                            border-radius: 15px; border-spacing: 5px; 
                            border-style: hidden; background-color: rgb(28, 35, 49);">
                    </div>
                    <div class="confirmationContainer">
                        <!-- <div class="one" style="border-right: 1px solid black;">s'inscrire</div>
                        <div class="one">se connecter</div> -->
                        <!-- se connecter -->
                    </div>
                    <div @click="login_hook" class="enter">
                        <div class="btn">se connecter</div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
    IonContent, IonPage
} from '@ionic/vue';
import { useUserStore } from '../../store/user'
import { baseURL } from '../../store/host'

const store = useUserStore()
const {setUsername,setAccessToken, setRefreshToken} = store
const router = useRouter()
const username = ref(null)
const password = ref(null)

let logs = ''


const login_hook = async ()=>{
    const endpoint = "api/login/"
    console.log("Start logging in...")
    try {
        const response = await fetch(`${baseURL}/${endpoint}`,{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                // Authorization : 'Bearer ' + getAccessToken()
            },
            body: JSON.stringify({
                "username": username.value,
                "password":password.value
            })
        })
        const server_data = await response.json()
        if(response.ok){
            console.log("The response is: ", server_data)
            setUsername(username.value)
            setAccessToken(server_data.access)
            setRefreshToken(server_data.refresh)
            localStorage.setItem('username', username.value)
            localStorage.setItem('accessToken', server_data.access)
            localStorage.setItem('refreshToken', server_data.refresh)
            console.log("THings are well")
            router.push('/main/dispo')
        } else {
            console.log("The response hasn't reached here yet")
        }
    } catch (value){
        logs = value
    }
}
</script>
<style scoped lang="scss">

// @media screen and (min-width: 800px) {
    .LogContainer{
        display: flex;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 255, 0, 0.692);
        // background-color: rgba(128, 128, 128, 0.397);
        position: relative;
        justify-content: center;
        align-items: center;

        .authentif{
            width: 30%;
            height: 90%;
            background-color: black;
            position: absolute;
            border-radius: 15px;
            box-shadow: 0 0 45px black;
            text-align: center;
            align-content: center;
            // z-index: -5;

            .username{
                margin: 10px 50px;
            }
            .confirmationContainer{
                display: flex;
                width: 100%;
                height: 40px;
                background: white;
                color: black;
                justify-content: center;
                align-items: center;

                &:hover{
                    font-weight: 800;
                }
                .one{
                    width: 50%;
                    height: 100%;
                    align-content: center;

                    &:hover{
                        // background: rgba(0, 255, 0, 0.692);
                        font-weight: 800;
                    }
                }
            }
            .enter{
                display: flex;
                width: 100%;
                height: 40px;
                margin-top: 30px;
                justify-content: center;

                .btn{
                    display: flex;
                    width: 50%;
                    height: 100%;
                    border-radius: 15px;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    box-shadow: 0 0 5px white;
                    align-content: center;
                    background: linear-gradient(to right,black,rgb(99, 97, 97), white, gray);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;

                    &:active{
                        background: rgba(255, 255, 255, 0.13);
                        
                    }
                    &:hover{
                        font-weight: 700;
                        transform: rotateX(15deg);
                    }

                }
            }
        }
    }
// }
@media screen and (max-width: 420px) {
    .LogContainer{

        .authentif{
            width: 90%;
            flex-wrap: wrap;

            .username{
                width: 100%;
                margin: 0 auto;
                margin-bottom: .7rem;
            }
            .confirmationContainer{
                margin-top: 1.2rem;
            }
        }
    }

}
</style>