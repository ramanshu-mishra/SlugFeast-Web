import { type Config ,defineConfig, } from '@wagmi/cli'
import { etherscan } from '@wagmi/cli/plugins'
import {sepolia} from "wagmi/chains"


console.log(process.env.NEXT_PUBLIC_ETHERSCAN_KEY);

const config = defineConfig({
  out: './src/generated.ts',
  plugins: [
    etherscan({
      apiKey: process.env.NEXT_PUBLIC_ETHERSCAN_KEY! ,
      chainId:  sepolia.id,
      contracts: [
        {
          name: 'SlugFeast',
          address: '0x482cbc5649b284ff67a05cdca3362362e3d3ffc2',
        },
      ],
    }),
  ],
}) as Config;
export default config