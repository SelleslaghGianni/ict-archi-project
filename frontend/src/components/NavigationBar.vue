

<script setup>
import { InboxIcon, ExclamationCircleIcon, CloudUploadIcon} from '@heroicons/vue/outline'
import { CheckCircleIcon, XIcon } from '@heroicons/vue/solid'
import { ExclamationIcon } from '@heroicons/vue/solid'
import { modalComposition as uploadModalComposition} from "@/shared/modal";
import { notificationComposition as notificationComposition} from "@/shared/notification";
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/outline'
import jwt_decode from 'jwt-decode';
import {useStore} from "vuex";
import axios from "axios";
import {ref} from "vue";
const store = useStore()
const { openModal, toggleModal } = uploadModalComposition();

let files = null;

let notificationText = ref('Successfully uploaded file!')
let notificationSuccess = ref(true)
let uploadInputText = ref('Upload a file')


function logout() {
  store.commit('updateUser', {'jwt': ""})
}

function previewFiles(event) {
  if (event.target.files['length'] > 0) {
    files = event.target.files;
    console.log(files[0])
    uploadInputText.value = "Selected: " + files[0].name
  }
}



function uploadFile(){
  if (files) {

    let formData = new FormData();
    formData.append('uploadedFile', files[0]);
    formData.append('file', 'eeee.txt');
    formData.append('user', jwt_decode(store.state.user.jwt).sub);

    axios.post(import.meta.env.VITE_BACKEND_URL + 'api/files', formData).then(() => {
      notificationSuccess.value = true;
      store.commit('toggleUploadNotification')
      location.reload();

    }).catch(() => {
      notificationSuccess.value = false;
      notificationText.value = "Error during file upload!"
      store.commit('toggleUploadNotification')
    })

  }else{
    notificationSuccess.value = false;
    notificationText.value = "No files selected!"
    store.commit('toggleUploadNotification')
  }




}
</script>

<template>
  <div>
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div class="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
          </div>
          <nav class="mt-5 flex-1 px-2 space-y-6">


            <router-link to="/dashboard/files" v-slot="{ isExactActive }">

              <a :class="[isExactActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
                <component :is="InboxIcon" :class="[isExactActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />

                Files
              </a>

            </router-link>


            <router-link to="/dashboard/about" v-slot="{ isExactActive }" >

              <a :class="[isExactActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md mt-1']">
                <component :is="ExclamationCircleIcon" :class="[isExactActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />

                About
              </a>

            </router-link>

            <a @click="toggleModal" :class="['bg-blue-900 text-white' , 'cursor-pointer group flex items-center px-2 py-2 text-sm font-medium rounded-md mt-4']">
              <component :is="CloudUploadIcon" :class="['text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />

              Upload
            </a>


          </nav>
        </div>
        <div class="flex-shrink-0 flex bg-gray-700 p-4">
          <a href="#" class="flex-shrink-0 w-full group block">
            <div class="flex items-center">
              <div>
                <img class="inline-block h-9 w-9 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-white">
                  {{ jwt_decode(store.state.user.jwt).email }}
                </p>
                <p @click="logout" class="text-xs font-medium text-red-300 group-hover:text-gray-200">
                  Logout
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="md:pl-64 flex flex-col flex-1">
      <div class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
        <button type="button" class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <MenuIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1">
        <div class="py-4">
          <router-view />
        </div>
      </main>
    </div>
  </div>


  <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="store.getters.showNotification" class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon v-if="notificationSuccess" class="h-6 w-6 text-green-400" aria-hidden="true" />
                <ExclamationIcon v-else class="h-6 w-6 text-red-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ notificationText }}
                </p>

              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button @click="store.commit('toggleUploadNotification')" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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

  <TransitionRoot as="template" :show="openModal">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="toggleModal">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <form class="space-y-8 divide-y divide-gray-200">
              <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                  <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Upload a file
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                      Upload a file & store it on the cloud
                    </p>
                  </div>

                  <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">


                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label for="cover-photo" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        File
                      </label>
                      <div class="mt-1 sm:mt-0 sm:col-span-2">
                        <div class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div class="space-y-1 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="flex text-sm text-gray-600">
                              <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>{{ uploadInputText }}</span>
                                <input @change="previewFiles" required id="file-upload" name="file-upload" type="file" class="sr-only" />
                              </label>

                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>




              </div>


            </form>


            <div class="mt-5 sm:mt-6">
              <button @click="uploadFile" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" >
                Upload
              </button>
            </div>

            <div class="mt-5 sm:mt-6">
              <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm" @click="toggleModal">
                Go back to dashboard
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>




</template>
