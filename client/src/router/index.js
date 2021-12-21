import { createWebHistory, createRouter } from 'vue-router';
import BoardPage from '@/views/BoardPage.vue';
import HomePage from '@/views/HomePage.vue';
import SendPage from '@/views/SendPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/:boardId',
      name: 'Send',
      component: SendPage,
    },
    {
      path: '/:boardId/board',
      name: 'Board',
      component: BoardPage,
    },
  ],
});

export default router;
