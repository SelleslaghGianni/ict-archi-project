<script setup>
import { MailIcon, PhoneIcon } from '@heroicons/vue/solid'
import axios from "axios";
import jwt_decode from "jwt-decode";
import {computed, reactive, ref} from "vue";
import {useStore} from "vuex";
import { modalComposition } from "@/shared/modal";

const { openModal, toggleModal } = modalComposition();

const store = useStore()


const fileList = ref(null)



axios.get(import.meta.env.VITE_BACKEND_URL + 'api/allFiles/' +jwt_decode(store.state.user.jwt).sub ).then((response) => {
  fileList.value = response.data;

  fileList.value.forEach(element => {
    axios.get(import.meta.env.VITE_BACKEND_URL + 'api/files', {params: {user:jwt_decode(store.state.user.jwt).sub, uuid: element.uuid}, responseType: 'blob'}).then((response) => {
      console.log(response.data)
      console.log(response)
      element.img =  URL.createObjectURL(response.data)

    })
  })
  console.log(fileList.value)

})

function downloadFile(blob, filename){
  let link = document.createElement('a')
  link.href = blob
  link.download = filename

  document.body.appendChild(link);
  link.click()
  document.body.removeChild(link);
}


</script>


<template>

  <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

    <h1 class="text-2xl font-semibold text-gray-900">Files</h1>

  </div>
  <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
    <!-- Replace with your content -->
    <div class="py-4">

      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <li v-for="file in fileList" :key="file.id" class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
          <div class="flex-1 flex flex-col p-8">
            <img class="w-32 h-32 flex-shrink-0 mx-auto rounded-full" :src="file.img" alt="" @error="$event.target.src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'" />

            <h3 class="mt-2 text-gray-900 text-sm font-medium">Filename: {{ file.filename }}</h3>
            <dl class="mt-1 flex-grow flex flex-col justify-between">

              <dd class="text-gray-500 text-sm">UUID: {{ file.uuid }}</dd>

            </dl>
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div class="w-0 flex-1 flex">
                <a @click="downloadFile(file.img, file.filename)" class="cursor-pointer relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                  <MailIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span class="ml-3">Download</span>
                </a>
              </div>

            </div>
          </div>
        </li>
      </ul>



    </div>
  </div>

  <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="openModal" class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <ExclamationIcon class="h-6 w-6 text-red-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  Login failed
                </p>

              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button @click="toggleModal()" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>



</template>

