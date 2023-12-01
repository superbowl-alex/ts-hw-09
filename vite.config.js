import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Базовый путь для обработки маршрутов
  define: {
    global:'window',
  },
});
