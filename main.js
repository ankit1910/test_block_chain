// const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, prevHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = '';
  }

  calculateHash() {
    return (this.index + this.timestamp + JSON.stringify(this.data).toString() + this.prevHash);
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.calculateGenesisBlock()];
  }

  calculateGenesisBlock() {
    return(new Block(0, "01/01/2017", "Genesis Block", "0"));
  }

  getLateshBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.prevHash = this.getLateshBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for( let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(currentBlock.hash != currentBlock.calculateHash()) {
        return false;
      }

      if(currentBlock.prevHash != previousBlock.hash) {
        return false;
      }

    }
    return true
  }
}


let scoin = new BlockChain();
scoin.addBlock(new Block(1, "10/07/2017", { coin: 5 }));
scoin.addBlock(new Block(2, "10/08/2018", { coin: 6 }));

console.log( scoin.isChainValid())


scoin.chain[1].data = { coin: 40 };
scoin.chain[1].hash = scoin.chain[1].calculateHash();
scoin.chain[2].prevHash = scoin.chain[1].hash;

console.log(scoin.isChainValid())

// console.log(JSON.stringify(scoin, null, 4));





