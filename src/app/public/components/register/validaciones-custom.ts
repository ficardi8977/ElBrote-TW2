import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EmailValidator(control: AbstractControl): { [key: string]: any } | null {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(control.value)) {
    return { invalidEmail: true };
  }
  return null;
}

export function PasswordValidator(control: AbstractControl): { [key: string]: any } | null {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@$%^&*()_+|~=`{}\[\]:;'",<>\./?\\])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
  if (!passwordRegex.test(control.value)) {
    return { invalidPassword: true };
  }
  return null;
}