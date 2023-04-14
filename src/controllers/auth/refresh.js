import refreshService from '../../services/auth/refresh'
const refresh = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get('refreshToken')
    const userData = await refreshService(refreshToken)

    ctx.cookies.set('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    ctx.body = userData
  } catch (error) {
    ctx.throw(error)
  }
}

export default refresh
