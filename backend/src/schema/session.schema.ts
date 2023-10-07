export interface SessionInterface {
  email: string;
  password: string;
}

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const validateSessionData = (data: SessionInterface) => {
  const errors: Partial<SessionInterface> = {};

  if (!data.email) {
    errors.email = "Please Provide Email !";
  } else {
    if (validateEmail(data.email)) {
      errors.email = "Please Provide the correct email !";
    }
  }

  if (!data.password) {
    errors.password = "Please Provide Password";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};
