/*
    BASIC EMAIL VALIDATION

    Valid email examples    
    john.doe@example.com
    john_doe123@example.co.uk
    johndoe12345@example.com.au

    Invalid examples    
    john.doe@.com (missing domain name)
    john.doe@example..com (extra dot in domain name)
    john.doe@example (missing top-level domain)
  
  */

export const ValidateEmail = (email) => {
  let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return emailRegex.test(email)
}
