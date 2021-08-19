# Forms

### **_Introduction_**

For manage the forms we use [formik](https://formik.org/docs/overview) library.

For form validation we use [Yup](https://www.npmjs.com/package/yup)

All Form inputs/components collected in `components/forms`.  
Each form input already wrapped with formik field and manage the value and error message for itself,
So mostely all you need to provide is formik-name and label, for select - options

`FormSwitcher` you may want to use outside the formik form, for this just use a `FormSwitcherUI`, which will load the same switcher, but without the formik field wrapper.

### **_Custom Validation Rules_**

All the custom Yup validation rules defined in `config/validation.config.ts`.  
 After adding new rule you will have to add this new function to the Yup interface, which defined in `@types/yup/index.ts`.

### **_Handle Errors_**

Each form input component contain the formik `ErrorMessage` and display its own inline errors.  
 For BE errors there is 2 types of them:

1.  General error - this need to show as a toast, using `toast.show({type:"error", msg:"e.response.message"})`
2.  Validation error, this will return validation messages per field names, and need to be shown in the field error, using `form.setFieldError(name, msg)`.

For the whole above hendeling there is a helper function you can import from ApiManager, which received the form helper and return the desired callback.

Example usage: `(...).catch(handleError(formikHelper))`

Example usage with custom functionality added: `(...).catch(e => {...customStaff; handleError(formikHelper)(e)})`
