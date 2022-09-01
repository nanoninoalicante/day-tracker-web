import { createRouter, createWebHistory } from 'vue-router'
import VesselIntegrationView from '../views/VesselIntegrationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'vesselintegration',
      component: VesselIntegrationView
    },
    {
      path: '/crew',
      name: 'crewintegration',
      component: () => import("../views/CrewIntegrationView.vue")
    },
    {
      path: '/crew-messages',
      name: 'crewintegration-messages',
      component: () => import("../views/CrewIntegrationPostMessageView.vue")
    }
  ]
})

export default router
