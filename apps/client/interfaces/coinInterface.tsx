export interface Coin {
    id: string;
    address: string;
    tokenName: string;
    symbol: string;
    imageUrl: string;
    description: string;
    userId: string;
    graduated: boolean;
    user: {
        publicKey: string;
        name: string | null;
        email: string | null;
    };
    socials: {
        instagram: string | null;
        x: string | null;
        telegram: string | null;
        youtube: string | null;
        website: string | null;
    } | null;
}