export default {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      description: "The user's username",
    },
    password: {
      type: 'string',
      nullable: true,
      description: "The user's password",
    },
  },
  required: ['id', 'username'],
};
