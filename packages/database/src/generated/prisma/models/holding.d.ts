import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model holding
 *
 */
export type holdingModel = runtime.Types.Result.DefaultSelection<Prisma.$holdingPayload>;
export type AggregateHolding = {
    _count: HoldingCountAggregateOutputType | null;
    _avg: HoldingAvgAggregateOutputType | null;
    _sum: HoldingSumAggregateOutputType | null;
    _min: HoldingMinAggregateOutputType | null;
    _max: HoldingMaxAggregateOutputType | null;
};
export type HoldingAvgAggregateOutputType = {
    amount: number | null;
};
export type HoldingSumAggregateOutputType = {
    amount: bigint | null;
};
export type HoldingMinAggregateOutputType = {
    coinAddress: string | null;
    amount: bigint | null;
    userAddress: string | null;
};
export type HoldingMaxAggregateOutputType = {
    coinAddress: string | null;
    amount: bigint | null;
    userAddress: string | null;
};
export type HoldingCountAggregateOutputType = {
    coinAddress: number;
    amount: number;
    userAddress: number;
    _all: number;
};
export type HoldingAvgAggregateInputType = {
    amount?: true;
};
export type HoldingSumAggregateInputType = {
    amount?: true;
};
export type HoldingMinAggregateInputType = {
    coinAddress?: true;
    amount?: true;
    userAddress?: true;
};
export type HoldingMaxAggregateInputType = {
    coinAddress?: true;
    amount?: true;
    userAddress?: true;
};
export type HoldingCountAggregateInputType = {
    coinAddress?: true;
    amount?: true;
    userAddress?: true;
    _all?: true;
};
export type HoldingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which holding to aggregate.
     */
    where?: Prisma.holdingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of holdings to fetch.
     */
    orderBy?: Prisma.holdingOrderByWithRelationInput | Prisma.holdingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.holdingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` holdings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned holdings
    **/
    _count?: true | HoldingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: HoldingAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: HoldingSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: HoldingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: HoldingMaxAggregateInputType;
};
export type GetHoldingAggregateType<T extends HoldingAggregateArgs> = {
    [P in keyof T & keyof AggregateHolding]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHolding[P]> : Prisma.GetScalarType<T[P], AggregateHolding[P]>;
};
export type holdingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.holdingWhereInput;
    orderBy?: Prisma.holdingOrderByWithAggregationInput | Prisma.holdingOrderByWithAggregationInput[];
    by: Prisma.HoldingScalarFieldEnum[] | Prisma.HoldingScalarFieldEnum;
    having?: Prisma.holdingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HoldingCountAggregateInputType | true;
    _avg?: HoldingAvgAggregateInputType;
    _sum?: HoldingSumAggregateInputType;
    _min?: HoldingMinAggregateInputType;
    _max?: HoldingMaxAggregateInputType;
};
export type HoldingGroupByOutputType = {
    coinAddress: string;
    amount: bigint;
    userAddress: string;
    _count: HoldingCountAggregateOutputType | null;
    _avg: HoldingAvgAggregateOutputType | null;
    _sum: HoldingSumAggregateOutputType | null;
    _min: HoldingMinAggregateOutputType | null;
    _max: HoldingMaxAggregateOutputType | null;
};
type GetHoldingGroupByPayload<T extends holdingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HoldingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HoldingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HoldingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HoldingGroupByOutputType[P]>;
}>>;
export type holdingWhereInput = {
    AND?: Prisma.holdingWhereInput | Prisma.holdingWhereInput[];
    OR?: Prisma.holdingWhereInput[];
    NOT?: Prisma.holdingWhereInput | Prisma.holdingWhereInput[];
    coinAddress?: Prisma.StringFilter<"holding"> | string;
    amount?: Prisma.BigIntFilter<"holding"> | bigint | number;
    userAddress?: Prisma.StringFilter<"holding"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.userWhereInput>;
    coin?: Prisma.XOR<Prisma.CoinScalarRelationFilter, Prisma.coinWhereInput>;
};
export type holdingOrderByWithRelationInput = {
    coinAddress?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    userAddress?: Prisma.SortOrder;
    user?: Prisma.userOrderByWithRelationInput;
    coin?: Prisma.coinOrderByWithRelationInput;
};
export type holdingWhereUniqueInput = Prisma.AtLeast<{
    coinAddress_userAddress?: Prisma.holdingCoinAddressUserAddressCompoundUniqueInput;
    AND?: Prisma.holdingWhereInput | Prisma.holdingWhereInput[];
    OR?: Prisma.holdingWhereInput[];
    NOT?: Prisma.holdingWhereInput | Prisma.holdingWhereInput[];
    coinAddress?: Prisma.StringFilter<"holding"> | string;
    amount?: Prisma.BigIntFilter<"holding"> | bigint | number;
    userAddress?: Prisma.StringFilter<"holding"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.userWhereInput>;
    coin?: Prisma.XOR<Prisma.CoinScalarRelationFilter, Prisma.coinWhereInput>;
}, "coinAddress_userAddress">;
export type holdingOrderByWithAggregationInput = {
    coinAddress?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    userAddress?: Prisma.SortOrder;
    _count?: Prisma.holdingCountOrderByAggregateInput;
    _avg?: Prisma.holdingAvgOrderByAggregateInput;
    _max?: Prisma.holdingMaxOrderByAggregateInput;
    _min?: Prisma.holdingMinOrderByAggregateInput;
    _sum?: Prisma.holdingSumOrderByAggregateInput;
};
export type holdingScalarWhereWithAggregatesInput = {
    AND?: Prisma.holdingScalarWhereWithAggregatesInput | Prisma.holdingScalarWhereWithAggregatesInput[];
    OR?: Prisma.holdingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.holdingScalarWhereWithAggregatesInput | Prisma.holdingScalarWhereWithAggregatesInput[];
    coinAddress?: Prisma.StringWithAggregatesFilter<"holding"> | string;
    amount?: Prisma.BigIntWithAggregatesFilter<"holding"> | bigint | number;
    userAddress?: Prisma.StringWithAggregatesFilter<"holding"> | string;
};
export type holdingCreateInput = {
    amount: bigint | number;
    user: Prisma.userCreateNestedOneWithoutCoinsHeldInput;
    coin: Prisma.coinCreateNestedOneWithoutHoldingsInput;
};
export type holdingUncheckedCreateInput = {
    coinAddress: string;
    amount: bigint | number;
    userAddress: string;
};
export type holdingUpdateInput = {
    amount?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user?: Prisma.userUpdateOneRequiredWithoutCoinsHeldNestedInput;
    coin?: Prisma.coinUpdateOneRequiredWithoutHoldingsNestedInput;
};
export type holdingUncheckedUpdateInput = {
    coinAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    userAddress?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type holdingCreateManyInput = {
    coinAddress: string;
    amount: bigint | number;
    userAddress: string;
};
export type holdingUpdateManyMutationInput = {
    amount?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type holdingUncheckedUpdateManyInput = {
    coinAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    userAddress?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type HoldingListRelationFilter = {
    every?: Prisma.holdingWhereInput;
    some?: Prisma.holdingWhereInput;
    none?: Prisma.holdingWhereInput;
};
export type holdingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type holdingCoinAddressUserAddressCompoundUniqueInput = {
    coinAddress: string;
    userAddress: string;
};
export type holdingCountOrderByAggregateInput = {
    coinAddress?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    userAddress?: Prisma.SortOrder;
};
export type holdingAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type holdingMaxOrderByAggregateInput = {
    coinAddress?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    userAddress?: Prisma.SortOrder;
};
export type holdingMinOrderByAggregateInput = {
    coinAddress?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    userAddress?: Prisma.SortOrder;
};
export type holdingSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type holdingCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.holdingCreateWithoutUserInput, Prisma.holdingUncheckedCreateWithoutUserInput> | Prisma.holdingCreateWithoutUserInput[] | Prisma.holdingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.holdingCreateOrConnectWithoutUserInput | Prisma.holdingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.holdingCreateManyUserInputEnvelope;
    connect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
};
export type holdingUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.holdingCreateWithoutUserInput, Prisma.holdingUncheckedCreateWithoutUserInput> | Prisma.holdingCreateWithoutUserInput[] | Prisma.holdingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.holdingCreateOrConnectWithoutUserInput | Prisma.holdingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.holdingCreateManyUserInputEnvelope;
    connect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
};
export type holdingUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.holdingCreateWithoutUserInput, Prisma.holdingUncheckedCreateWithoutUserInput> | Prisma.holdingCreateWithoutUserInput[] | Prisma.holdingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.holdingCreateOrConnectWithoutUserInput | Prisma.holdingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.holdingUpsertWithWhereUniqueWithoutUserInput | Prisma.holdingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.holdingCreateManyUserInputEnvelope;
    set?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    disconnect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    delete?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    connect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    update?: Prisma.holdingUpdateWithWhereUniqueWithoutUserInput | Prisma.holdingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.holdingUpdateManyWithWhereWithoutUserInput | Prisma.holdingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.holdingScalarWhereInput | Prisma.holdingScalarWhereInput[];
};
export type holdingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.holdingCreateWithoutUserInput, Prisma.holdingUncheckedCreateWithoutUserInput> | Prisma.holdingCreateWithoutUserInput[] | Prisma.holdingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.holdingCreateOrConnectWithoutUserInput | Prisma.holdingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.holdingUpsertWithWhereUniqueWithoutUserInput | Prisma.holdingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.holdingCreateManyUserInputEnvelope;
    set?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    disconnect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    delete?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    connect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    update?: Prisma.holdingUpdateWithWhereUniqueWithoutUserInput | Prisma.holdingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.holdingUpdateManyWithWhereWithoutUserInput | Prisma.holdingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.holdingScalarWhereInput | Prisma.holdingScalarWhereInput[];
};
export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type holdingCreateNestedManyWithoutCoinInput = {
    create?: Prisma.XOR<Prisma.holdingCreateWithoutCoinInput, Prisma.holdingUncheckedCreateWithoutCoinInput> | Prisma.holdingCreateWithoutCoinInput[] | Prisma.holdingUncheckedCreateWithoutCoinInput[];
    connectOrCreate?: Prisma.holdingCreateOrConnectWithoutCoinInput | Prisma.holdingCreateOrConnectWithoutCoinInput[];
    createMany?: Prisma.holdingCreateManyCoinInputEnvelope;
    connect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
};
export type holdingUncheckedCreateNestedManyWithoutCoinInput = {
    create?: Prisma.XOR<Prisma.holdingCreateWithoutCoinInput, Prisma.holdingUncheckedCreateWithoutCoinInput> | Prisma.holdingCreateWithoutCoinInput[] | Prisma.holdingUncheckedCreateWithoutCoinInput[];
    connectOrCreate?: Prisma.holdingCreateOrConnectWithoutCoinInput | Prisma.holdingCreateOrConnectWithoutCoinInput[];
    createMany?: Prisma.holdingCreateManyCoinInputEnvelope;
    connect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
};
export type holdingUpdateManyWithoutCoinNestedInput = {
    create?: Prisma.XOR<Prisma.holdingCreateWithoutCoinInput, Prisma.holdingUncheckedCreateWithoutCoinInput> | Prisma.holdingCreateWithoutCoinInput[] | Prisma.holdingUncheckedCreateWithoutCoinInput[];
    connectOrCreate?: Prisma.holdingCreateOrConnectWithoutCoinInput | Prisma.holdingCreateOrConnectWithoutCoinInput[];
    upsert?: Prisma.holdingUpsertWithWhereUniqueWithoutCoinInput | Prisma.holdingUpsertWithWhereUniqueWithoutCoinInput[];
    createMany?: Prisma.holdingCreateManyCoinInputEnvelope;
    set?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    disconnect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    delete?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    connect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    update?: Prisma.holdingUpdateWithWhereUniqueWithoutCoinInput | Prisma.holdingUpdateWithWhereUniqueWithoutCoinInput[];
    updateMany?: Prisma.holdingUpdateManyWithWhereWithoutCoinInput | Prisma.holdingUpdateManyWithWhereWithoutCoinInput[];
    deleteMany?: Prisma.holdingScalarWhereInput | Prisma.holdingScalarWhereInput[];
};
export type holdingUncheckedUpdateManyWithoutCoinNestedInput = {
    create?: Prisma.XOR<Prisma.holdingCreateWithoutCoinInput, Prisma.holdingUncheckedCreateWithoutCoinInput> | Prisma.holdingCreateWithoutCoinInput[] | Prisma.holdingUncheckedCreateWithoutCoinInput[];
    connectOrCreate?: Prisma.holdingCreateOrConnectWithoutCoinInput | Prisma.holdingCreateOrConnectWithoutCoinInput[];
    upsert?: Prisma.holdingUpsertWithWhereUniqueWithoutCoinInput | Prisma.holdingUpsertWithWhereUniqueWithoutCoinInput[];
    createMany?: Prisma.holdingCreateManyCoinInputEnvelope;
    set?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    disconnect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    delete?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    connect?: Prisma.holdingWhereUniqueInput | Prisma.holdingWhereUniqueInput[];
    update?: Prisma.holdingUpdateWithWhereUniqueWithoutCoinInput | Prisma.holdingUpdateWithWhereUniqueWithoutCoinInput[];
    updateMany?: Prisma.holdingUpdateManyWithWhereWithoutCoinInput | Prisma.holdingUpdateManyWithWhereWithoutCoinInput[];
    deleteMany?: Prisma.holdingScalarWhereInput | Prisma.holdingScalarWhereInput[];
};
export type holdingCreateWithoutUserInput = {
    amount: bigint | number;
    coin: Prisma.coinCreateNestedOneWithoutHoldingsInput;
};
export type holdingUncheckedCreateWithoutUserInput = {
    coinAddress: string;
    amount: bigint | number;
};
export type holdingCreateOrConnectWithoutUserInput = {
    where: Prisma.holdingWhereUniqueInput;
    create: Prisma.XOR<Prisma.holdingCreateWithoutUserInput, Prisma.holdingUncheckedCreateWithoutUserInput>;
};
export type holdingCreateManyUserInputEnvelope = {
    data: Prisma.holdingCreateManyUserInput | Prisma.holdingCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type holdingUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.holdingWhereUniqueInput;
    update: Prisma.XOR<Prisma.holdingUpdateWithoutUserInput, Prisma.holdingUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.holdingCreateWithoutUserInput, Prisma.holdingUncheckedCreateWithoutUserInput>;
};
export type holdingUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.holdingWhereUniqueInput;
    data: Prisma.XOR<Prisma.holdingUpdateWithoutUserInput, Prisma.holdingUncheckedUpdateWithoutUserInput>;
};
export type holdingUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.holdingScalarWhereInput;
    data: Prisma.XOR<Prisma.holdingUpdateManyMutationInput, Prisma.holdingUncheckedUpdateManyWithoutUserInput>;
};
export type holdingScalarWhereInput = {
    AND?: Prisma.holdingScalarWhereInput | Prisma.holdingScalarWhereInput[];
    OR?: Prisma.holdingScalarWhereInput[];
    NOT?: Prisma.holdingScalarWhereInput | Prisma.holdingScalarWhereInput[];
    coinAddress?: Prisma.StringFilter<"holding"> | string;
    amount?: Prisma.BigIntFilter<"holding"> | bigint | number;
    userAddress?: Prisma.StringFilter<"holding"> | string;
};
export type holdingCreateWithoutCoinInput = {
    amount: bigint | number;
    user: Prisma.userCreateNestedOneWithoutCoinsHeldInput;
};
export type holdingUncheckedCreateWithoutCoinInput = {
    amount: bigint | number;
    userAddress: string;
};
export type holdingCreateOrConnectWithoutCoinInput = {
    where: Prisma.holdingWhereUniqueInput;
    create: Prisma.XOR<Prisma.holdingCreateWithoutCoinInput, Prisma.holdingUncheckedCreateWithoutCoinInput>;
};
export type holdingCreateManyCoinInputEnvelope = {
    data: Prisma.holdingCreateManyCoinInput | Prisma.holdingCreateManyCoinInput[];
    skipDuplicates?: boolean;
};
export type holdingUpsertWithWhereUniqueWithoutCoinInput = {
    where: Prisma.holdingWhereUniqueInput;
    update: Prisma.XOR<Prisma.holdingUpdateWithoutCoinInput, Prisma.holdingUncheckedUpdateWithoutCoinInput>;
    create: Prisma.XOR<Prisma.holdingCreateWithoutCoinInput, Prisma.holdingUncheckedCreateWithoutCoinInput>;
};
export type holdingUpdateWithWhereUniqueWithoutCoinInput = {
    where: Prisma.holdingWhereUniqueInput;
    data: Prisma.XOR<Prisma.holdingUpdateWithoutCoinInput, Prisma.holdingUncheckedUpdateWithoutCoinInput>;
};
export type holdingUpdateManyWithWhereWithoutCoinInput = {
    where: Prisma.holdingScalarWhereInput;
    data: Prisma.XOR<Prisma.holdingUpdateManyMutationInput, Prisma.holdingUncheckedUpdateManyWithoutCoinInput>;
};
export type holdingCreateManyUserInput = {
    coinAddress: string;
    amount: bigint | number;
};
export type holdingUpdateWithoutUserInput = {
    amount?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    coin?: Prisma.coinUpdateOneRequiredWithoutHoldingsNestedInput;
};
export type holdingUncheckedUpdateWithoutUserInput = {
    coinAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type holdingUncheckedUpdateManyWithoutUserInput = {
    coinAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type holdingCreateManyCoinInput = {
    amount: bigint | number;
    userAddress: string;
};
export type holdingUpdateWithoutCoinInput = {
    amount?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    user?: Prisma.userUpdateOneRequiredWithoutCoinsHeldNestedInput;
};
export type holdingUncheckedUpdateWithoutCoinInput = {
    amount?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    userAddress?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type holdingUncheckedUpdateManyWithoutCoinInput = {
    amount?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    userAddress?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type holdingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    coinAddress?: boolean;
    amount?: boolean;
    userAddress?: boolean;
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["holding"]>;
export type holdingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    coinAddress?: boolean;
    amount?: boolean;
    userAddress?: boolean;
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["holding"]>;
export type holdingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    coinAddress?: boolean;
    amount?: boolean;
    userAddress?: boolean;
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["holding"]>;
export type holdingSelectScalar = {
    coinAddress?: boolean;
    amount?: boolean;
    userAddress?: boolean;
};
export type holdingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"coinAddress" | "amount" | "userAddress", ExtArgs["result"]["holding"]>;
export type holdingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
};
export type holdingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
};
export type holdingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
};
export type $holdingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "holding";
    objects: {
        user: Prisma.$userPayload<ExtArgs>;
        coin: Prisma.$coinPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        coinAddress: string;
        amount: bigint;
        userAddress: string;
    }, ExtArgs["result"]["holding"]>;
    composites: {};
};
export type holdingGetPayload<S extends boolean | null | undefined | holdingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$holdingPayload, S>;
export type holdingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<holdingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HoldingCountAggregateInputType | true;
};
export interface holdingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['holding'];
        meta: {
            name: 'holding';
        };
    };
    /**
     * Find zero or one Holding that matches the filter.
     * @param {holdingFindUniqueArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends holdingFindUniqueArgs>(args: Prisma.SelectSubset<T, holdingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__holdingClient<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Holding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {holdingFindUniqueOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends holdingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, holdingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__holdingClient<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Holding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holdingFindFirstArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends holdingFindFirstArgs>(args?: Prisma.SelectSubset<T, holdingFindFirstArgs<ExtArgs>>): Prisma.Prisma__holdingClient<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Holding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holdingFindFirstOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends holdingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, holdingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__holdingClient<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Holdings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holdingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Holdings
     * const holdings = await prisma.holding.findMany()
     *
     * // Get first 10 Holdings
     * const holdings = await prisma.holding.findMany({ take: 10 })
     *
     * // Only select the `coinAddress`
     * const holdingWithCoinAddressOnly = await prisma.holding.findMany({ select: { coinAddress: true } })
     *
     */
    findMany<T extends holdingFindManyArgs>(args?: Prisma.SelectSubset<T, holdingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Holding.
     * @param {holdingCreateArgs} args - Arguments to create a Holding.
     * @example
     * // Create one Holding
     * const Holding = await prisma.holding.create({
     *   data: {
     *     // ... data to create a Holding
     *   }
     * })
     *
     */
    create<T extends holdingCreateArgs>(args: Prisma.SelectSubset<T, holdingCreateArgs<ExtArgs>>): Prisma.Prisma__holdingClient<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Holdings.
     * @param {holdingCreateManyArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends holdingCreateManyArgs>(args?: Prisma.SelectSubset<T, holdingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Holdings and returns the data saved in the database.
     * @param {holdingCreateManyAndReturnArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Holdings and only return the `coinAddress`
     * const holdingWithCoinAddressOnly = await prisma.holding.createManyAndReturn({
     *   select: { coinAddress: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends holdingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, holdingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Holding.
     * @param {holdingDeleteArgs} args - Arguments to delete one Holding.
     * @example
     * // Delete one Holding
     * const Holding = await prisma.holding.delete({
     *   where: {
     *     // ... filter to delete one Holding
     *   }
     * })
     *
     */
    delete<T extends holdingDeleteArgs>(args: Prisma.SelectSubset<T, holdingDeleteArgs<ExtArgs>>): Prisma.Prisma__holdingClient<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Holding.
     * @param {holdingUpdateArgs} args - Arguments to update one Holding.
     * @example
     * // Update one Holding
     * const holding = await prisma.holding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends holdingUpdateArgs>(args: Prisma.SelectSubset<T, holdingUpdateArgs<ExtArgs>>): Prisma.Prisma__holdingClient<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Holdings.
     * @param {holdingDeleteManyArgs} args - Arguments to filter Holdings to delete.
     * @example
     * // Delete a few Holdings
     * const { count } = await prisma.holding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends holdingDeleteManyArgs>(args?: Prisma.SelectSubset<T, holdingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holdingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Holdings
     * const holding = await prisma.holding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends holdingUpdateManyArgs>(args: Prisma.SelectSubset<T, holdingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Holdings and returns the data updated in the database.
     * @param {holdingUpdateManyAndReturnArgs} args - Arguments to update many Holdings.
     * @example
     * // Update many Holdings
     * const holding = await prisma.holding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Holdings and only return the `coinAddress`
     * const holdingWithCoinAddressOnly = await prisma.holding.updateManyAndReturn({
     *   select: { coinAddress: true },
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
    updateManyAndReturn<T extends holdingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, holdingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Holding.
     * @param {holdingUpsertArgs} args - Arguments to update or create a Holding.
     * @example
     * // Update or create a Holding
     * const holding = await prisma.holding.upsert({
     *   create: {
     *     // ... data to create a Holding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Holding we want to update
     *   }
     * })
     */
    upsert<T extends holdingUpsertArgs>(args: Prisma.SelectSubset<T, holdingUpsertArgs<ExtArgs>>): Prisma.Prisma__holdingClient<runtime.Types.Result.GetResult<Prisma.$holdingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holdingCountArgs} args - Arguments to filter Holdings to count.
     * @example
     * // Count the number of Holdings
     * const count = await prisma.holding.count({
     *   where: {
     *     // ... the filter for the Holdings we want to count
     *   }
     * })
    **/
    count<T extends holdingCountArgs>(args?: Prisma.Subset<T, holdingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HoldingCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HoldingAggregateArgs>(args: Prisma.Subset<T, HoldingAggregateArgs>): Prisma.PrismaPromise<GetHoldingAggregateType<T>>;
    /**
     * Group by Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holdingGroupByArgs} args - Group by arguments.
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
    groupBy<T extends holdingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: holdingGroupByArgs['orderBy'];
    } : {
        orderBy?: holdingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, holdingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHoldingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the holding model
     */
    readonly fields: holdingFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for holding.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__holdingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.userDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.userDefaultArgs<ExtArgs>>): Prisma.Prisma__userClient<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    coin<T extends Prisma.coinDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.coinDefaultArgs<ExtArgs>>): Prisma.Prisma__coinClient<runtime.Types.Result.GetResult<Prisma.$coinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the holding model
 */
export interface holdingFieldRefs {
    readonly coinAddress: Prisma.FieldRef<"holding", 'String'>;
    readonly amount: Prisma.FieldRef<"holding", 'BigInt'>;
    readonly userAddress: Prisma.FieldRef<"holding", 'String'>;
}
/**
 * holding findUnique
 */
export type holdingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which holding to fetch.
     */
    where: Prisma.holdingWhereUniqueInput;
};
/**
 * holding findUniqueOrThrow
 */
export type holdingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which holding to fetch.
     */
    where: Prisma.holdingWhereUniqueInput;
};
/**
 * holding findFirst
 */
export type holdingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which holding to fetch.
     */
    where?: Prisma.holdingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of holdings to fetch.
     */
    orderBy?: Prisma.holdingOrderByWithRelationInput | Prisma.holdingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for holdings.
     */
    cursor?: Prisma.holdingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` holdings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of holdings.
     */
    distinct?: Prisma.HoldingScalarFieldEnum | Prisma.HoldingScalarFieldEnum[];
};
/**
 * holding findFirstOrThrow
 */
