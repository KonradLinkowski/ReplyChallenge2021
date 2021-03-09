const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { input } = yargs(hideBin(process.argv))
  .option('input', { alias: 'i', desc: 'Test case id' })
  .demandOption('input').argv

const { load } = require('./loader')
const { parse } = require('./parser')

main().catch(error => {
  console.error('Critical error occured', error)
  process.exit(-1)
})

async function main() {
  const file = await load(input)
  const data = parse(file)
}
