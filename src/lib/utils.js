import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  })
  
  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Allow cross-site for production
    secure: process.env.NODE_ENV === 'production', // true in production
  })
  
  // res.cookie('jwt', token, {
  //   maxAge: 15 * 24 * 60 * 60 * 1000, //.. 7 days
  //   httpOnly: true, //.. Prevents client-side JS from accessing the cookie (XSS)
  //   sameSite: 'strict', //.... CSRF protection
  //   secure: process.env.NODE_ENV !== 'development', //.. HTTPS once its in dep
  // })

  return token;
}