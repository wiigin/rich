let baseUrl = '/api' // 本地代理
switch (process.env.NODE_ENV) {
    case 'development':
        // alert("测试环境")
        baseUrl = 'https://c.kdcer.com/dfw' // 测试环境url
        break
    case 'production':
        // alert("产线环境")
        baseUrl = 'https://c.kdcer.com/dfw' // 生产环境url
        break
}

export default baseUrl
