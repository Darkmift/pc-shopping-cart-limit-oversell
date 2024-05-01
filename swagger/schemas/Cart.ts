export default {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      format: 'int64',
      description: "The cart's ID",
    },
    lastActive: {
      type: 'string',
      format: 'date-time',
      nullable: true,
      description: 'The last active date of the cart',
    },
    archived: {
      type: 'integer',
      format: 'int32',
      nullable: true,
      description: 'The archived status of the cart',
    },
    dateCreated: {
      type: 'string',
      format: 'date-time',
      nullable: true,
      description: 'The creation date of the cart',
    },
    userId: {
      type: 'integer',
      format: 'int64',
      description: 'The ID of the user who owns the cart',
    },
    isActive: {
      type: 'integer',
      format: 'int32',
      nullable: true,
      description: 'The active status of the cart',
    },
  },
  required: ['id', 'userId'],
};
