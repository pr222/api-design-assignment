/**
 * Encapsulation of controller for shoppinglists.
 */
export class RootController {
  /**
   * Get API root.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async get (req, res, next) {
    try {
      const response = {
        links: {
          self: {
            href: `${process.env.BASE_URL}/`,
            method: 'GET',
            rel: 'self',
            description: 'Welcome to the root of this shoppinglist API!'
          },
          shoppinglists: {
            links: {
              shoppinglists: {
                href: `${process.env.BASE_URL}/shoppinglists`,
                method: 'GET',
                rel: 'shoppinglists',
                description: 'Get all shoppinglists.'
              },
              create: {
                href: `${process.env.BASE_URL}/shoppinglists`,
                method: 'POST',
                rel: 'create',
                description: 'Create a new shoppinglist.',
                schema: {
                  name: 'String',
                  products: [
                    {
                      product: 'String',
                      price: 'Number',
                      store: 'String'
                    }
                  ]
                }
              },
              shoppinglist: {
                href: `${process.env.BASE_URL}/shoppinglists/{id}`,
                method: 'GET',
                rel: 'shoppinglist',
                links: {
                  update: {
                    href: `${process.env.BASE_URL}/shoppinglists/{id}`,
                    method: 'PUT',
                    rel: 'update',
                    description: 'Replace a specific shoppinglist with an updated one.',
                    schema: {
                      name: 'String',
                      products: [
                        {
                          product: 'String',
                          price: 'Number',
                          store: 'String'
                        }
                      ]
                    }
                  },
                  delete: {
                    href: `${process.env.BASE_URL}/shoppinglists/{id}`,
                    method: 'DELETE',
                    rel: 'delete',
                    description: 'Delete a specific shoppinglist.'
                  }
                }
              }
            }
          },
          users: {
            links: {
              register: {
                href: `${process.env.BASE_URL}/users/register`,
                method: 'POST',
                rel: 'register',
                description: 'Register a new user.'
              },
              login: {
                href: `${process.env.BASE_URL}/users/login`,
                method: 'POST',
                rel: 'login',
                description: 'Login user.'
              }
            }
          },
          webhook: {
            links: {
              register: {
                href: `${process.env.BASE_URL}/webhook/register`,
                method: 'POST',
                rel: 'register',
                description: 'Register a webhook to get shoppinglists that are updated.',
                schema: {
                  email: {
                    type: 'String',
                    required: true,
                    description: 'Email of the submitter.'
                  },
                  destination: {
                    type: 'String',
                    required: true,
                    description: 'The link that the event chould be posted to.'
                  },
                  secret: {
                    type: 'String',
                    required: true,
                    description: 'Provide a secret for validation when recieving the hook calls.'
                  }
                }
              }
            }
          }
        }
      }

      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
}
