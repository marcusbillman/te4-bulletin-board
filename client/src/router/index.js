import { createWebHistory, createRouter } from 'vue-router';
import BoardPage from '@/views/BoardPage.vue';
import SendPage from '@/views/SendPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
