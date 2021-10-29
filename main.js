'use strict';

const { Block, Blockchain } = require('./blockchain.js');
const JeChain = new Blockchain();

console.log('Starting ...');

// Add a new block
JeChain.addBlock(
  new Block(Date.now().toString(), { from: 'John', to: 'Bob', amount: 100 })
);

// Prints out the updated chain
console.log(JeChain.chain);
console.log('Done.');
