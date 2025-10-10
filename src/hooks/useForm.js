// src/hooks/useForm.js
import { useState } from "react";

export default function useForm(initialValues, validate, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Maneja cambio en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    // Validación inmediata (opcional, para mostrar error al escribir)
    if (validate) {
      setErrors((prev) => ({ ...prev, [name]: validate({ ...values, [name]: value })[name] }));
    }
  };

  // Maneja submit del form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate) return onSubmit(values);

    const validationErrors = validate(values);
    setErrors(validationErrors);

    // Revisamos si hay algún error
    const hayErrores = Object.values(validationErrors).some((error) => error);
    if (!hayErrores) {
      onSubmit(values);
      setValues(initialValues); // reset opcional
    }
  };

  return { values, errors, handleChange, handleSubmit };
}
