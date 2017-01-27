import Ajv from 'ajv'
import dotenv from 'dotenv'

export default function () {
  dotenv.load()

  const schema = {
    type: 'object',
    properties: {
      port: { type: 'string' },
      mongodbUrl: { type: 'string', format: 'uri' },
      version: { type: 'string' }
    },
    required: 'port mongodbUrl version'.split(' ')
  }

  const config = {
    port: process.env.PORT,
    mongodbUrl: process.env.MONGODB_URL,
    version: process.env.VERSION
  }

  const validator = new Ajv({ allErrors: true })

  if (validator.validate(schema, config)) {
    return config
  }

  throw new Error(validator.errorsText())
}
