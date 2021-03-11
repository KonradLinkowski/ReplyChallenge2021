const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { input } = yargs(hideBin(process.argv))
  .option('input', { alias: 'i', desc: 'Test case id' })
  .demandOption('input').argv

const { load } = require('./loader')
const { parse } = require('./parser')
const { Computer } = require('./computer')
const { print } = require('./printer')

main().catch(error => {
  console.error('Critical error occured', error)
  process.exit(-1)
})

async function main() {
  const file = await load(input)
  const grid = parse(file)
  const computer = new Computer(grid)
  const { best, score } = computer.compute(10000)
  console.log(score)
  print(input, best)
}
