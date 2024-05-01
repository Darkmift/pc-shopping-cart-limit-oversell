export default {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      format: 'int64',
      description: "The user's ID",
    },
    username: {
      type: 'string',
      description: "The user's username",
    },
    password: {
      type: 'string',
      nullable: true,
      description: "The user's password",
    },
    lastActive: {
      type: 'string',
      format: 'date-time',
      nullable: true,
      description: 'The last active date of the user',
    },
    archived: {
      type: 'integer',
      format: 'int32',
      nullable: true,
      description: 'The archived status of the user',
    },
  },
  required: ['id', 'username'],
}