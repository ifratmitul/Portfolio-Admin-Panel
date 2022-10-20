import { AbstractControl } from "@angular/forms";

export const whiteSpaceValidation = (control: AbstractControl): { [key: string]: any } | null => {
  console.log(control.value);

  if (control.value && control.value.trim() && control.value.length < 1) {
    return { 'invalidString': true };
  }
  return null;
}
