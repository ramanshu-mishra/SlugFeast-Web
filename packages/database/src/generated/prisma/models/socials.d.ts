import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model socials
 *
 */
export type socialsModel = runtime.Types.Result.DefaultSelection<Prisma.$socialsPayload>;
export type AggregateSocials = {
    _count: SocialsCountAggregateOutputType | null;
    _min: SocialsMinAggregateOutputType | null;
    _max: SocialsMaxAggregateOutputType | null;
};
export type SocialsMinAggregateOutputType = {
    id: string | null;
    instagram: string | null;
    x: string | null;
    telegram: string | null;
    youtube: string | null;
    website: string | null;
    coinId: string | null;
};
export type SocialsMaxAggregateOutputType = {
    id: string | null;
    instagram: string | null;
    x: string | null;
    telegram: string | null;
    youtube: string | null;
    website: string | null;
    coinId: string | null;
};
export type SocialsCountAggregateOutputType = {
    id: number;
    instagram: number;
    x: number;
    telegram: number;
    youtube: number;
    website: number;
    coinId: number;
    _all: number;
};
export type SocialsMinAggregateInputType = {
    id?: true;
    instagram?: true;
    x?: true;
    telegram?: true;
    youtube?: true;
    website?: true;
    coinId?: true;
};
export type SocialsMaxAggregateInputType = {
    id?: true;
    instagram?: true;
    x?: true;
    telegram?: true;
    youtube?: true;
    website?: true;
    coinId?: true;
};
export type SocialsCountAggregateInputType = {
    id?: true;
    instagram?: true;
    x?: true;
    telegram?: true;
    youtube?: true;
    website?: true;
    coinId?: true;
    _all?: true;
};
export type SocialsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which socials to aggregate.
     */
    where?: Prisma.socialsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of socials to fetch.
     */
    orderBy?: Prisma.socialsOrderByWithRelationInput | Prisma.socialsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.socialsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` socials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` socials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned socials
    **/
    _count?: true | SocialsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SocialsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SocialsMaxAggregateInputType;
};
export type GetSocialsAggregateType<T extends SocialsAggregateArgs> = {
    [P in keyof T & keyof AggregateSocials]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSocials[P]> : Prisma.GetScalarType<T[P], AggregateSocials[P]>;
};
export type socialsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.socialsWhereInput;
    orderBy?: Prisma.socialsOrderByWithAggregationInput | Prisma.socialsOrderByWithAggregationInput[];
    by: Prisma.SocialsScalarFieldEnum[] | Prisma.SocialsScalarFieldEnum;
    having?: Prisma.socialsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SocialsCountAggregateInputType | true;
    _min?: SocialsMinAggregateInputType;
    _max?: SocialsMaxAggregateInputType;
};
export type SocialsGroupByOutputType = {
    id: string;
    instagram: string | null;
    x: string | null;
    telegram: string | null;
    youtube: string | null;
    website: string | null;
    coinId: string;
    _count: SocialsCountAggregateOutputType | null;
    _min: SocialsMinAggregateOutputType | null;
    _max: SocialsMaxAggregateOutputType | null;
};
type GetSocialsGroupByPayload<T extends socialsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SocialsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SocialsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SocialsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SocialsGroupByOutputType[P]>;
}>>;
export type socialsWhereInput = {
    AND?: Prisma.socialsWhereInput | Prisma.socialsWhereInput[];
    OR?: Prisma.socialsWhereInput[];
    NOT?: Prisma.socialsWhereInput | Prisma.socialsWhereInput[];
    id?: Prisma.StringFilter<"socials"> | string;
    instagram?: Prisma.StringNullableFilter<"socials"> | string | null;
    x?: Prisma.StringNullableFilter<"socials"> | string | null;
    telegram?: Prisma.StringNullableFilter<"socials"> | string | null;
    youtube?: Prisma.StringNullableFilter<"socials"> | string | null;
    website?: Prisma.StringNullableFilter<"socials"> | string | null;
    coinId?: Prisma.StringFilter<"socials"> | string;
    coin?: Prisma.XOR<Prisma.CoinScalarRelationFilter, Prisma.coinWhereInput>;
};
export type socialsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    instagram?: Prisma.SortOrderInput | Prisma.SortOrder;
    x?: Prisma.SortOrderInput | Prisma.SortOrder;
    telegram?: Prisma.SortOrderInput | Prisma.SortOrder;
    youtube?: Prisma.SortOrderInput | Prisma.SortOrder;
    website?: Prisma.SortOrderInput | Prisma.SortOrder;
    coinId?: Prisma.SortOrder;
    coin?: Prisma.coinOrderByWithRelationInput;
};
export type socialsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    coinId?: string;
    AND?: Prisma.socialsWhereInput | Prisma.socialsWhereInput[];
    OR?: Prisma.socialsWhereInput[];
    NOT?: Prisma.socialsWhereInput | Prisma.socialsWhereInput[];
    instagram?: Prisma.StringNullableFilter<"socials"> | string | null;
    x?: Prisma.StringNullableFilter<"socials"> | string | null;
    telegram?: Prisma.StringNullableFilter<"socials"> | string | null;
    youtube?: Prisma.StringNullableFilter<"socials"> | string | null;
    website?: Prisma.StringNullableFilter<"socials"> | string | null;
    coin?: Prisma.XOR<Prisma.CoinScalarRelationFilter, Prisma.coinWhereInput>;
}, "id" | "id" | "coinId">;
export type socialsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    instagram?: Prisma.SortOrderInput | Prisma.SortOrder;
    x?: Prisma.SortOrderInput | Prisma.SortOrder;
    telegram?: Prisma.SortOrderInput | Prisma.SortOrder;
    youtube?: Prisma.SortOrderInput | Prisma.SortOrder;
    website?: Prisma.SortOrderInput | Prisma.SortOrder;
    coinId?: Prisma.SortOrder;
    _count?: Prisma.socialsCountOrderByAggregateInput;
    _max?: Prisma.socialsMaxOrderByAggregateInput;
    _min?: Prisma.socialsMinOrderByAggregateInput;
};
export type socialsScalarWhereWithAggregatesInput = {
    AND?: Prisma.socialsScalarWhereWithAggregatesInput | Prisma.socialsScalarWhereWithAggregatesInput[];
    OR?: Prisma.socialsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.socialsScalarWhereWithAggregatesInput | Prisma.socialsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"socials"> | string;
    instagram?: Prisma.StringNullableWithAggregatesFilter<"socials"> | string | null;
    x?: Prisma.StringNullableWithAggregatesFilter<"socials"> | string | null;
    telegram?: Prisma.StringNullableWithAggregatesFilter<"socials"> | string | null;
    youtube?: Prisma.StringNullableWithAggregatesFilter<"socials"> | string | null;
    website?: Prisma.StringNullableWithAggregatesFilter<"socials"> | string | null;
    coinId?: Prisma.StringWithAggregatesFilter<"socials"> | string;
};
export type socialsCreateInput = {
    id?: string;
    instagram?: string | null;
    x?: string | null;
    telegram?: string | null;
    youtube?: string | null;
    website?: string | null;
    coin: Prisma.coinCreateNestedOneWithoutSocialsInput;
};
export type socialsUncheckedCreateInput = {
    id?: string;
    instagram?: string | null;
    x?: string | null;
    telegram?: string | null;
    youtube?: string | null;
    website?: string | null;
    coinId: string;
};
export type socialsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    instagram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telegram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    youtube?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coin?: Prisma.coinUpdateOneRequiredWithoutSocialsNestedInput;
};
export type socialsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    instagram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telegram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    youtube?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coinId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type socialsCreateManyInput = {
    id?: string;
    instagram?: string | null;
    x?: string | null;
    telegram?: string | null;
    youtube?: string | null;
    website?: string | null;
    coinId: string;
};
export type socialsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    instagram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telegram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    youtube?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type socialsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    instagram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telegram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    youtube?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coinId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type socialsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    instagram?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    telegram?: Prisma.SortOrder;
    youtube?: Prisma.SortOrder;
    website?: Prisma.SortOrder;
    coinId?: Prisma.SortOrder;
};
export type socialsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    instagram?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    telegram?: Prisma.SortOrder;
    youtube?: Prisma.SortOrder;
    website?: Prisma.SortOrder;
    coinId?: Prisma.SortOrder;
};
export type socialsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    instagram?: Prisma.SortOrder;
    x?: Prisma.SortOrder;
    telegram?: Prisma.SortOrder;
    youtube?: Prisma.SortOrder;
    website?: Prisma.SortOrder;
    coinId?: Prisma.SortOrder;
};
export type SocialsNullableScalarRelationFilter = {
    is?: Prisma.socialsWhereInput | null;
    isNot?: Prisma.socialsWhereInput | null;
};
export type socialsCreateNestedOneWithoutCoinInput = {
    create?: Prisma.XOR<Prisma.socialsCreateWithoutCoinInput, Prisma.socialsUncheckedCreateWithoutCoinInput>;
    connectOrCreate?: Prisma.socialsCreateOrConnectWithoutCoinInput;
    connect?: Prisma.socialsWhereUniqueInput;
};
export type socialsUncheckedCreateNestedOneWithoutCoinInput = {
    create?: Prisma.XOR<Prisma.socialsCreateWithoutCoinInput, Prisma.socialsUncheckedCreateWithoutCoinInput>;
    connectOrCreate?: Prisma.socialsCreateOrConnectWithoutCoinInput;
    connect?: Prisma.socialsWhereUniqueInput;
};
export type socialsUpdateOneWithoutCoinNestedInput = {
    create?: Prisma.XOR<Prisma.socialsCreateWithoutCoinInput, Prisma.socialsUncheckedCreateWithoutCoinInput>;
    connectOrCreate?: Prisma.socialsCreateOrConnectWithoutCoinInput;
    upsert?: Prisma.socialsUpsertWithoutCoinInput;
    disconnect?: Prisma.socialsWhereInput | boolean;
    delete?: Prisma.socialsWhereInput | boolean;
    connect?: Prisma.socialsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.socialsUpdateToOneWithWhereWithoutCoinInput, Prisma.socialsUpdateWithoutCoinInput>, Prisma.socialsUncheckedUpdateWithoutCoinInput>;
};
export type socialsUncheckedUpdateOneWithoutCoinNestedInput = {
    create?: Prisma.XOR<Prisma.socialsCreateWithoutCoinInput, Prisma.socialsUncheckedCreateWithoutCoinInput>;
    connectOrCreate?: Prisma.socialsCreateOrConnectWithoutCoinInput;
    upsert?: Prisma.socialsUpsertWithoutCoinInput;
    disconnect?: Prisma.socialsWhereInput | boolean;
    delete?: Prisma.socialsWhereInput | boolean;
    connect?: Prisma.socialsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.socialsUpdateToOneWithWhereWithoutCoinInput, Prisma.socialsUpdateWithoutCoinInput>, Prisma.socialsUncheckedUpdateWithoutCoinInput>;
};
export type socialsCreateWithoutCoinInput = {
    id?: string;
    instagram?: string | null;
    x?: string | null;
    telegram?: string | null;
    youtube?: string | null;
    website?: string | null;
};
export type socialsUncheckedCreateWithoutCoinInput = {
    id?: string;
    instagram?: string | null;
    x?: string | null;
    telegram?: string | null;
    youtube?: string | null;
    website?: string | null;
};
export type socialsCreateOrConnectWithoutCoinInput = {
    where: Prisma.socialsWhereUniqueInput;
    create: Prisma.XOR<Prisma.socialsCreateWithoutCoinInput, Prisma.socialsUncheckedCreateWithoutCoinInput>;
};
export type socialsUpsertWithoutCoinInput = {
    update: Prisma.XOR<Prisma.socialsUpdateWithoutCoinInput, Prisma.socialsUncheckedUpdateWithoutCoinInput>;
    create: Prisma.XOR<Prisma.socialsCreateWithoutCoinInput, Prisma.socialsUncheckedCreateWithoutCoinInput>;
    where?: Prisma.socialsWhereInput;
};
export type socialsUpdateToOneWithWhereWithoutCoinInput = {
    where?: Prisma.socialsWhereInput;
    data: Prisma.XOR<Prisma.socialsUpdateWithoutCoinInput, Prisma.socialsUncheckedUpdateWithoutCoinInput>;
};
export type socialsUpdateWithoutCoinInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    instagram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telegram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    youtube?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type socialsUncheckedUpdateWithoutCoinInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    instagram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    x?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    telegram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    youtube?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type socialsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    instagram?: boolean;
    x?: boolean;
    telegram?: boolean;
    youtube?: boolean;
    website?: boolean;
    coinId?: boolean;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["socials"]>;
