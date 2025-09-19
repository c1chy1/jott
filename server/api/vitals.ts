export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.name || body.value === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid metric data'
        })
    }

    const formatValue = (name: string, value: number) => {
        switch (name) {
            case 'CLS':
                return value.toFixed(3) // Layout shift score
            case 'FCP':
            case 'LCP':
                return `${Math.round(value)}ms`
            case 'TTFB':
                return `${value.toFixed(1)}ms`
            case 'INP':
            case 'FID':
                return `${Math.round(value)}ms`
            default:
                return value
        }
    }

    const getGrade = (name: string, value: number) => {
        const thresholds = {
            FCP: {good: 1800, poor: 3000},
            LCP: {good: 2500, poor: 4000},
            CLS: {good: 0.1, poor: 0.25},
            INP: {good: 200, poor: 500},
            FID: {good: 100, poor: 300},
            TTFB: {good: 800, poor: 1800}
        }

        const threshold = thresholds[name as keyof typeof thresholds]
        if (!threshold) return '⚪'

        if (value <= threshold.good) return '🟢'
        if (value <= threshold.poor) return '🟡'
        return '🔴'
    }

    const grade = getGrade(body.name, body.value)
    const formattedValue = formatValue(body.name, body.value)
    const page = new URL(body.url).pathname

    console.log(`📊 ${grade} ${body.name}: ${formattedValue} | ${page}`)

    // const logEntry = {
    //     timestamp: new Date().toISOString(),
    //     metric: body.name,
    //     value: body.value,
    //     formatted: formattedValue,
    //     grade,
    //     page,
    //     url: body.url
    // }

    return {
        success: true,
        received: body.name,
        grade,
        formatted: formattedValue
    }
})