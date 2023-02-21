import { Connection } from '@solana/web3.js';
import {
  keypairIdentity,
  Metaplex,
  mockStorage
} from '@metaplex-foundation/js';
import { getUri, WALLET_KEYPAIR } from './utils.js';

const connection = new Connection('http://127.0.0.1:8899');

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(WALLET_KEYPAIR))
  .use(mockStorage());

const imageUri = getUri('pic.png');

const { uri } = await metaplex.nfts().uploadMetadata({
  name: 'fCC',
  description: 'My fCC nft',
  image: imageUri
});

console.log('Metadata URI:', uri);

console.log('Creating NFT using:', metaplex.identity().publicKey.toBase58());

const res = await metaplex.nfts().create({
  name: 'fCC',
  uri,
  sellerFeeBasisPoints: 1000,
  maxSupply: 1,
  symbol: 'FCC'
});

console.log(res);