export type socialsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    instagram?: boolean;
    x?: boolean;
    telegram?: boolean;
    youtube?: boolean;
    website?: boolean;
    coinId?: boolean;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["socials"]>;
export type socialsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    instagram?: boolean;
    x?: boolean;
    telegram?: boolean;
    youtube?: boolean;
    website?: boolean;
    coinId?: boolean;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["socials"]>;
export type socialsSelectScalar = {
    id?: boolean;
    instagram?: boolean;
    x?: boolean;
    telegram?: boolean;
    youtube?: boolean;
    website?: boolean;
    coinId?: boolean;
};
export type socialsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "instagram" | "x" | "telegram" | "youtube" | "website" | "coinId", ExtArgs["result"]["socials"]>;
export type socialsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
};
export type socialsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
};
export type socialsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
};
export type $socialsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "socials";
    objects: {
        coin: Prisma.$coinPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        instagram: string | null;
        x: string | null;
        telegram: string | null;
        youtube: string | null;
        website: string | null;
        coinId: string;
    }, ExtArgs["result"]["socials"]>;
    composites: {};
};
export type socialsGetPayload<S extends boolean | null | undefined | socialsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$socialsPayload, S>;
export type socialsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<socialsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SocialsCountAggregateInputType | true;
};
export interface socialsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['socials'];
        meta: {
            name: 'socials';
        };
    };
    /**
     * Find zero or one Socials that matches the filter.
     * @param {socialsFindUniqueArgs} args - Arguments to find a Socials
     * @example
     * // Get one Socials
     * const socials = await prisma.socials.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends socialsFindUniqueArgs>(args: Prisma.SelectSubset<T, socialsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__socialsClient<runtime.Types.Result.GetResult<Prisma.$socialsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Socials that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {socialsFindUniqueOrThrowArgs} args - Arguments to find a Socials
     * @example
     * // Get one Socials
     * const socials = await prisma.socials.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends socialsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, socialsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__socialsClient<runtime.Types.Result.GetResult<Prisma.$socialsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Socials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialsFindFirstArgs} args - Arguments to find a Socials
     * @example
     * // Get one Socials
     * const socials = await prisma.socials.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends socialsFindFirstArgs>(args?: Prisma.SelectSubset<T, socialsFindFirstArgs<ExtArgs>>): Prisma.Prisma__socialsClient<runtime.Types.Result.GetResult<Prisma.$socialsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Socials that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialsFindFirstOrThrowArgs} args - Arguments to find a Socials
     * @example
     * // Get one Socials
     * const socials = await prisma.socials.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends socialsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, socialsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__socialsClient<runtime.Types.Result.GetResult<Prisma.$socialsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Socials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Socials
     * const socials = await prisma.socials.findMany()
     *
     * // Get first 10 Socials
     * const socials = await prisma.socials.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const socialsWithIdOnly = await prisma.socials.findMany({ select: { id: true } })
     *
     */
    findMany<T extends socialsFindManyArgs>(args?: Prisma.SelectSubset<T, socialsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$socialsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Socials.
     * @param {socialsCreateArgs} args - Arguments to create a Socials.
     * @example
     * // Create one Socials
     * const Socials = await prisma.socials.create({
     *   data: {
     *     // ... data to create a Socials
     *   }
     * })
     *
     */
    create<T extends socialsCreateArgs>(args: Prisma.SelectSubset<T, socialsCreateArgs<ExtArgs>>): Prisma.Prisma__socialsClient<runtime.Types.Result.GetResult<Prisma.$socialsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Socials.
     * @param {socialsCreateManyArgs} args - Arguments to create many Socials.
     * @example
     * // Create many Socials
     * const socials = await prisma.socials.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends socialsCreateManyArgs>(args?: Prisma.SelectSubset<T, socialsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Socials and returns the data saved in the database.
     * @param {socialsCreateManyAndReturnArgs} args - Arguments to create many Socials.
     * @example
     * // Create many Socials
     * const socials = await prisma.socials.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Socials and only return the `id`
     * const socialsWithIdOnly = await prisma.socials.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends socialsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, socialsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$socialsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Socials.
     * @param {socialsDeleteArgs} args - Arguments to delete one Socials.
     * @example
     * // Delete one Socials
     * const Socials = await prisma.socials.delete({
     *   where: {
     *     // ... filter to delete one Socials
     *   }
     * })
     *
     */
    delete<T extends socialsDeleteArgs>(args: Prisma.SelectSubset<T, socialsDeleteArgs<ExtArgs>>): Prisma.Prisma__socialsClient<runtime.Types.Result.GetResult<Prisma.$socialsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Socials.
     * @param {socialsUpdateArgs} args - Arguments to update one Socials.
     * @example
     * // Update one Socials
     * const socials = await prisma.socials.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends socialsUpdateArgs>(args: Prisma.SelectSubset<T, socialsUpdateArgs<ExtArgs>>): Prisma.Prisma__socialsClient<runtime.Types.Result.GetResult<Prisma.$socialsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Socials.
     * @param {socialsDeleteManyArgs} args - Arguments to filter Socials to delete.
     * @example
     * // Delete a few Socials
     * const { count } = await prisma.socials.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends socialsDeleteManyArgs>(args?: Prisma.SelectSubset<T, socialsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Socials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Socials
     * const socials = await prisma.socials.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends socialsUpdateManyArgs>(args: Prisma.SelectSubset<T, socialsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Socials and returns the data updated in the database.
     * @param {socialsUpdateManyAndReturnArgs} args - Arguments to update many Socials.
     * @example
     * // Update many Socials
     * const socials = await prisma.socials.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Socials and only return the `id`
     * const socialsWithIdOnly = await prisma.socials.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends socialsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, socialsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$socialsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Socials.
     * @param {socialsUpsertArgs} args - Arguments to update or create a Socials.
     * @example
     * // Update or create a Socials
     * const socials = await prisma.socials.upsert({
     *   create: {
     *     // ... data to create a Socials
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Socials we want to update
     *   }
     * })
     */
    upsert<T extends socialsUpsertArgs>(args: Prisma.SelectSubset<T, socialsUpsertArgs<ExtArgs>>): Prisma.Prisma__socialsClient<runtime.Types.Result.GetResult<Prisma.$socialsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Socials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialsCountArgs} args - Arguments to filter Socials to count.
     * @example
     * // Count the number of Socials
     * const count = await prisma.socials.count({
     *   where: {
     *     // ... the filter for the Socials we want to count
     *   }
     * })
    **/
    count<T extends socialsCountArgs>(args?: Prisma.Subset<T, socialsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SocialsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Socials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SocialsAggregateArgs>(args: Prisma.Subset<T, SocialsAggregateArgs>): Prisma.PrismaPromise<GetSocialsAggregateType<T>>;
    /**
     * Group by Socials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {socialsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends socialsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: socialsGroupByArgs['orderBy'];
    } : {
        orderBy?: socialsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, socialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocialsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the socials model
     */
    readonly fields: socialsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for socials.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__socialsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the socials model
 */
export interface socialsFieldRefs {
    readonly id: Prisma.FieldRef<"socials", 'String'>;
    readonly instagram: Prisma.FieldRef<"socials", 'String'>;
    readonly x: Prisma.FieldRef<"socials", 'String'>;
    readonly telegram: Prisma.FieldRef<"socials", 'String'>;
    readonly youtube: Prisma.FieldRef<"socials", 'String'>;
    readonly website: Prisma.FieldRef<"socials", 'String'>;
    readonly coinId: Prisma.FieldRef<"socials", 'String'>;
}
/**
 * socials findUnique
 */
export type socialsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsInclude<ExtArgs> | null;
    /**
     * Filter, which socials to fetch.
     */
    where: Prisma.socialsWhereUniqueInput;
};
/**
 * socials findUniqueOrThrow
 */
export type socialsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsInclude<ExtArgs> | null;
    /**
     * Filter, which socials to fetch.
     */
    where: Prisma.socialsWhereUniqueInput;
};
/**
 * socials findFirst
 */
export type socialsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsInclude<ExtArgs> | null;
    /**
     * Filter, which socials to fetch.
     */
    where?: Prisma.socialsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of socials to fetch.
     */
    orderBy?: Prisma.socialsOrderByWithRelationInput | Prisma.socialsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for socials.
     */
    cursor?: Prisma.socialsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` socials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` socials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of socials.
     */
    distinct?: Prisma.SocialsScalarFieldEnum | Prisma.SocialsScalarFieldEnum[];
};
/**
 * socials findFirstOrThrow
 */
export type socialsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsInclude<ExtArgs> | null;
    /**
     * Filter, which socials to fetch.
     */
    where?: Prisma.socialsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of socials to fetch.
     */
    orderBy?: Prisma.socialsOrderByWithRelationInput | Prisma.socialsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for socials.
     */
    cursor?: Prisma.socialsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` socials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` socials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of socials.
     */
    distinct?: Prisma.SocialsScalarFieldEnum | Prisma.SocialsScalarFieldEnum[];
};
/**
 * socials findMany
 */
