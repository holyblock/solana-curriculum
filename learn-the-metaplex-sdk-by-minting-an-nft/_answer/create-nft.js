import { readFile } from 'fs/promises';
import { Connection } from '@solana/web3.js';
import {
  keypairIdentity,
  Metaplex,
  toMetaplexFile
} from '@metaplex-foundation/js';
import { localStorage, WALLET_KEYPAIR } from './utils.js';

const connection = new Connection('http://127.0.0.1:8899');

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(WALLET_KEYPAIR))
  .use(localStorage({ baseUrl: 'http://127.0.0.1:3001/' }));

const imageBuffer = await readFile('../assets/pic.png');
const file = toMetaplexFile(imageBuffer, 'pic.png');

const image = await metaplex.storage().upload(file);

const { uri } = await metaplex.nfts().uploadMetadata({
  name: 'fCC',
  description: 'An image of the freeCodeCamp logo',
  image
});

console.log('Metadata URI:', uri);

console.log(
  'Creating NFT using Wallet:',
  metaplex.identity().publicKey.toBase58()
);

const createResponse = await metaplex.nfts().create({
  name: 'fCC',
  uri,
  sellerFeeBasisPoints: 1000,
  maxSupply: 1,
  symbol: 'FCC'
});

console.log(createResponse);
