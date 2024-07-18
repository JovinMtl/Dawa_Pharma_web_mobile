
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useDateStore = defineStore('dates', ()=>{
    const date1 = ref(new Date)
    const date2 = ref(new Date)


    const getDate1 = ()=>{
        return date1.value
    }
    const getDate2 = ()=>{
        return date2.value
    }
    const setDate1 = (value)=>{
        date1.value = value
    }
    const setDate2 = (value)=>{
        date2.value = value
    }

    return {
        getDate1, getDate2,
        setDate1, setDate2
    }
})