export type holdingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which holding to fetch.
     */
    where?: Prisma.holdingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of holdings to fetch.
     */
    orderBy?: Prisma.holdingOrderByWithRelationInput | Prisma.holdingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for holdings.
     */
    cursor?: Prisma.holdingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` holdings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of holdings.
     */
    distinct?: Prisma.HoldingScalarFieldEnum | Prisma.HoldingScalarFieldEnum[];
};
/**
 * holding findMany
 */
export type holdingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which holdings to fetch.
     */
    where?: Prisma.holdingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of holdings to fetch.
     */
    orderBy?: Prisma.holdingOrderByWithRelationInput | Prisma.holdingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing holdings.
     */
    cursor?: Prisma.holdingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` holdings.
     */
    skip?: number;
    distinct?: Prisma.HoldingScalarFieldEnum | Prisma.HoldingScalarFieldEnum[];
};
/**
 * holding create
 */
export type holdingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a holding.
     */
    data: Prisma.XOR<Prisma.holdingCreateInput, Prisma.holdingUncheckedCreateInput>;
};
/**
 * holding createMany
 */
export type holdingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many holdings.
     */
    data: Prisma.holdingCreateManyInput | Prisma.holdingCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * holding createManyAndReturn
 */
export type holdingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holding
     */
    select?: Prisma.holdingSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the holding
     */
    omit?: Prisma.holdingOmit<ExtArgs> | null;
    /**
     * The data used to create many holdings.
     */
    data: Prisma.holdingCreateManyInput | Prisma.holdingCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.holdingIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * holding update
 */