export type socialsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsInclude<ExtArgs> | null;
    /**
     * Filter, which socials to fetch.
     */
    where?: Prisma.socialsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of socials to fetch.
     */
    orderBy?: Prisma.socialsOrderByWithRelationInput | Prisma.socialsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing socials.
     */
    cursor?: Prisma.socialsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` socials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` socials.
     */
    skip?: number;
    distinct?: Prisma.SocialsScalarFieldEnum | Prisma.SocialsScalarFieldEnum[];
};
/**
 * socials create
 */
export type socialsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsInclude<ExtArgs> | null;
    /**
     * The data needed to create a socials.
     */
    data: Prisma.XOR<Prisma.socialsCreateInput, Prisma.socialsUncheckedCreateInput>;
};
/**
 * socials createMany
 */
export type socialsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many socials.
     */
    data: Prisma.socialsCreateManyInput | Prisma.socialsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * socials createManyAndReturn
 */
export type socialsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * The data used to create many socials.
     */
    data: Prisma.socialsCreateManyInput | Prisma.socialsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * socials update
 */
export type socialsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsInclude<ExtArgs> | null;
    /**
     * The data needed to update a socials.
     */
    data: Prisma.XOR<Prisma.socialsUpdateInput, Prisma.socialsUncheckedUpdateInput>;
    /**
     * Choose, which socials to update.
     */
    where: Prisma.socialsWhereUniqueInput;
};
/**
 * socials updateMany
 */
