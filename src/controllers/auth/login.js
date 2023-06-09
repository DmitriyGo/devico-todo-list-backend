import loginService from '../../services/auth/login'
import * as yup from 'yup'
import ApiError from '../../exceptions/ApiError'
import UserResponseDto from '../../dtos/UserResponseDto'

const loginSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup
    .string()
    .min(6, 'Password minimum length 6 characters ')
    .required(),
})

const login = async (ctx) => {
  try {
    const { login, password } = await loginSchema.validate(ctx.request.body, {
      abortEarly: false,
    })

    const userData = await loginService(login, password)

    ctx.cookies.set('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    ctx.body = new UserResponseDto(userData)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = error.errors.map((err) => err.replace(/"/g, ''))
      ctx.throw(ApiError.ValidationError(validationErrors))
    } else {
      ctx.throw(error)
    }
  }
}

export default login
