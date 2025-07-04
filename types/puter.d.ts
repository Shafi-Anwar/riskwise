export {}

declare global {
  interface Window {
    puter?: {
      ai: {
        generate: (params: {
          model: 'gpt-4' | 'gpt-3.5-turbo'
          prompt: string
        }) => Promise<{ text: string }>
      }
    }
  }
}