export type socialsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update socials.
     */
    data: Prisma.XOR<Prisma.socialsUpdateManyMutationInput, Prisma.socialsUncheckedUpdateManyInput>;
    /**
     * Filter which socials to update
     */
    where?: Prisma.socialsWhereInput;
    /**
     * Limit how many socials to update.
     */
    limit?: number;
};
/**
 * socials updateManyAndReturn
 */
export type socialsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * The data used to update socials.
     */
    data: Prisma.XOR<Prisma.socialsUpdateManyMutationInput, Prisma.socialsUncheckedUpdateManyInput>;
    /**
     * Filter which socials to update
     */
    where?: Prisma.socialsWhereInput;
    /**
     * Limit how many socials to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * socials upsert
 */
export type socialsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsInclude<ExtArgs> | null;
    /**
     * The filter to search for the socials to update in case it exists.
     */
    where: Prisma.socialsWhereUniqueInput;
    /**
     * In case the socials found by the `where` argument doesn't exist, create a new socials with this data.
     */
    create: Prisma.XOR<Prisma.socialsCreateInput, Prisma.socialsUncheckedCreateInput>;
    /**
     * In case the socials was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.socialsUpdateInput, Prisma.socialsUncheckedUpdateInput>;
};
/**
 * socials delete
 */
export type socialsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsInclude<ExtArgs> | null;
    /**
     * Filter which socials to delete.
     */
    where: Prisma.socialsWhereUniqueInput;
};
/**
 * socials deleteMany
 */
export type socialsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which socials to delete
     */
    where?: Prisma.socialsWhereInput;
    /**
     * Limit how many socials to delete.
     */
    limit?: number;
};
/**
 * socials without action
 */
export type socialsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the socials
     */
    select?: Prisma.socialsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the socials
     */
    omit?: Prisma.socialsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.socialsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=socials.d.ts.map