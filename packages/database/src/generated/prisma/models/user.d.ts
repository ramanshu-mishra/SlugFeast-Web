import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model user
 *
 */
export type userModel = runtime.Types.Result.DefaultSelection<Prisma.$userPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserAvgAggregateOutputType = {
    aura: number | null;
};
export type UserSumAggregateOutputType = {
    aura: number | null;
};
export type UserMinAggregateOutputType = {
    publicKey: string | null;
    username: string | null;
    name: string | null;
    email: string | null;
    countryCode: string | null;
    contact: string | null;
    aura: number | null;
};
export type UserMaxAggregateOutputType = {
    publicKey: string | null;
    username: string | null;
    name: string | null;
    email: string | null;
    countryCode: string | null;
    contact: string | null;
    aura: number | null;
};
export type UserCountAggregateOutputType = {
    publicKey: number;
    username: number;
    name: number;
    email: number;
    countryCode: number;
    contact: number;
    aura: number;
    _all: number;
};
export type UserAvgAggregateInputType = {
    aura?: true;
};
export type UserSumAggregateInputType = {
    aura?: true;
};
export type UserMinAggregateInputType = {
    publicKey?: true;
    username?: true;
    name?: true;
    email?: true;
    countryCode?: true;
    contact?: true;
    aura?: true;
};
export type UserMaxAggregateInputType = {
    publicKey?: true;
    username?: true;
    name?: true;
    email?: true;
    countryCode?: true;
    contact?: true;
    aura?: true;
};
export type UserCountAggregateInputType = {
    publicKey?: true;
    username?: true;
    name?: true;
    email?: true;
    countryCode?: true;
    contact?: true;
    aura?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: Prisma.userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of users to fetch.
     */
    orderBy?: Prisma.userOrderByWithRelationInput | Prisma.userOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type userGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.userWhereInput;
    orderBy?: Prisma.userOrderByWithAggregationInput | Prisma.userOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.userScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    publicKey: string;
    username: string | null;
    name: string | null;
    email: string | null;
    countryCode: string | null;
    contact: string | null;
    aura: number;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type userWhereInput = {
    AND?: Prisma.userWhereInput | Prisma.userWhereInput[];
    OR?: Prisma.userWhereInput[];
    NOT?: Prisma.userWhereInput | Prisma.userWhereInput[];
    publicKey?: Prisma.StringFilter<"user"> | string;
    username?: Prisma.StringNullableFilter<"user"> | string | null;
    name?: Prisma.StringNullableFilter<"user"> | string | null;
    email?: Prisma.StringNullableFilter<"user"> | string | null;
    countryCode?: Prisma.StringNullableFilter<"user"> | string | null;
    contact?: Prisma.StringNullableFilter<"user"> | string | null;
    aura?: Prisma.IntFilter<"user"> | number;
    coins?: Prisma.CoinListRelationFilter;
    coinsHeld?: Prisma.HoldingListRelationFilter;
    apiKeys?: Prisma.ApiKeysListRelationFilter;
    messages?: Prisma.MessageListRelationFilter;
};
export type userOrderByWithRelationInput = {
    publicKey?: Prisma.SortOrder;
    username?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    countryCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    contact?: Prisma.SortOrderInput | Prisma.SortOrder;
    aura?: Prisma.SortOrder;
    coins?: Prisma.coinOrderByRelationAggregateInput;
    coinsHeld?: Prisma.holdingOrderByRelationAggregateInput;
    apiKeys?: Prisma.apiKeysOrderByRelationAggregateInput;
    messages?: Prisma.messageOrderByRelationAggregateInput;
};
export type userWhereUniqueInput = Prisma.AtLeast<{
    publicKey?: string;
    AND?: Prisma.userWhereInput | Prisma.userWhereInput[];
    OR?: Prisma.userWhereInput[];
    NOT?: Prisma.userWhereInput | Prisma.userWhereInput[];
    username?: Prisma.StringNullableFilter<"user"> | string | null;
    name?: Prisma.StringNullableFilter<"user"> | string | null;
    email?: Prisma.StringNullableFilter<"user"> | string | null;
    countryCode?: Prisma.StringNullableFilter<"user"> | string | null;
    contact?: Prisma.StringNullableFilter<"user"> | string | null;
    aura?: Prisma.IntFilter<"user"> | number;
    coins?: Prisma.CoinListRelationFilter;
    coinsHeld?: Prisma.HoldingListRelationFilter;
    apiKeys?: Prisma.ApiKeysListRelationFilter;
    messages?: Prisma.MessageListRelationFilter;
}, "publicKey" | "publicKey">;
export type userOrderByWithAggregationInput = {
    publicKey?: Prisma.SortOrder;
    username?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    countryCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    contact?: Prisma.SortOrderInput | Prisma.SortOrder;
    aura?: Prisma.SortOrder;
    _count?: Prisma.userCountOrderByAggregateInput;
    _avg?: Prisma.userAvgOrderByAggregateInput;
    _max?: Prisma.userMaxOrderByAggregateInput;
    _min?: Prisma.userMinOrderByAggregateInput;
    _sum?: Prisma.userSumOrderByAggregateInput;
};
export type userScalarWhereWithAggregatesInput = {
    AND?: Prisma.userScalarWhereWithAggregatesInput | Prisma.userScalarWhereWithAggregatesInput[];
    OR?: Prisma.userScalarWhereWithAggregatesInput[];
    NOT?: Prisma.userScalarWhereWithAggregatesInput | Prisma.userScalarWhereWithAggregatesInput[];
    publicKey?: Prisma.StringWithAggregatesFilter<"user"> | string;
    username?: Prisma.StringNullableWithAggregatesFilter<"user"> | string | null;
    name?: Prisma.StringNullableWithAggregatesFilter<"user"> | string | null;
    email?: Prisma.StringNullableWithAggregatesFilter<"user"> | string | null;
    countryCode?: Prisma.StringNullableWithAggregatesFilter<"user"> | string | null;
    contact?: Prisma.StringNullableWithAggregatesFilter<"user"> | string | null;
    aura?: Prisma.IntWithAggregatesFilter<"user"> | number;
};
export type userCreateInput = {
    publicKey: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    countryCode?: string | null;
    contact?: string | null;
    aura?: number;
    coins?: Prisma.coinCreateNestedManyWithoutUserInput;
    coinsHeld?: Prisma.holdingCreateNestedManyWithoutUserInput;
    apiKeys?: Prisma.apiKeysCreateNestedManyWithoutUserInput;
    messages?: Prisma.messageCreateNestedManyWithoutUserInput;
};
export type userUncheckedCreateInput = {
    publicKey: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    countryCode?: string | null;
    contact?: string | null;
    aura?: number;
    coins?: Prisma.coinUncheckedCreateNestedManyWithoutUserInput;
    coinsHeld?: Prisma.holdingUncheckedCreateNestedManyWithoutUserInput;
    apiKeys?: Prisma.apiKeysUncheckedCreateNestedManyWithoutUserInput;
    messages?: Prisma.messageUncheckedCreateNestedManyWithoutUserInput;
};
export type userUpdateInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
    coins?: Prisma.coinUpdateManyWithoutUserNestedInput;
    coinsHeld?: Prisma.holdingUpdateManyWithoutUserNestedInput;
    apiKeys?: Prisma.apiKeysUpdateManyWithoutUserNestedInput;
    messages?: Prisma.messageUpdateManyWithoutUserNestedInput;
};
export type userUncheckedUpdateInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
    coins?: Prisma.coinUncheckedUpdateManyWithoutUserNestedInput;
    coinsHeld?: Prisma.holdingUncheckedUpdateManyWithoutUserNestedInput;
    apiKeys?: Prisma.apiKeysUncheckedUpdateManyWithoutUserNestedInput;
    messages?: Prisma.messageUncheckedUpdateManyWithoutUserNestedInput;
};
export type userCreateManyInput = {
    publicKey: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    countryCode?: string | null;
    contact?: string | null;
    aura?: number;
};
export type userUpdateManyMutationInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type userUncheckedUpdateManyInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type userCountOrderByAggregateInput = {
    publicKey?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    countryCode?: Prisma.SortOrder;
    contact?: Prisma.SortOrder;
    aura?: Prisma.SortOrder;
};
export type userAvgOrderByAggregateInput = {
    aura?: Prisma.SortOrder;
};
export type userMaxOrderByAggregateInput = {
    publicKey?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    countryCode?: Prisma.SortOrder;
    contact?: Prisma.SortOrder;
    aura?: Prisma.SortOrder;
};
export type userMinOrderByAggregateInput = {
    publicKey?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    countryCode?: Prisma.SortOrder;
    contact?: Prisma.SortOrder;
    aura?: Prisma.SortOrder;
};
export type userSumOrderByAggregateInput = {
    aura?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.userWhereInput;
    isNot?: Prisma.userWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type userCreateNestedOneWithoutCoinsHeldInput = {
    create?: Prisma.XOR<Prisma.userCreateWithoutCoinsHeldInput, Prisma.userUncheckedCreateWithoutCoinsHeldInput>;
    connectOrCreate?: Prisma.userCreateOrConnectWithoutCoinsHeldInput;
    connect?: Prisma.userWhereUniqueInput;
};
export type userUpdateOneRequiredWithoutCoinsHeldNestedInput = {
    create?: Prisma.XOR<Prisma.userCreateWithoutCoinsHeldInput, Prisma.userUncheckedCreateWithoutCoinsHeldInput>;
    connectOrCreate?: Prisma.userCreateOrConnectWithoutCoinsHeldInput;
    upsert?: Prisma.userUpsertWithoutCoinsHeldInput;
    connect?: Prisma.userWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.userUpdateToOneWithWhereWithoutCoinsHeldInput, Prisma.userUpdateWithoutCoinsHeldInput>, Prisma.userUncheckedUpdateWithoutCoinsHeldInput>;
};
export type userCreateNestedOneWithoutCoinsInput = {
    create?: Prisma.XOR<Prisma.userCreateWithoutCoinsInput, Prisma.userUncheckedCreateWithoutCoinsInput>;
    connectOrCreate?: Prisma.userCreateOrConnectWithoutCoinsInput;
    connect?: Prisma.userWhereUniqueInput;
};
export type userUpdateOneRequiredWithoutCoinsNestedInput = {
    create?: Prisma.XOR<Prisma.userCreateWithoutCoinsInput, Prisma.userUncheckedCreateWithoutCoinsInput>;
    connectOrCreate?: Prisma.userCreateOrConnectWithoutCoinsInput;
    upsert?: Prisma.userUpsertWithoutCoinsInput;
    connect?: Prisma.userWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.userUpdateToOneWithWhereWithoutCoinsInput, Prisma.userUpdateWithoutCoinsInput>, Prisma.userUncheckedUpdateWithoutCoinsInput>;
};
export type userCreateNestedOneWithoutApiKeysInput = {
    create?: Prisma.XOR<Prisma.userCreateWithoutApiKeysInput, Prisma.userUncheckedCreateWithoutApiKeysInput>;
    connectOrCreate?: Prisma.userCreateOrConnectWithoutApiKeysInput;
    connect?: Prisma.userWhereUniqueInput;
};
export type userUpdateOneRequiredWithoutApiKeysNestedInput = {
    create?: Prisma.XOR<Prisma.userCreateWithoutApiKeysInput, Prisma.userUncheckedCreateWithoutApiKeysInput>;
    connectOrCreate?: Prisma.userCreateOrConnectWithoutApiKeysInput;
    upsert?: Prisma.userUpsertWithoutApiKeysInput;
    connect?: Prisma.userWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.userUpdateToOneWithWhereWithoutApiKeysInput, Prisma.userUpdateWithoutApiKeysInput>, Prisma.userUncheckedUpdateWithoutApiKeysInput>;
};
export type userCreateNestedOneWithoutMessagesInput = {
    create?: Prisma.XOR<Prisma.userCreateWithoutMessagesInput, Prisma.userUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.userCreateOrConnectWithoutMessagesInput;
    connect?: Prisma.userWhereUniqueInput;
};
export type userUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.userCreateWithoutMessagesInput, Prisma.userUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.userCreateOrConnectWithoutMessagesInput;
    upsert?: Prisma.userUpsertWithoutMessagesInput;
    connect?: Prisma.userWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.userUpdateToOneWithWhereWithoutMessagesInput, Prisma.userUpdateWithoutMessagesInput>, Prisma.userUncheckedUpdateWithoutMessagesInput>;
};
export type userCreateWithoutCoinsHeldInput = {
    publicKey: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    countryCode?: string | null;
    contact?: string | null;
    aura?: number;
    coins?: Prisma.coinCreateNestedManyWithoutUserInput;
    apiKeys?: Prisma.apiKeysCreateNestedManyWithoutUserInput;
    messages?: Prisma.messageCreateNestedManyWithoutUserInput;
};
export type userUncheckedCreateWithoutCoinsHeldInput = {
    publicKey: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    countryCode?: string | null;
    contact?: string | null;
    aura?: number;
    coins?: Prisma.coinUncheckedCreateNestedManyWithoutUserInput;
    apiKeys?: Prisma.apiKeysUncheckedCreateNestedManyWithoutUserInput;
    messages?: Prisma.messageUncheckedCreateNestedManyWithoutUserInput;
};
export type userCreateOrConnectWithoutCoinsHeldInput = {
    where: Prisma.userWhereUniqueInput;
    create: Prisma.XOR<Prisma.userCreateWithoutCoinsHeldInput, Prisma.userUncheckedCreateWithoutCoinsHeldInput>;
};
export type userUpsertWithoutCoinsHeldInput = {
    update: Prisma.XOR<Prisma.userUpdateWithoutCoinsHeldInput, Prisma.userUncheckedUpdateWithoutCoinsHeldInput>;
    create: Prisma.XOR<Prisma.userCreateWithoutCoinsHeldInput, Prisma.userUncheckedCreateWithoutCoinsHeldInput>;
    where?: Prisma.userWhereInput;
};
export type userUpdateToOneWithWhereWithoutCoinsHeldInput = {
    where?: Prisma.userWhereInput;
    data: Prisma.XOR<Prisma.userUpdateWithoutCoinsHeldInput, Prisma.userUncheckedUpdateWithoutCoinsHeldInput>;
};
export type userUpdateWithoutCoinsHeldInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
    coins?: Prisma.coinUpdateManyWithoutUserNestedInput;
    apiKeys?: Prisma.apiKeysUpdateManyWithoutUserNestedInput;
    messages?: Prisma.messageUpdateManyWithoutUserNestedInput;
};
export type userUncheckedUpdateWithoutCoinsHeldInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
    coins?: Prisma.coinUncheckedUpdateManyWithoutUserNestedInput;
    apiKeys?: Prisma.apiKeysUncheckedUpdateManyWithoutUserNestedInput;
    messages?: Prisma.messageUncheckedUpdateManyWithoutUserNestedInput;
};
export type userCreateWithoutCoinsInput = {
    publicKey: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    countryCode?: string | null;
    contact?: string | null;
    aura?: number;
    coinsHeld?: Prisma.holdingCreateNestedManyWithoutUserInput;
    apiKeys?: Prisma.apiKeysCreateNestedManyWithoutUserInput;
    messages?: Prisma.messageCreateNestedManyWithoutUserInput;
};
export type userUncheckedCreateWithoutCoinsInput = {
    publicKey: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    countryCode?: string | null;
    contact?: string | null;
    aura?: number;
    coinsHeld?: Prisma.holdingUncheckedCreateNestedManyWithoutUserInput;
    apiKeys?: Prisma.apiKeysUncheckedCreateNestedManyWithoutUserInput;
    messages?: Prisma.messageUncheckedCreateNestedManyWithoutUserInput;
};
export type userCreateOrConnectWithoutCoinsInput = {
    where: Prisma.userWhereUniqueInput;
    create: Prisma.XOR<Prisma.userCreateWithoutCoinsInput, Prisma.userUncheckedCreateWithoutCoinsInput>;
};
export type userUpsertWithoutCoinsInput = {
    update: Prisma.XOR<Prisma.userUpdateWithoutCoinsInput, Prisma.userUncheckedUpdateWithoutCoinsInput>;
    create: Prisma.XOR<Prisma.userCreateWithoutCoinsInput, Prisma.userUncheckedCreateWithoutCoinsInput>;
    where?: Prisma.userWhereInput;
};
export type userUpdateToOneWithWhereWithoutCoinsInput = {
    where?: Prisma.userWhereInput;
    data: Prisma.XOR<Prisma.userUpdateWithoutCoinsInput, Prisma.userUncheckedUpdateWithoutCoinsInput>;
};
export type userUpdateWithoutCoinsInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
    coinsHeld?: Prisma.holdingUpdateManyWithoutUserNestedInput;
    apiKeys?: Prisma.apiKeysUpdateManyWithoutUserNestedInput;
    messages?: Prisma.messageUpdateManyWithoutUserNestedInput;
};
export type userUncheckedUpdateWithoutCoinsInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
    coinsHeld?: Prisma.holdingUncheckedUpdateManyWithoutUserNestedInput;
    apiKeys?: Prisma.apiKeysUncheckedUpdateManyWithoutUserNestedInput;
    messages?: Prisma.messageUncheckedUpdateManyWithoutUserNestedInput;
};
export type userCreateWithoutApiKeysInput = {
    publicKey: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    countryCode?: string | null;
    contact?: string | null;
    aura?: number;
    coins?: Prisma.coinCreateNestedManyWithoutUserInput;
    coinsHeld?: Prisma.holdingCreateNestedManyWithoutUserInput;
    messages?: Prisma.messageCreateNestedManyWithoutUserInput;
};
export type userUncheckedCreateWithoutApiKeysInput = {
    publicKey: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    countryCode?: string | null;
    contact?: string | null;
    aura?: number;
    coins?: Prisma.coinUncheckedCreateNestedManyWithoutUserInput;
    coinsHeld?: Prisma.holdingUncheckedCreateNestedManyWithoutUserInput;
    messages?: Prisma.messageUncheckedCreateNestedManyWithoutUserInput;
};
export type userCreateOrConnectWithoutApiKeysInput = {
    where: Prisma.userWhereUniqueInput;
    create: Prisma.XOR<Prisma.userCreateWithoutApiKeysInput, Prisma.userUncheckedCreateWithoutApiKeysInput>;
};
export type userUpsertWithoutApiKeysInput = {
    update: Prisma.XOR<Prisma.userUpdateWithoutApiKeysInput, Prisma.userUncheckedUpdateWithoutApiKeysInput>;
    create: Prisma.XOR<Prisma.userCreateWithoutApiKeysInput, Prisma.userUncheckedCreateWithoutApiKeysInput>;
    where?: Prisma.userWhereInput;
};
export type userUpdateToOneWithWhereWithoutApiKeysInput = {
    where?: Prisma.userWhereInput;
    data: Prisma.XOR<Prisma.userUpdateWithoutApiKeysInput, Prisma.userUncheckedUpdateWithoutApiKeysInput>;
};
export type userUpdateWithoutApiKeysInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
    coins?: Prisma.coinUpdateManyWithoutUserNestedInput;
    coinsHeld?: Prisma.holdingUpdateManyWithoutUserNestedInput;
    messages?: Prisma.messageUpdateManyWithoutUserNestedInput;
};
export type userUncheckedUpdateWithoutApiKeysInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
    coins?: Prisma.coinUncheckedUpdateManyWithoutUserNestedInput;
    coinsHeld?: Prisma.holdingUncheckedUpdateManyWithoutUserNestedInput;
    messages?: Prisma.messageUncheckedUpdateManyWithoutUserNestedInput;
};
export type userCreateWithoutMessagesInput = {
    publicKey: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    countryCode?: string | null;
    contact?: string | null;
    aura?: number;
    coins?: Prisma.coinCreateNestedManyWithoutUserInput;
    coinsHeld?: Prisma.holdingCreateNestedManyWithoutUserInput;
    apiKeys?: Prisma.apiKeysCreateNestedManyWithoutUserInput;
};
export type userUncheckedCreateWithoutMessagesInput = {
    publicKey: string;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    countryCode?: string | null;
    contact?: string | null;
    aura?: number;
    coins?: Prisma.coinUncheckedCreateNestedManyWithoutUserInput;
    coinsHeld?: Prisma.holdingUncheckedCreateNestedManyWithoutUserInput;
    apiKeys?: Prisma.apiKeysUncheckedCreateNestedManyWithoutUserInput;
};
export type userCreateOrConnectWithoutMessagesInput = {
    where: Prisma.userWhereUniqueInput;
    create: Prisma.XOR<Prisma.userCreateWithoutMessagesInput, Prisma.userUncheckedCreateWithoutMessagesInput>;
};
export type userUpsertWithoutMessagesInput = {
    update: Prisma.XOR<Prisma.userUpdateWithoutMessagesInput, Prisma.userUncheckedUpdateWithoutMessagesInput>;
    create: Prisma.XOR<Prisma.userCreateWithoutMessagesInput, Prisma.userUncheckedCreateWithoutMessagesInput>;
    where?: Prisma.userWhereInput;
};
export type userUpdateToOneWithWhereWithoutMessagesInput = {
    where?: Prisma.userWhereInput;
    data: Prisma.XOR<Prisma.userUpdateWithoutMessagesInput, Prisma.userUncheckedUpdateWithoutMessagesInput>;
};
export type userUpdateWithoutMessagesInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
    coins?: Prisma.coinUpdateManyWithoutUserNestedInput;
    coinsHeld?: Prisma.holdingUpdateManyWithoutUserNestedInput;
    apiKeys?: Prisma.apiKeysUpdateManyWithoutUserNestedInput;
};
export type userUncheckedUpdateWithoutMessagesInput = {
    publicKey?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    countryCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contact?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aura?: Prisma.IntFieldUpdateOperationsInput | number;
    coins?: Prisma.coinUncheckedUpdateManyWithoutUserNestedInput;
    coinsHeld?: Prisma.holdingUncheckedUpdateManyWithoutUserNestedInput;
    apiKeys?: Prisma.apiKeysUncheckedUpdateManyWithoutUserNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    coins: number;
    coinsHeld: number;
    apiKeys: number;
    messages: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coins?: boolean | UserCountOutputTypeCountCoinsArgs;
    coinsHeld?: boolean | UserCountOutputTypeCountCoinsHeldArgs;
    apiKeys?: boolean | UserCountOutputTypeCountApiKeysArgs;
    messages?: boolean | UserCountOutputTypeCountMessagesArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountCoinsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.coinWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountCoinsHeldArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.holdingWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountApiKeysArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.apiKeysWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.messageWhereInput;
};
export type userSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    publicKey?: boolean;
    username?: boolean;
    name?: boolean;
    email?: boolean;
    countryCode?: boolean;
    contact?: boolean;
    aura?: boolean;
    coins?: boolean | Prisma.user$coinsArgs<ExtArgs>;
    coinsHeld?: boolean | Prisma.user$coinsHeldArgs<ExtArgs>;
    apiKeys?: boolean | Prisma.user$apiKeysArgs<ExtArgs>;
    messages?: boolean | Prisma.user$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type userSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    publicKey?: boolean;
    username?: boolean;
    name?: boolean;
    email?: boolean;
    countryCode?: boolean;
    contact?: boolean;
    aura?: boolean;
}, ExtArgs["result"]["user"]>;
export type userSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    publicKey?: boolean;
    username?: boolean;
    name?: boolean;
    email?: boolean;
    countryCode?: boolean;
    contact?: boolean;
    aura?: boolean;
}, ExtArgs["result"]["user"]>;
export type userSelectScalar = {
    publicKey?: boolean;
    username?: boolean;
    name?: boolean;
    email?: boolean;
    countryCode?: boolean;
    contact?: boolean;
    aura?: boolean;
};
export type userOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"publicKey" | "username" | "name" | "email" | "countryCode" | "contact" | "aura", ExtArgs["result"]["user"]>;
export type userInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coins?: boolean | Prisma.user$coinsArgs<ExtArgs>;
    coinsHeld?: boolean | Prisma.user$coinsHeldArgs<ExtArgs>;
    apiKeys?: boolean | Prisma.user$apiKeysArgs<ExtArgs>;
    messages?: boolean | Prisma.user$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type userIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type userIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $userPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "user";
    objects: {
        coins: Prisma.$coinPayload<ExtArgs>[];
        coinsHeld: Prisma.$holdingPayload<ExtArgs>[];
        apiKeys: Prisma.$apiKeysPayload<ExtArgs>[];
        messages: Prisma.$messagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        publicKey: string;
        username: string | null;
        name: string | null;
        email: string | null;
        countryCode: string | null;
        contact: string | null;
        aura: number;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$userPayload, S>;
export type userCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface userDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['user'];
        meta: {
            name: 'user';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: Prisma.SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma.Prisma__userClient<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__userClient<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: Prisma.SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma.Prisma__userClient<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__userClient<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `publicKey`
     * const userWithPublicKeyOnly = await prisma.user.findMany({ select: { publicKey: true } })
     *
     */
    findMany<T extends userFindManyArgs>(args?: Prisma.SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends userCreateArgs>(args: Prisma.SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma.Prisma__userClient<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends userCreateManyArgs>(args?: Prisma.SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {userCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `publicKey`
     * const userWithPublicKeyOnly = await prisma.user.createManyAndReturn({
     *   select: { publicKey: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends userCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends userDeleteArgs>(args: Prisma.SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma.Prisma__userClient<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends userUpdateArgs>(args: Prisma.SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma.Prisma__userClient<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends userDeleteManyArgs>(args?: Prisma.SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends userUpdateManyArgs>(args: Prisma.SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {userUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `publicKey`
     * const userWithPublicKeyOnly = await prisma.user.updateManyAndReturn({
     *   select: { publicKey: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends userUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: Prisma.SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma.Prisma__userClient<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(args?: Prisma.Subset<T, userCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends userGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: userGroupByArgs['orderBy'];
    } : {
        orderBy?: userGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the user model
     */
    readonly fields: userFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for user.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__userClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    coins<T extends Prisma.user$coinsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.user$coinsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$coinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    coinsHeld<T extends Prisma.user$coinsHeldArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.user$coinsHeldArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    apiKeys<T extends Prisma.user$apiKeysArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.user$apiKeysArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$apiKeysPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    messages<T extends Prisma.user$messagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.user$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the user model
 */
export interface userFieldRefs {
    readonly publicKey: Prisma.FieldRef<"user", 'String'>;
    readonly username: Prisma.FieldRef<"user", 'String'>;
    readonly name: Prisma.FieldRef<"user", 'String'>;
    readonly email: Prisma.FieldRef<"user", 'String'>;
    readonly countryCode: Prisma.FieldRef<"user", 'String'>;
    readonly contact: Prisma.FieldRef<"user", 'String'>;
    readonly aura: Prisma.FieldRef<"user", 'Int'>;
}
/**
 * user findUnique
 */
export type userFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.userInclude<ExtArgs> | null;
    /**
     * Filter, which user to fetch.
     */
    where: Prisma.userWhereUniqueInput;
};
/**
 * user findUniqueOrThrow
 */
export type userFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.userInclude<ExtArgs> | null;
    /**
     * Filter, which user to fetch.
     */
    where: Prisma.userWhereUniqueInput;
};
/**
 * user findFirst
 */
export type userFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.userInclude<ExtArgs> | null;
    /**
     * Filter, which user to fetch.
     */
    where?: Prisma.userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of users to fetch.
     */
    orderBy?: Prisma.userOrderByWithRelationInput | Prisma.userOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for users.
     */
    cursor?: Prisma.userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * user findFirstOrThrow
 */
export type userFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.userInclude<ExtArgs> | null;
    /**
     * Filter, which user to fetch.
     */
    where?: Prisma.userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of users to fetch.
     */
    orderBy?: Prisma.userOrderByWithRelationInput | Prisma.userOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for users.
     */
    cursor?: Prisma.userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * user findMany
 */
export type userFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.userInclude<ExtArgs> | null;
    /**
     * Filter, which users to fetch.
     */
    where?: Prisma.userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of users to fetch.
     */
    orderBy?: Prisma.userOrderByWithRelationInput | Prisma.userOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing users.
     */
    cursor?: Prisma.userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` users.
     */
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * user create
 */
export type userCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.userInclude<ExtArgs> | null;
    /**
     * The data needed to create a user.
     */
    data: Prisma.XOR<Prisma.userCreateInput, Prisma.userUncheckedCreateInput>;
};
/**
 * user createMany
 */
export type userCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: Prisma.userCreateManyInput | Prisma.userCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * user createManyAndReturn
 */
export type userCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * The data used to create many users.
     */
    data: Prisma.userCreateManyInput | Prisma.userCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * user update
 */
export type userUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.userInclude<ExtArgs> | null;
    /**
     * The data needed to update a user.
     */
    data: Prisma.XOR<Prisma.userUpdateInput, Prisma.userUncheckedUpdateInput>;
    /**
     * Choose, which user to update.
     */
    where: Prisma.userWhereUniqueInput;
};
/**
 * user updateMany
 */
export type userUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: Prisma.XOR<Prisma.userUpdateManyMutationInput, Prisma.userUncheckedUpdateManyInput>;
    /**
     * Filter which users to update
     */
    where?: Prisma.userWhereInput;
    /**
     * Limit how many users to update.
     */
    limit?: number;
};
/**
 * user updateManyAndReturn
 */
export type userUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * The data used to update users.
     */
    data: Prisma.XOR<Prisma.userUpdateManyMutationInput, Prisma.userUncheckedUpdateManyInput>;
    /**
     * Filter which users to update
     */
    where?: Prisma.userWhereInput;
    /**
     * Limit how many users to update.
     */
    limit?: number;
};
/**
 * user upsert
 */
export type userUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.userInclude<ExtArgs> | null;
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: Prisma.userWhereUniqueInput;
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: Prisma.XOR<Prisma.userCreateInput, Prisma.userUncheckedCreateInput>;
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.userUpdateInput, Prisma.userUncheckedUpdateInput>;
};
/**
 * user delete
 */
export type userDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.userInclude<ExtArgs> | null;
    /**
     * Filter which user to delete.
     */
    where: Prisma.userWhereUniqueInput;
};
/**
 * user deleteMany
 */
export type userDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: Prisma.userWhereInput;
    /**
     * Limit how many users to delete.
     */
    limit?: number;
};
/**
 * user.coins
 */
export type user$coinsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coin
     */
    select?: Prisma.coinSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the coin
     */
    omit?: Prisma.coinOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.coinInclude<ExtArgs> | null;
    where?: Prisma.coinWhereInput;
    orderBy?: Prisma.coinOrderByWithRelationInput | Prisma.coinOrderByWithRelationInput[];
    cursor?: Prisma.coinWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CoinScalarFieldEnum | Prisma.CoinScalarFieldEnum[];
};
/**
 * user.coinsHeld
 */
export type user$coinsHeldArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holding
     */
    select?: Prisma.holdingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the holding
     */
    omit?: Prisma.holdingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.holdingInclude<ExtArgs> | null;
    where?: Prisma.holdingWhereInput;
    orderBy?: Prisma.holdingOrderByWithRelationInput | Prisma.holdingOrderByWithRelationInput[];
    cursor?: Prisma.holdingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HoldingScalarFieldEnum | Prisma.HoldingScalarFieldEnum[];
};
/**
 * user.apiKeys
 */
export type user$apiKeysArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the apiKeys
     */
    select?: Prisma.apiKeysSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the apiKeys
     */
    omit?: Prisma.apiKeysOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.apiKeysInclude<ExtArgs> | null;
    where?: Prisma.apiKeysWhereInput;
    orderBy?: Prisma.apiKeysOrderByWithRelationInput | Prisma.apiKeysOrderByWithRelationInput[];
    cursor?: Prisma.apiKeysWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ApiKeysScalarFieldEnum | Prisma.ApiKeysScalarFieldEnum[];
};
/**
 * user.messages
 */
export type user$messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the message
     */
    select?: Prisma.messageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the message
     */
    omit?: Prisma.messageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageInclude<ExtArgs> | null;
    where?: Prisma.messageWhereInput;
    orderBy?: Prisma.messageOrderByWithRelationInput | Prisma.messageOrderByWithRelationInput[];
    cursor?: Prisma.messageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
/**
 * user without action
 */
export type userDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: Prisma.userSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the user
     */
    omit?: Prisma.userOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.userInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=user.d.ts.map