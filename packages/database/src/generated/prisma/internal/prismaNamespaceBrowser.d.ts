import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly user: "user";
    readonly socials: "socials";
    readonly coin: "coin";
    readonly tokenHash: "tokenHash";
    readonly apiKeys: "apiKeys";
    readonly blockTimeStamps: "blockTimeStamps";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly publicKey: "publicKey";
    readonly name: "name";
    readonly email: "email";
    readonly countryCode: "countryCode";
    readonly contact: "contact";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SocialsScalarFieldEnum: {
    readonly id: "id";
    readonly instagram: "instagram";
    readonly x: "x";
    readonly telegram: "telegram";
    readonly youtube: "youtube";
    readonly website: "website";
    readonly coinId: "coinId";
};
export type SocialsScalarFieldEnum = (typeof SocialsScalarFieldEnum)[keyof typeof SocialsScalarFieldEnum];
export declare const CoinScalarFieldEnum: {
    readonly id: "id";
    readonly address: "address";
    readonly tokenName: "tokenName";
    readonly symbol: "symbol";
    readonly imageUrl: "imageUrl";
    readonly description: "description";
    readonly userId: "userId";
    readonly graduated: "graduated";
};
export type CoinScalarFieldEnum = (typeof CoinScalarFieldEnum)[keyof typeof CoinScalarFieldEnum];
export declare const TokenHashScalarFieldEnum: {
    readonly hash: "hash";
    readonly coinId: "coinId";
};
export type TokenHashScalarFieldEnum = (typeof TokenHashScalarFieldEnum)[keyof typeof TokenHashScalarFieldEnum];
export declare const ApiKeysScalarFieldEnum: {
    readonly id: "id";
    readonly apiKey: "apiKey";
    readonly userId: "userId";
};
export type ApiKeysScalarFieldEnum = (typeof ApiKeysScalarFieldEnum)[keyof typeof ApiKeysScalarFieldEnum];
export declare const BlockTimeStampsScalarFieldEnum: {
    readonly id: "id";
    readonly tokenDeployedsTimestamp: "tokenDeployedsTimestamp";
    readonly tokenDeployedsLastId: "tokenDeployedsLastId";
    readonly tokenGraduatedsTimestamp: "tokenGraduatedsTimestamp";
    readonly tokenGraduatedsLastId: "tokenGraduatedsLastId";
    readonly tokenBoughtsTimestamp: "tokenBoughtsTimestamp";
    readonly tokenBoughtsLastId: "tokenBoughtsLastId";
    readonly tokenSoldsTimestamp: "tokenSoldsTimestamp";
    readonly tokenSoldsLastId: "tokenSoldsLastId";
    readonly poolcreatedsTimestamp: "poolcreatedsTimestamp";
    readonly poolcreatedsLastId: "poolcreatedsLastId";
    readonly tokencreatedsTimestamp: "tokencreatedsTimestamp";
    readonly tokencreatedLastId: "tokencreatedLastId";
    readonly updatedAt: "updatedAt";
    readonly createdAt: "createdAt";
};
export type BlockTimeStampsScalarFieldEnum = (typeof BlockTimeStampsScalarFieldEnum)[keyof typeof BlockTimeStampsScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map