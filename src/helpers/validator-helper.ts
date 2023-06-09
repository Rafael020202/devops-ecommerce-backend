export const checkMissingParams = (data: any, fields: string[]) => {
  const errors: string[] = [];

  for (const field of fields) {
    if (field.includes('.')) {
      const keys = field.split('.');
      let object = data;

      for (const key of keys) {
        object = object?.[key];

        if (!object) {
          errors.push(`{${field}} é obrigatório.`);

          break;
        }
      }
    } else {
      const value = data?.[field];

      if (!value || (typeof value === 'string' && !value.trim())) {
        errors.push(`{${field}} é obrigatório.`);
      }
    }
  }

  return errors;
};
