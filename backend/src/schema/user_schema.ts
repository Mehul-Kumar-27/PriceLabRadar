export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  passwordConformation: string;
}

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const validateUser = (data: CreateUserInput) => {
  const errors: Partial<CreateUserInput> = {};

  if (!data.name) {
    errors.name = "Please enter name";
  }

  if (!data.password) {
    errors.password = "Please provide password";
  } else {
    if (data.password.length < 6) {
      errors.password = "Length of password must be atleas 6 digits";
    } else if (data.password != data.passwordConformation) {
      errors.password = "Conformation Password do not match";
    }
  }

  if (!validateEmail(data.email)) {
    errors.email = "Please provide correct email";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};


