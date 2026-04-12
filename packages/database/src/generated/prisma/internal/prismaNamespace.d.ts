import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.4.0
 * Query Engine version: ab56fe763f921d033a6c195e7ddeb3e255bdbb57
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
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
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly user: "user";
    readonly holding: "holding";
    readonly socials: "socials";
    readonly coin: "coin";
    readonly tokenHash: "tokenHash";
    readonly apiKeys: "apiKeys";
    readonly blockTimeStamps: "blockTimeStamps";
    readonly message: "message";
    readonly messageImage: "messageImage";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "holding" | "socials" | "coin" | "tokenHash" | "apiKeys" | "blockTimeStamps" | "message" | "messageImage";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        user: {
            payload: Prisma.$userPayload<ExtArgs>;
            fields: Prisma.userFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.userFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$userPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$userPayload>;
                };
                findFirst: {
                    args: Prisma.userFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$userPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.userFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$userPayload>;
                };
                findMany: {
                    args: Prisma.userFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$userPayload>[];
                };
                create: {
                    args: Prisma.userCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$userPayload>;
                };
                createMany: {
                    args: Prisma.userCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.userCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$userPayload>[];
                };
                delete: {
                    args: Prisma.userDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$userPayload>;
                };
                update: {
                    args: Prisma.userUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$userPayload>;
                };
                deleteMany: {
                    args: Prisma.userDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.userUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.userUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$userPayload>[];
                };
                upsert: {
                    args: Prisma.userUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$userPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.userGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.userCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        holding: {
            payload: Prisma.$holdingPayload<ExtArgs>;
            fields: Prisma.holdingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.holdingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$holdingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.holdingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$holdingPayload>;
                };
                findFirst: {
                    args: Prisma.holdingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$holdingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.holdingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$holdingPayload>;
                };
                findMany: {
                    args: Prisma.holdingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$holdingPayload>[];
                };
                create: {
                    args: Prisma.holdingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$holdingPayload>;
                };
                createMany: {
                    args: Prisma.holdingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.holdingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$holdingPayload>[];
                };
                delete: {
                    args: Prisma.holdingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$holdingPayload>;
                };
                update: {
                    args: Prisma.holdingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$holdingPayload>;
                };
                deleteMany: {
                    args: Prisma.holdingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.holdingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.holdingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$holdingPayload>[];
                };
                upsert: {
                    args: Prisma.holdingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$holdingPayload>;
                };
                aggregate: {
                    args: Prisma.HoldingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHolding>;
                };
                groupBy: {
                    args: Prisma.holdingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HoldingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.holdingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HoldingCountAggregateOutputType> | number;
                };
            };
        };
        socials: {
            payload: Prisma.$socialsPayload<ExtArgs>;
            fields: Prisma.socialsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.socialsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$socialsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.socialsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$socialsPayload>;
                };
                findFirst: {
                    args: Prisma.socialsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$socialsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.socialsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$socialsPayload>;
                };
                findMany: {
                    args: Prisma.socialsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$socialsPayload>[];
                };
                create: {
                    args: Prisma.socialsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$socialsPayload>;
                };
                createMany: {
                    args: Prisma.socialsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.socialsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$socialsPayload>[];
                };
                delete: {
                    args: Prisma.socialsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$socialsPayload>;
                };
                update: {
                    args: Prisma.socialsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$socialsPayload>;
                };
                deleteMany: {
                    args: Prisma.socialsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.socialsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.socialsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$socialsPayload>[];
                };
                upsert: {
                    args: Prisma.socialsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$socialsPayload>;
                };
                aggregate: {
                    args: Prisma.SocialsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSocials>;
                };
                groupBy: {
                    args: Prisma.socialsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SocialsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.socialsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SocialsCountAggregateOutputType> | number;
                };
            };
        };
        coin: {
            payload: Prisma.$coinPayload<ExtArgs>;
            fields: Prisma.coinFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.coinFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$coinPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.coinFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$coinPayload>;
                };
                findFirst: {
                    args: Prisma.coinFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$coinPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.coinFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$coinPayload>;
                };
                findMany: {
                    args: Prisma.coinFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$coinPayload>[];
                };
                create: {
                    args: Prisma.coinCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$coinPayload>;
                };
                createMany: {
                    args: Prisma.coinCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.coinCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$coinPayload>[];
                };
                delete: {
                    args: Prisma.coinDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$coinPayload>;
                };
                update: {
                    args: Prisma.coinUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$coinPayload>;
                };
                deleteMany: {
                    args: Prisma.coinDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.coinUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.coinUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$coinPayload>[];
                };
                upsert: {
                    args: Prisma.coinUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$coinPayload>;
                };
                aggregate: {
                    args: Prisma.CoinAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCoin>;
                };
                groupBy: {
                    args: Prisma.coinGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CoinGroupByOutputType>[];
                };
                count: {
                    args: Prisma.coinCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CoinCountAggregateOutputType> | number;
                };
            };
        };
        tokenHash: {
            payload: Prisma.$tokenHashPayload<ExtArgs>;
            fields: Prisma.tokenHashFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.tokenHashFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tokenHashPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.tokenHashFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tokenHashPayload>;
                };
                findFirst: {
                    args: Prisma.tokenHashFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tokenHashPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.tokenHashFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tokenHashPayload>;
                };
                findMany: {
                    args: Prisma.tokenHashFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tokenHashPayload>[];
                };
                create: {
                    args: Prisma.tokenHashCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tokenHashPayload>;
                };
                createMany: {
                    args: Prisma.tokenHashCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.tokenHashCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tokenHashPayload>[];
                };
                delete: {
                    args: Prisma.tokenHashDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tokenHashPayload>;
                };
                update: {
                    args: Prisma.tokenHashUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tokenHashPayload>;
                };
                deleteMany: {
                    args: Prisma.tokenHashDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.tokenHashUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.tokenHashUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tokenHashPayload>[];
                };
                upsert: {
                    args: Prisma.tokenHashUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$tokenHashPayload>;
                };
                aggregate: {
                    args: Prisma.TokenHashAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTokenHash>;
                };
                groupBy: {
                    args: Prisma.tokenHashGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TokenHashGroupByOutputType>[];
                };
                count: {
                    args: Prisma.tokenHashCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TokenHashCountAggregateOutputType> | number;
                };
            };
        };
        apiKeys: {
            payload: Prisma.$apiKeysPayload<ExtArgs>;
            fields: Prisma.apiKeysFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.apiKeysFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$apiKeysPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.apiKeysFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$apiKeysPayload>;
                };
                findFirst: {
                    args: Prisma.apiKeysFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$apiKeysPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.apiKeysFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$apiKeysPayload>;
                };
                findMany: {
                    args: Prisma.apiKeysFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$apiKeysPayload>[];
                };
                create: {
                    args: Prisma.apiKeysCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$apiKeysPayload>;
                };
                createMany: {
                    args: Prisma.apiKeysCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.apiKeysCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$apiKeysPayload>[];
                };
                delete: {
                    args: Prisma.apiKeysDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$apiKeysPayload>;
                };
                update: {
                    args: Prisma.apiKeysUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$apiKeysPayload>;
                };
                deleteMany: {
                    args: Prisma.apiKeysDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.apiKeysUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.apiKeysUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$apiKeysPayload>[];
                };
                upsert: {
                    args: Prisma.apiKeysUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$apiKeysPayload>;
                };
                aggregate: {
                    args: Prisma.ApiKeysAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateApiKeys>;
                };
                groupBy: {
                    args: Prisma.apiKeysGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ApiKeysGroupByOutputType>[];
                };
                count: {
                    args: Prisma.apiKeysCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ApiKeysCountAggregateOutputType> | number;
                };
            };
        };
        blockTimeStamps: {
            payload: Prisma.$blockTimeStampsPayload<ExtArgs>;
            fields: Prisma.blockTimeStampsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.blockTimeStampsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$blockTimeStampsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.blockTimeStampsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$blockTimeStampsPayload>;
                };
                findFirst: {
                    args: Prisma.blockTimeStampsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$blockTimeStampsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.blockTimeStampsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$blockTimeStampsPayload>;
                };
                findMany: {
                    args: Prisma.blockTimeStampsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$blockTimeStampsPayload>[];
                };
                create: {
                    args: Prisma.blockTimeStampsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$blockTimeStampsPayload>;
                };
                createMany: {
                    args: Prisma.blockTimeStampsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.blockTimeStampsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$blockTimeStampsPayload>[];
                };
                delete: {
                    args: Prisma.blockTimeStampsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$blockTimeStampsPayload>;
                };
                update: {
                    args: Prisma.blockTimeStampsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$blockTimeStampsPayload>;
                };
                deleteMany: {
                    args: Prisma.blockTimeStampsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.blockTimeStampsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.blockTimeStampsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$blockTimeStampsPayload>[];
                };
                upsert: {
                    args: Prisma.blockTimeStampsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$blockTimeStampsPayload>;
                };
                aggregate: {
                    args: Prisma.BlockTimeStampsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBlockTimeStamps>;
                };
                groupBy: {
                    args: Prisma.blockTimeStampsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlockTimeStampsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.blockTimeStampsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlockTimeStampsCountAggregateOutputType> | number;
                };
            };
        };
        message: {
            payload: Prisma.$messagePayload<ExtArgs>;
            fields: Prisma.messageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.messageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.messageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messagePayload>;
                };
                findFirst: {
                    args: Prisma.messageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.messageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messagePayload>;
                };
                findMany: {
                    args: Prisma.messageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messagePayload>[];
                };
                create: {
                    args: Prisma.messageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messagePayload>;
                };
                createMany: {
                    args: Prisma.messageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.messageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messagePayload>[];
                };
                delete: {
                    args: Prisma.messageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messagePayload>;
                };
                update: {
                    args: Prisma.messageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messagePayload>;
                };
                deleteMany: {
                    args: Prisma.messageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.messageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.messageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messagePayload>[];
                };
                upsert: {
                    args: Prisma.messageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messagePayload>;
                };
                aggregate: {
                    args: Prisma.MessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMessage>;
                };
                groupBy: {
                    args: Prisma.messageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.messageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageCountAggregateOutputType> | number;
                };
            };
        };
        messageImage: {
            payload: Prisma.$messageImagePayload<ExtArgs>;
            fields: Prisma.messageImageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.messageImageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messageImagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.messageImageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messageImagePayload>;
                };
                findFirst: {
                    args: Prisma.messageImageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messageImagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.messageImageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messageImagePayload>;
                };
                findMany: {
                    args: Prisma.messageImageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messageImagePayload>[];
                };
                create: {
                    args: Prisma.messageImageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messageImagePayload>;
                };
                createMany: {
                    args: Prisma.messageImageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.messageImageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messageImagePayload>[];
                };
                delete: {
                    args: Prisma.messageImageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messageImagePayload>;
                };
                update: {
                    args: Prisma.messageImageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messageImagePayload>;
                };
                deleteMany: {
                    args: Prisma.messageImageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.messageImageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.messageImageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messageImagePayload>[];
                };
                upsert: {
                    args: Prisma.messageImageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$messageImagePayload>;
                };
                aggregate: {
                    args: Prisma.MessageImageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMessageImage>;
                };
                groupBy: {
                    args: Prisma.messageImageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageImageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.messageImageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageImageCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
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
export declare const HoldingScalarFieldEnum: {
    readonly coinAddress: "coinAddress";
    readonly amount: "amount";
    readonly userAddress: "userAddress";
};
export type HoldingScalarFieldEnum = (typeof HoldingScalarFieldEnum)[keyof typeof HoldingScalarFieldEnum];
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
    readonly TokenAmount: "TokenAmount";
    readonly VETHAmount: "VETHAmount";
    readonly ATHPrice: "ATHPrice";
    readonly userId: "userId";
    readonly graduated: "graduated";
    readonly lastTimeStamp: "lastTimeStamp";
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
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly message: "message";
    readonly userKey: "userKey";
    readonly coinId: "coinId";
    readonly referencedMessageId: "referencedMessageId";
    readonly dateTime: "dateTime";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const MessageImageScalarFieldEnum: {
    readonly id: "id";
    readonly address: "address";
    readonly messageId: "messageId";
};
export type MessageImageScalarFieldEnum = (typeof MessageImageScalarFieldEnum)[keyof typeof MessageImageScalarFieldEnum];
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
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'BigInt'
 */
export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>;
/**
 * Reference to a field of type 'BigInt[]'
 */
export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.userOmit;
    holding?: Prisma.holdingOmit;
    socials?: Prisma.socialsOmit;
    coin?: Prisma.coinOmit;
    tokenHash?: Prisma.tokenHashOmit;
    apiKeys?: Prisma.apiKeysOmit;
    blockTimeStamps?: Prisma.blockTimeStampsOmit;
    message?: Prisma.messageOmit;
    messageImage?: Prisma.messageImageOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map