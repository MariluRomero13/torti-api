'use strict'

const { Command } = require('@adonisjs/ace')
const path = require('path')

class KeyGenerateDeliverier extends Command {
  static get signature () {
    return  `key:generate:deliverier
    { -f, --force: ForceFully generate the key in production environment }
    { --env=@value: .env file location }
    { -s, --size=@value: The key size which defaults to 32 characters }
    { --echo: Echo the key instead of writing to the file }`
  }

  static get description () {
    return 'Generate secret key for deliveriers'
  }

  async handle (args, options) {
    const size = options.size ? Number(options.size) : 32
    const key = require('randomstring').generate(size)

    /**
     * Echo key to console when echo is set to true
     * and return
     */
    if (options.echo) {
      console.log(`APP_KEY_DELIVERIER=${key}`)
      return
    }

    await this.invoke(async () => {
      this.ensureCanRunInProduction(options)
      await this.ensureInProjectRoot()

      const env = options.env || '.env'
      const pathToEnv = path.isAbsolute(env) ? env : path.join(process.cwd(), env)

      const envHash = await this.getEnvContent(pathToEnv)
      await this.updateEnvContents(pathToEnv, Object.assign(envHash, { APP_KEY_DELIVERIER: key }))

      this.completed('generated', `unique APP_KEY_DELIVERIER`)
    })
  }

  async invoke (callback) {
    try {
      await callback()
    } catch (error) {
      this.printError(error)
      process.exit(1)
    }
  }

  printError (error) {
    console.log(`\n  ${this.chalk.bgRed(' ERROR ')} ${error.message}\n`)

    if (error.hint) {
      console.log(`\n  ${this.chalk.bgRed(' HELP ')} ${error.hint}\n`)
    }
  }

  ensureCanRunInProduction (options) {
    if (process.env.NODE_ENV === 'production' && !options.force) {
      throw new Error(`Cannot run ${this.constructor.commandName} command in production. Pass --force flag to continue`)
    }
  }

  async ensureInProjectRoot () {
    const exists = await this.pathExists(path.join(process.cwd(), 'ace'))
    if (!exists) {
      throw new Error(`Make sure you are inside an adonisjs app to run the ${this.constructor.commandName} command`)
    }
  }

  async getEnvContent (envPath) {
    const dotEnvContents = await this.readFile(envPath)
    return require('dotenv').parse(dotEnvContents)
  }

  async updateEnvContents (envPath, envHash) {
    const updatedContents = Object.keys(envHash).map((key) => {
      return `${key}=${envHash[key]}`
    }).join('\n')

    await this.writeFile(envPath, updatedContents)
  }
}

module.exports = KeyGenerateDeliverier
