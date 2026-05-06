import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AI-Code-Showdown/', // 与你 GitHub 仓库名字完全一致
})