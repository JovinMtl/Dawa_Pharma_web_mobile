
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useImitiSetStore = defineStore('imitiSet', ()=>{
    const page_numbers = ref([])
    const acquired_imiti = ref([])


    const is_Stored = (page)=>{
        if(page_numbers.includes(page)){
            return 1
        } else{
            return 0
        }
    }
    const getPagedImiti = (page)=>{
        if(page_numbers.includes(page)){
            return acquired_imiti.value[page]
        } else{
            return 0
        }
        
    }
    const addPagedImiti = (page, obj)=>{
        if(page_numbers.includes(page)){
            return 0
        } else{
            page_numbers.push(page)
            acquired_imiti.push(obj)
            return 1
        }
    }
    

    return {
        is_Stored, getPagedImiti, addPagedImiti
    }
})

