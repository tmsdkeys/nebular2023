# Demo of IBC SDK for Nebular

The instructions for the demo can be found (along with the rest of the documentation for IBC SDK) in the docusaurus folder.

To run the docs locally, run:

```bash
cd docusaurus && npm start
```

Look for the Quickstart tutorial section and find the 2nd tutorial that showcases a dummy applications where we can vote on which assets to borrow cross-chain.

## Resources

Clone the following GitHub repos to follow along with the tutorial:

- The [EVM project](https://github.com/tmsdkeys/hardhat-ibc-sdk-tutorial/tree/main) with the IBC enabled `IbcLendingBorrowing` contract + 3 Token contracts. It's a Hardhat project, so to be able to run `npx hardhat [command]`, make sure to run `npm install` first.
- The [CosmWasm project](https://github.com/tmsdkeys/ibc-sdk-cw-tutorial/tree/main) with the polling contract. You'll find the contract .wasm bytecode in the `/artifacts` folder if you don't want to bother checking out the code.
