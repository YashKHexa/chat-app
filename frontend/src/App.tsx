import { ConfigProvider, theme as antTheme } from 'antd'
import ChatPage from './pages/ChatPage'
import { useTheme } from './themeprovide'

function App() {
  const { isDark } = useTheme()

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#0f7d34',
          borderRadius: 14,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        },
      }}
    >
      <ChatPage isDark={isDark} />
    </ConfigProvider>
  )
}

export default App
