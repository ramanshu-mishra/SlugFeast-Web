import {ethers, Wallet} from "ethers";

// this function is just for authentication so that we can verify at the whether the request is authorized by backend or not;
// because I dont want people to spam the contract with useless request for tokens then It'll be complex for me to track genuine coins created;
// genuine coins ==> coins whose metadata exists; since I'm storing most of the metadata offchain;

export async function signTransaction(userAddress: `0x${string}`, nonce: number) {
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey as string);

    // This must match the keccak256(abi.encodePacked(msg.sender, nonce)) exactly
    const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256"], 
        [userAddress, nonce]
    );

    // signMessage automatically adds "\x19Ethereum Signed Message:\n32"
    // and hashes it one last time before signing.
    const signature = await wallet.signMessage(ethers.toBeArray(messageHash));

    return signature;
}


