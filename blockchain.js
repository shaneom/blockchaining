'use strict';

const crypto = require('crypto'),
  SHA256 = (message) => crypto.createHash('sha256').update(message).digest('hex');

class Block {
  constructor(timestamp = '', data = []) {
    this.timestamp = timestamp;
    //this information should contain information like transactions
    this.data = data;
    this.hash = this.getHash();
    this.prevHash = ''; // previous block's hash
    this.nonce = 0;
  }

  // Our hash function.
  getHash() {
    return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data));
  }

  mine(difficulty) {
    // Basically, it loops until the substring of the hash with length of 0, <difficulty>
    // until it is equal to the string 0...000 with length of <difficulty>
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      // We increases our nonce so that we can get a whole different hash.
      this.nonce++;
      // Update our new hash with the new nonce value.
      this.hash = this.getHash();
    }
  }
}

class Blockchain {
  constructor() {
    // Create our genesis block
    this.chain = [new Block(Date.now().toString())];
    this.difficulty = 1;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block) {
    // Since we are adding a new block, prevHash will be the hash of the old latest block
    block.prevHash = this.getLastBlock().hash;
    // Since now prevHash has a value, we must reset the block's hash
    block.mine(this.difficulty);
    block.hash = block.getHash();
    this.chain.push(block);
  }

  isValid() {
    // Iterate over the chain
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      // Check validation
      if (
        currentBlock.hash !== currentBlock.getHash() ||
        prevBlock.hash !== currentBlock.prevHash
      ) {
        return false;
      }
    }

    return true;
  }
}

module.exports = {
  Block,
  Blockchain,
};
