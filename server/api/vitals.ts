export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.name || !body.value) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid metric data'
        })
    }

    console.log('📊 Web Vital Metric:', {
        name: body.name,
        value: body.value,
        url: body.url,
        timestamp: new Date(body.timestamp).toISOString()
    })

    return {success: true, received: body.name}
})