export type holdingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a holding.
     */
    data: Prisma.XOR<Prisma.holdingUpdateInput, Prisma.holdingUncheckedUpdateInput>;
    /**
     * Choose, which holding to update.
     */
    where: Prisma.holdingWhereUniqueInput;
};
/**
 * holding updateMany
 */
export type holdingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update holdings.
     */
    data: Prisma.XOR<Prisma.holdingUpdateManyMutationInput, Prisma.holdingUncheckedUpdateManyInput>;
    /**
     * Filter which holdings to update
     */
    where?: Prisma.holdingWhereInput;
    /**
     * Limit how many holdings to update.
     */
    limit?: number;
};
/**
 * holding updateManyAndReturn
 */
export type holdingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holding
     */
    select?: Prisma.holdingSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the holding
     */
    omit?: Prisma.holdingOmit<ExtArgs> | null;
    /**
     * The data used to update holdings.
     */
    data: Prisma.XOR<Prisma.holdingUpdateManyMutationInput, Prisma.holdingUncheckedUpdateManyInput>;
    /**
     * Filter which holdings to update
     */
    where?: Prisma.holdingWhereInput;
    /**
     * Limit how many holdings to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.holdingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * holding upsert
 */
export type holdingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the holding to update in case it exists.
     */
    where: Prisma.holdingWhereUniqueInput;
    /**
     * In case the holding found by the `where` argument doesn't exist, create a new holding with this data.
     */
    create: Prisma.XOR<Prisma.holdingCreateInput, Prisma.holdingUncheckedCreateInput>;
    /**
     * In case the holding was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.holdingUpdateInput, Prisma.holdingUncheckedUpdateInput>;
};
/**
 * holding delete
 */
export type holdingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which holding to delete.
     */
    where: Prisma.holdingWhereUniqueInput;
};
/**
 * holding deleteMany
 */
export type holdingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which holdings to delete
     */
    where?: Prisma.holdingWhereInput;
    /**
     * Limit how many holdings to delete.
     */
    limit?: number;
};
/**
 * holding without action
 */
export type holdingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=holding.d.ts.map