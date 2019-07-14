import Web3 from 'web3';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

let web3;
// 浏览器环境且已经安装了 Metamask
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
}
// 服务器环境或者没有安装 Metamask
else {
  web3 = new Web3(new Web3.providers.HttpProvider(publicRuntimeConfig.infuraUrl));
}
// const Web3 = require('web3');
// const HDWalletProvider = require('truffle-hdwallet-provider');

// const web3 = new Web3(new HDWalletProvider(
//   'wave another range bonus regular strong regular pull company zone sunny knife',
//   'https://rinkeby.infura.io/v3/3af22c8c38484b26bd762bfd8f69a11b',
// ));

export default web3;
