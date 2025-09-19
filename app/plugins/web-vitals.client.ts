export default defineNuxtPlugin(() => {
    console.log('🔥 WEB VITALS PLUGIN STARTED!')

    if (process.client) {
        const getDeviceInfo = () => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

            return {
                mobile: isMobile,
                screen: `${window.screen.width}x${window.screen.height}`,
                viewport: `${window.innerWidth}x${window.innerHeight}`,
                connection: connection ? connection.effectiveType : 'unknown',
                userAgent: navigator.userAgent.substring(0, 100)
            }
        }

        console.log('📱 Device Info:', getDeviceInfo())

        import('web-vitals').then((webVitals) => {
            console.log('📦 Web-vitals library loaded!')

            const sendToAPI = (metric: any) => {
                const deviceInfo = getDeviceInfo()
                const deviceEmoji = deviceInfo.mobile ? '📱' : '💻'

                console.log(`📊 ${deviceEmoji} METRIC: ${metric.name} = ${metric.value}`, {
                    metric,
                    device: deviceInfo
                })

                const savedMetrics = JSON.parse(localStorage.getItem('webVitals') || '[]')
                savedMetrics.unshift({
                    ...metric,
                    timestamp: new Date().toLocaleString('de-DE'),
                    page: window.location.pathname,
                    device: deviceInfo
                })
                localStorage.setItem('webVitals', JSON.stringify(savedMetrics.slice(0, 50)))

                $fetch('/api/vitals', {
                    method: 'POST',
                    body: {
                        name: metric.name,
                        value: metric.value,
                        url: window.location.href,
                        timestamp: Date.now(),
                        device: deviceInfo
                    }
                }).then(response => {
                    console.log(`✅ ${deviceEmoji} ${metric.name} sent!`, response)
                }).catch(error => {
                    console.error(`❌ ${metric.name} error:`, error)
                })
            }

            const {onCLS, onFCP, onLCP, onTTFB, onINP} = webVitals

            onCLS?.(sendToAPI)
            onFCP?.(sendToAPI)
            onLCP?.(sendToAPI)
            onTTFB?.(sendToAPI)
            onINP?.(sendToAPI)

            console.log('✅ Observers ready!')

        }).catch(error => {
            console.error('❌ Web-vitals error:', error)
        })
    }
})