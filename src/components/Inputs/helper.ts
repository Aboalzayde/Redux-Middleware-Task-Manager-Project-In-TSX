// components/Inputs/helper.ts
interface FieldValues {
  name?: string;
  dueDate?: string;
  priority?: string;
  description?: string;
}

interface Errors {
  name: string;
  dueDate: string;
  priority: string;
  description: string;
}

export const validateInputs = (fieldValues: FieldValues, errors: Errors): Errors => {
  const today = new Date().toISOString().split('T')[0];
  const temp = { ...errors };

  if ('name' in fieldValues) {
    const nameLength = fieldValues.name?.trim().length ?? 0;
    temp.name = nameLength >= 3 ? '' : 'Task Name must be at least 3 characters.';
  }

  if ('dueDate' in fieldValues) {
    temp.dueDate = fieldValues.dueDate
      ? fieldValues.dueDate < today
        ? 'Due date cannot be in the past.'
        : ''
      : 'Due Date is required.';
  }

  if ('priority' in fieldValues) {
    temp.priority = fieldValues.priority ? '' : 'Priority is required.';
  }

  if ('description' in fieldValues) {
    const descriptionLength = fieldValues.description?.length ?? 0;
    temp.description = descriptionLength <= 200 ? '' : 'Description cannot exceed 200 characters.';
  }

  return temp;
};