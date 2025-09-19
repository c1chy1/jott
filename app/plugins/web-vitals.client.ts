export default defineNuxtPlugin(() => {
    console.log('🔥 WEB VITALS PLUGIN STARTED!')

    if (process.client) {
        console.log('🌐 Client side detected')

        import('web-vitals').then((webVitals) => {
            console.log('📦 Web-vitals library loaded!')

            const sendToAPI = (metric: any) => {
                console.log(`📊 METRIC: ${metric.name} = ${metric.value}`, metric)

                const savedMetrics = JSON.parse(localStorage.getItem('webVitals') || '[]')
                savedMetrics.unshift({
                    ...metric,
                    timestamp: new Date().toLocaleString('de-DE'),
                    page: window.location.pathname
                })
                localStorage.setItem('webVitals', JSON.stringify(savedMetrics.slice(0, 50)))

                $fetch('/api/vitals', {
                    method: 'POST',
                    body: {
                        name: metric.name,
                        value: metric.value,
                        url: window.location.href,
                        timestamp: Date.now()
                    }
                }).then(response => {
                    console.log(`✅ ${metric.name} sent!`, response)
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
