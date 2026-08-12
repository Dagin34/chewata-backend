import jwt from 'jsonwebtoken'

//.. Frontend and backend are deployed on different domains (Vercel/Render), so the
//.. auth cookie must be SameSite=None; Secure to survive that cross-site request —
//.. otherwise browsers silently drop it and every request after login 401s with
//.. "Unauthorized - No Token Provided!". This only kicks in when NODE_ENV is exactly
//.. "production", which most hosts (including Render) do NOT set automatically —
//.. it must be added explicitly in the service's environment variables.
export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  secure: process.env.NODE_ENV === 'production',
}

export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  })

  res.cookie('jwt', token, {
    ...COOKIE_OPTIONS,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  })

  return token;
}