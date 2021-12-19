<script setup>

import { PaperClipIcon } from '@heroicons/vue/solid'
const people = [
  {
    name: 'Kyllian Lissens',
    imageUrl:
        '/kyllian.jpeg',
    githubUrl: 'https://github.com/kyllianlissens',
    linkedinUrl: 'https://www.linkedin.com/in/kyllian-lissens-833472187/',
  },
  {
    name: 'Gianni',
    imageUrl:
        '/gianni.jpg',
    githubUrl: 'https://github.com/SelleslaghGianni',
    linkedinUrl: 'https://www.linkedin.com/in/selleslaghgianni/',
  },
  {
    name: 'Jens Galle',
    imageUrl:
        '/jens.jpeg',
    githubUrl: 'https://github.com/gallejens',
    linkedinUrl: 'https://www.linkedin.com/in/jens-galle-0aa1061bb/',
  },

  // More people...
]

</script>

<template>
  <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

    <h1 class="text-2xl font-semibold text-gray-900">About</h1>

  </div>
  <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
    <!-- Replace with your content -->
    <div class="py-4">

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Application details
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Specifications on this application
          </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Frontend Stack
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Vue3 + Vuex + Vite + Tailwind CSS
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Backend stack
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                NodeJS + TypeScript + AWS Infrastructure
              </dd>
            </div>


            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                About
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                This application serves as a hosting platform that allows the users to host files for 24 hours
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Attachments
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div class="w-0 flex-1 flex items-center">
                      <PaperClipIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span class="ml-2 flex-1 w-0 truncate">
                    analysis.pdf
                  </span>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

            </div>

          </dl>

          <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
            <div class="space-y-12">
              <div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Our Team</h2>
                <p class="text-xl text-gray-500">The awesome team of developers that worked together on this application!</p>
              </div>
              <ul role="list" class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
                <li v-for="person in people" :key="person.name">
                  <div class="space-y-4">
                    <div class="aspect-w-2 aspect-h-2">
                      <img class="object-cover shadow-lg rounded-lg" :src="person.imageUrl" alt="" />
                    </div>

                    <div class="space-y-2">
                      <div class="text-lg leading-6 font-medium space-y-1">
                        <h3>{{ person.name }}</h3>

                      </div>
                      <ul role="list" class="flex space-x-3">
                        <li>
                          <a :href="person.githubUrl" class="text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Github</span>
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                          </a>
                        </li>
                        <li>
                          <a :href="person.linkedinUrl" class="text-gray-400 hover:text-gray-500">
                            <span class="sr-only">LinkedIn</span>
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>



    </div>
  </div>

</template>
