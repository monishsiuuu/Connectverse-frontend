import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import { http, createConfig } from 'wagmi';
import { QueryClient } from '@tanstack/react-query';



const projectId = 'de0ec43f8093916091b1d753c90375a4';

const chains = [
    {
        chainId: 1,
        name: 'Ethereum',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'https://cloudflare-eth.com'
    },
    {
        chainId: 1337,
        name: 'Ganache',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'HTTP://127.0.0.1:8545',
    },
];

const metadata = {
    name: 'Connectverse',
    description: 'The finest creation of Navin3d.',
    url: 'https://github.com/Navin3d', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
}


try {
	createWeb3Modal({
		ethersConfig: defaultConfig({ metadata }),
		chains: [chains[1]],
		projectId,
		enableAnalytics: true,
	});
	// console.log(web3modal.getAddress())
} catch (e) {
	console.log(e);
	createWeb3Modal({
		ethersConfig: defaultConfig({ metadata }),
		chains: [chains[0]],
		projectId,
		enableAnalytics: true,
	});
}

export const wagmiContextConfig = createConfig({
  chains,
  transports: {
    [chains[1].id]: http(chains[1].rpcUrl),
  },
});

export const queryClient = new QueryClient();

const abi  = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "tittle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "ownerId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "createdAt",
						"type": "string"
					}
				],
				"internalType": "struct Project",
				"name": "project",
				"type": "tuple"
			}
		],
		"name": "copyrightProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "getProject",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "tittle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "ownerId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "createdAt",
						"type": "string"
					}
				],
				"internalType": "struct Project",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export const projectToBlockchain = (project, writeContract) => {
	console.log("writing to contract ", project);
    writeContract({
        abi,
        address: '0x076A214bbc5737BCA6E29EB8E53A044E6c433a47',
        functionName: 'copyrightProject',
        args: [
            project["id"], 
            [
				project["tittle"], 
				project["description"], 
				project["ownerAddress"], 
				project["createdBy"], 
				new Date().toISOString(),
			]
        ],
    });
};
