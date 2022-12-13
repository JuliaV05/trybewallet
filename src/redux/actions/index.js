// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';

export const addEmail = (info) => ({
  type: ADD_EMAIL,
  payload: {
    ...info,
  },
});
