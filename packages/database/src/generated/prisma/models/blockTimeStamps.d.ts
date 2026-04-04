import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model blockTimeStamps
 *
 */
export type blockTimeStampsModel = runtime.Types.Result.DefaultSelection<Prisma.$blockTimeStampsPayload>;
export type AggregateBlockTimeStamps = {
    _count: BlockTimeStampsCountAggregateOutputType | null;
    _min: BlockTimeStampsMinAggregateOutputType | null;
    _max: BlockTimeStampsMaxAggregateOutputType | null;
};
export type BlockTimeStampsMinAggregateOutputType = {
    id: string | null;
    tokenDeployedsTimestamp: string | null;
    tokenDeployedsLastId: string | null;
    tokenGraduatedsTimestamp: string | null;
    tokenGraduatedsLastId: string | null;
    tokenBoughtsTimestamp: string | null;
    tokenBoughtsLastId: string | null;
    tokenSoldsTimestamp: string | null;
    tokenSoldsLastId: string | null;
    poolcreatedsTimestamp: string | null;
    poolcreatedsLastId: string | null;
    tokencreatedsTimestamp: string | null;
    tokencreatedLastId: string | null;
    updatedAt: Date | null;
    createdAt: Date | null;
};
export type BlockTimeStampsMaxAggregateOutputType = {
    id: string | null;
    tokenDeployedsTimestamp: string | null;
    tokenDeployedsLastId: string | null;
    tokenGraduatedsTimestamp: string | null;
    tokenGraduatedsLastId: string | null;
    tokenBoughtsTimestamp: string | null;
    tokenBoughtsLastId: string | null;
    tokenSoldsTimestamp: string | null;
    tokenSoldsLastId: string | null;
    poolcreatedsTimestamp: string | null;
    poolcreatedsLastId: string | null;
    tokencreatedsTimestamp: string | null;
    tokencreatedLastId: string | null;
    updatedAt: Date | null;
    createdAt: Date | null;
};
export type BlockTimeStampsCountAggregateOutputType = {
    id: number;
    tokenDeployedsTimestamp: number;
    tokenDeployedsLastId: number;
    tokenGraduatedsTimestamp: number;
    tokenGraduatedsLastId: number;
    tokenBoughtsTimestamp: number;
    tokenBoughtsLastId: number;
    tokenSoldsTimestamp: number;
    tokenSoldsLastId: number;
    poolcreatedsTimestamp: number;
    poolcreatedsLastId: number;
    tokencreatedsTimestamp: number;
    tokencreatedLastId: number;
    updatedAt: number;
    createdAt: number;
    _all: number;
};
export type BlockTimeStampsMinAggregateInputType = {
    id?: true;
    tokenDeployedsTimestamp?: true;
    tokenDeployedsLastId?: true;
    tokenGraduatedsTimestamp?: true;
    tokenGraduatedsLastId?: true;
    tokenBoughtsTimestamp?: true;
    tokenBoughtsLastId?: true;
    tokenSoldsTimestamp?: true;
    tokenSoldsLastId?: true;
    poolcreatedsTimestamp?: true;
    poolcreatedsLastId?: true;
    tokencreatedsTimestamp?: true;
    tokencreatedLastId?: true;
    updatedAt?: true;
    createdAt?: true;
};
export type BlockTimeStampsMaxAggregateInputType = {
    id?: true;
    tokenDeployedsTimestamp?: true;
    tokenDeployedsLastId?: true;
    tokenGraduatedsTimestamp?: true;
    tokenGraduatedsLastId?: true;
    tokenBoughtsTimestamp?: true;
    tokenBoughtsLastId?: true;
    tokenSoldsTimestamp?: true;
    tokenSoldsLastId?: true;
    poolcreatedsTimestamp?: true;
    poolcreatedsLastId?: true;
    tokencreatedsTimestamp?: true;
    tokencreatedLastId?: true;
    updatedAt?: true;
    createdAt?: true;
};
export type BlockTimeStampsCountAggregateInputType = {
    id?: true;
    tokenDeployedsTimestamp?: true;
    tokenDeployedsLastId?: true;
    tokenGraduatedsTimestamp?: true;
    tokenGraduatedsLastId?: true;
    tokenBoughtsTimestamp?: true;
    tokenBoughtsLastId?: true;
    tokenSoldsTimestamp?: true;
    tokenSoldsLastId?: true;
    poolcreatedsTimestamp?: true;
    poolcreatedsLastId?: true;
    tokencreatedsTimestamp?: true;
    tokencreatedLastId?: true;
    updatedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type BlockTimeStampsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which blockTimeStamps to aggregate.
     */
    where?: Prisma.blockTimeStampsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of blockTimeStamps to fetch.
     */
    orderBy?: Prisma.blockTimeStampsOrderByWithRelationInput | Prisma.blockTimeStampsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.blockTimeStampsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` blockTimeStamps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` blockTimeStamps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned blockTimeStamps
    **/
    _count?: true | BlockTimeStampsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: BlockTimeStampsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: BlockTimeStampsMaxAggregateInputType;
};
export type GetBlockTimeStampsAggregateType<T extends BlockTimeStampsAggregateArgs> = {
    [P in keyof T & keyof AggregateBlockTimeStamps]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBlockTimeStamps[P]> : Prisma.GetScalarType<T[P], AggregateBlockTimeStamps[P]>;
};
export type blockTimeStampsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.blockTimeStampsWhereInput;
    orderBy?: Prisma.blockTimeStampsOrderByWithAggregationInput | Prisma.blockTimeStampsOrderByWithAggregationInput[];
    by: Prisma.BlockTimeStampsScalarFieldEnum[] | Prisma.BlockTimeStampsScalarFieldEnum;
    having?: Prisma.blockTimeStampsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BlockTimeStampsCountAggregateInputType | true;
    _min?: BlockTimeStampsMinAggregateInputType;
    _max?: BlockTimeStampsMaxAggregateInputType;
};
export type BlockTimeStampsGroupByOutputType = {
    id: string;
    tokenDeployedsTimestamp: string;
    tokenDeployedsLastId: string;
    tokenGraduatedsTimestamp: string;
    tokenGraduatedsLastId: string;
    tokenBoughtsTimestamp: string;
    tokenBoughtsLastId: string;
    tokenSoldsTimestamp: string;
    tokenSoldsLastId: string;
    poolcreatedsTimestamp: string;
    poolcreatedsLastId: string;
    tokencreatedsTimestamp: string;
    tokencreatedLastId: string;
    updatedAt: Date;
    createdAt: Date;
    _count: BlockTimeStampsCountAggregateOutputType | null;
    _min: BlockTimeStampsMinAggregateOutputType | null;
    _max: BlockTimeStampsMaxAggregateOutputType | null;
};
type GetBlockTimeStampsGroupByPayload<T extends blockTimeStampsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BlockTimeStampsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BlockTimeStampsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BlockTimeStampsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BlockTimeStampsGroupByOutputType[P]>;
}>>;
export type blockTimeStampsWhereInput = {
    AND?: Prisma.blockTimeStampsWhereInput | Prisma.blockTimeStampsWhereInput[];
    OR?: Prisma.blockTimeStampsWhereInput[];
    NOT?: Prisma.blockTimeStampsWhereInput | Prisma.blockTimeStampsWhereInput[];
    id?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenDeployedsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenDeployedsLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenGraduatedsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenGraduatedsLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenBoughtsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenBoughtsLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenSoldsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenSoldsLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    poolcreatedsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    poolcreatedsLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokencreatedsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokencreatedLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    updatedAt?: Prisma.DateTimeFilter<"blockTimeStamps"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"blockTimeStamps"> | Date | string;
};
export type blockTimeStampsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tokenDeployedsTimestamp?: Prisma.SortOrder;
    tokenDeployedsLastId?: Prisma.SortOrder;
    tokenGraduatedsTimestamp?: Prisma.SortOrder;
    tokenGraduatedsLastId?: Prisma.SortOrder;
    tokenBoughtsTimestamp?: Prisma.SortOrder;
    tokenBoughtsLastId?: Prisma.SortOrder;
    tokenSoldsTimestamp?: Prisma.SortOrder;
    tokenSoldsLastId?: Prisma.SortOrder;
    poolcreatedsTimestamp?: Prisma.SortOrder;
    poolcreatedsLastId?: Prisma.SortOrder;
    tokencreatedsTimestamp?: Prisma.SortOrder;
    tokencreatedLastId?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type blockTimeStampsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.blockTimeStampsWhereInput | Prisma.blockTimeStampsWhereInput[];
    OR?: Prisma.blockTimeStampsWhereInput[];
    NOT?: Prisma.blockTimeStampsWhereInput | Prisma.blockTimeStampsWhereInput[];
    tokenDeployedsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenDeployedsLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenGraduatedsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenGraduatedsLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenBoughtsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenBoughtsLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenSoldsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokenSoldsLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    poolcreatedsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    poolcreatedsLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokencreatedsTimestamp?: Prisma.StringFilter<"blockTimeStamps"> | string;
    tokencreatedLastId?: Prisma.StringFilter<"blockTimeStamps"> | string;
    updatedAt?: Prisma.DateTimeFilter<"blockTimeStamps"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"blockTimeStamps"> | Date | string;
}, "id">;
export type blockTimeStampsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tokenDeployedsTimestamp?: Prisma.SortOrder;
    tokenDeployedsLastId?: Prisma.SortOrder;
    tokenGraduatedsTimestamp?: Prisma.SortOrder;
    tokenGraduatedsLastId?: Prisma.SortOrder;
    tokenBoughtsTimestamp?: Prisma.SortOrder;
    tokenBoughtsLastId?: Prisma.SortOrder;
    tokenSoldsTimestamp?: Prisma.SortOrder;
    tokenSoldsLastId?: Prisma.SortOrder;
    poolcreatedsTimestamp?: Prisma.SortOrder;
    poolcreatedsLastId?: Prisma.SortOrder;
    tokencreatedsTimestamp?: Prisma.SortOrder;
    tokencreatedLastId?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.blockTimeStampsCountOrderByAggregateInput;
    _max?: Prisma.blockTimeStampsMaxOrderByAggregateInput;
    _min?: Prisma.blockTimeStampsMinOrderByAggregateInput;
};
export type blockTimeStampsScalarWhereWithAggregatesInput = {
    AND?: Prisma.blockTimeStampsScalarWhereWithAggregatesInput | Prisma.blockTimeStampsScalarWhereWithAggregatesInput[];
    OR?: Prisma.blockTimeStampsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.blockTimeStampsScalarWhereWithAggregatesInput | Prisma.blockTimeStampsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    tokenDeployedsTimestamp?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    tokenDeployedsLastId?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    tokenGraduatedsTimestamp?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    tokenGraduatedsLastId?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    tokenBoughtsTimestamp?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    tokenBoughtsLastId?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    tokenSoldsTimestamp?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    tokenSoldsLastId?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    poolcreatedsTimestamp?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    poolcreatedsLastId?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    tokencreatedsTimestamp?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    tokencreatedLastId?: Prisma.StringWithAggregatesFilter<"blockTimeStamps"> | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"blockTimeStamps"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"blockTimeStamps"> | Date | string;
};
export type blockTimeStampsCreateInput = {
    id?: string;
    tokenDeployedsTimestamp?: string;
    tokenDeployedsLastId?: string;
    tokenGraduatedsTimestamp?: string;
    tokenGraduatedsLastId?: string;
    tokenBoughtsTimestamp?: string;
    tokenBoughtsLastId?: string;
    tokenSoldsTimestamp?: string;
    tokenSoldsLastId?: string;
    poolcreatedsTimestamp?: string;
    poolcreatedsLastId?: string;
    tokencreatedsTimestamp?: string;
    tokencreatedLastId?: string;
    updatedAt?: Date | string;
    createdAt?: Date | string;
};
export type blockTimeStampsUncheckedCreateInput = {
    id?: string;
    tokenDeployedsTimestamp?: string;
    tokenDeployedsLastId?: string;
    tokenGraduatedsTimestamp?: string;
    tokenGraduatedsLastId?: string;
    tokenBoughtsTimestamp?: string;
    tokenBoughtsLastId?: string;
    tokenSoldsTimestamp?: string;
    tokenSoldsLastId?: string;
    poolcreatedsTimestamp?: string;
    poolcreatedsLastId?: string;
    tokencreatedsTimestamp?: string;
    tokencreatedLastId?: string;
    updatedAt?: Date | string;
    createdAt?: Date | string;
};
export type blockTimeStampsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenDeployedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenDeployedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenGraduatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenGraduatedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenBoughtsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenBoughtsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenSoldsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenSoldsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    poolcreatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    poolcreatedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokencreatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokencreatedLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type blockTimeStampsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenDeployedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenDeployedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenGraduatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenGraduatedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenBoughtsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenBoughtsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenSoldsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenSoldsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    poolcreatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    poolcreatedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokencreatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokencreatedLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type blockTimeStampsCreateManyInput = {
    id?: string;
    tokenDeployedsTimestamp?: string;
    tokenDeployedsLastId?: string;
    tokenGraduatedsTimestamp?: string;
    tokenGraduatedsLastId?: string;
    tokenBoughtsTimestamp?: string;
    tokenBoughtsLastId?: string;
    tokenSoldsTimestamp?: string;
    tokenSoldsLastId?: string;
    poolcreatedsTimestamp?: string;
    poolcreatedsLastId?: string;
    tokencreatedsTimestamp?: string;
    tokencreatedLastId?: string;
    updatedAt?: Date | string;
    createdAt?: Date | string;
};
export type blockTimeStampsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenDeployedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenDeployedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenGraduatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenGraduatedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenBoughtsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenBoughtsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenSoldsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenSoldsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    poolcreatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    poolcreatedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokencreatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokencreatedLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type blockTimeStampsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenDeployedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenDeployedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenGraduatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenGraduatedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenBoughtsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenBoughtsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenSoldsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenSoldsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    poolcreatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    poolcreatedsLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokencreatedsTimestamp?: Prisma.StringFieldUpdateOperationsInput | string;
    tokencreatedLastId?: Prisma.StringFieldUpdateOperationsInput | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type blockTimeStampsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenDeployedsTimestamp?: Prisma.SortOrder;
    tokenDeployedsLastId?: Prisma.SortOrder;
    tokenGraduatedsTimestamp?: Prisma.SortOrder;
    tokenGraduatedsLastId?: Prisma.SortOrder;
    tokenBoughtsTimestamp?: Prisma.SortOrder;
    tokenBoughtsLastId?: Prisma.SortOrder;
    tokenSoldsTimestamp?: Prisma.SortOrder;
    tokenSoldsLastId?: Prisma.SortOrder;
    poolcreatedsTimestamp?: Prisma.SortOrder;
    poolcreatedsLastId?: Prisma.SortOrder;
    tokencreatedsTimestamp?: Prisma.SortOrder;
    tokencreatedLastId?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type blockTimeStampsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenDeployedsTimestamp?: Prisma.SortOrder;
    tokenDeployedsLastId?: Prisma.SortOrder;
    tokenGraduatedsTimestamp?: Prisma.SortOrder;
    tokenGraduatedsLastId?: Prisma.SortOrder;
    tokenBoughtsTimestamp?: Prisma.SortOrder;
    tokenBoughtsLastId?: Prisma.SortOrder;
    tokenSoldsTimestamp?: Prisma.SortOrder;
    tokenSoldsLastId?: Prisma.SortOrder;
    poolcreatedsTimestamp?: Prisma.SortOrder;
    poolcreatedsLastId?: Prisma.SortOrder;
    tokencreatedsTimestamp?: Prisma.SortOrder;
    tokencreatedLastId?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type blockTimeStampsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenDeployedsTimestamp?: Prisma.SortOrder;
    tokenDeployedsLastId?: Prisma.SortOrder;
    tokenGraduatedsTimestamp?: Prisma.SortOrder;
    tokenGraduatedsLastId?: Prisma.SortOrder;
    tokenBoughtsTimestamp?: Prisma.SortOrder;
    tokenBoughtsLastId?: Prisma.SortOrder;
    tokenSoldsTimestamp?: Prisma.SortOrder;
    tokenSoldsLastId?: Prisma.SortOrder;
    poolcreatedsTimestamp?: Prisma.SortOrder;
    poolcreatedsLastId?: Prisma.SortOrder;
    tokencreatedsTimestamp?: Prisma.SortOrder;
    tokencreatedLastId?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type blockTimeStampsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenDeployedsTimestamp?: boolean;
    tokenDeployedsLastId?: boolean;
    tokenGraduatedsTimestamp?: boolean;
    tokenGraduatedsLastId?: boolean;
    tokenBoughtsTimestamp?: boolean;
    tokenBoughtsLastId?: boolean;
    tokenSoldsTimestamp?: boolean;
    tokenSoldsLastId?: boolean;
    poolcreatedsTimestamp?: boolean;
    poolcreatedsLastId?: boolean;
    tokencreatedsTimestamp?: boolean;
    tokencreatedLastId?: boolean;
    updatedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["blockTimeStamps"]>;
export type blockTimeStampsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenDeployedsTimestamp?: boolean;
    tokenDeployedsLastId?: boolean;
    tokenGraduatedsTimestamp?: boolean;
    tokenGraduatedsLastId?: boolean;
    tokenBoughtsTimestamp?: boolean;
    tokenBoughtsLastId?: boolean;
    tokenSoldsTimestamp?: boolean;
    tokenSoldsLastId?: boolean;
    poolcreatedsTimestamp?: boolean;
    poolcreatedsLastId?: boolean;
    tokencreatedsTimestamp?: boolean;
    tokencreatedLastId?: boolean;
    updatedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["blockTimeStamps"]>;
export type blockTimeStampsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenDeployedsTimestamp?: boolean;
    tokenDeployedsLastId?: boolean;
    tokenGraduatedsTimestamp?: boolean;
    tokenGraduatedsLastId?: boolean;
    tokenBoughtsTimestamp?: boolean;
    tokenBoughtsLastId?: boolean;
    tokenSoldsTimestamp?: boolean;
    tokenSoldsLastId?: boolean;
    poolcreatedsTimestamp?: boolean;
    poolcreatedsLastId?: boolean;
    tokencreatedsTimestamp?: boolean;
    tokencreatedLastId?: boolean;
    updatedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["blockTimeStamps"]>;
export type blockTimeStampsSelectScalar = {
    id?: boolean;
    tokenDeployedsTimestamp?: boolean;
    tokenDeployedsLastId?: boolean;
    tokenGraduatedsTimestamp?: boolean;
    tokenGraduatedsLastId?: boolean;
    tokenBoughtsTimestamp?: boolean;
    tokenBoughtsLastId?: boolean;
    tokenSoldsTimestamp?: boolean;
    tokenSoldsLastId?: boolean;
    poolcreatedsTimestamp?: boolean;
    poolcreatedsLastId?: boolean;
    tokencreatedsTimestamp?: boolean;
    tokencreatedLastId?: boolean;
    updatedAt?: boolean;
    createdAt?: boolean;
};
export type blockTimeStampsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tokenDeployedsTimestamp" | "tokenDeployedsLastId" | "tokenGraduatedsTimestamp" | "tokenGraduatedsLastId" | "tokenBoughtsTimestamp" | "tokenBoughtsLastId" | "tokenSoldsTimestamp" | "tokenSoldsLastId" | "poolcreatedsTimestamp" | "poolcreatedsLastId" | "tokencreatedsTimestamp" | "tokencreatedLastId" | "updatedAt" | "createdAt", ExtArgs["result"]["blockTimeStamps"]>;
export type $blockTimeStampsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "blockTimeStamps";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tokenDeployedsTimestamp: string;
        tokenDeployedsLastId: string;
        tokenGraduatedsTimestamp: string;
        tokenGraduatedsLastId: string;
        tokenBoughtsTimestamp: string;
        tokenBoughtsLastId: string;
        tokenSoldsTimestamp: string;
        tokenSoldsLastId: string;
        poolcreatedsTimestamp: string;
        poolcreatedsLastId: string;
        tokencreatedsTimestamp: string;
        tokencreatedLastId: string;
        updatedAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["blockTimeStamps"]>;
    composites: {};
};
export type blockTimeStampsGetPayload<S extends boolean | null | undefined | blockTimeStampsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload, S>;
export type blockTimeStampsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<blockTimeStampsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BlockTimeStampsCountAggregateInputType | true;
};
export interface blockTimeStampsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['blockTimeStamps'];
        meta: {
            name: 'blockTimeStamps';
        };
    };
    /**
     * Find zero or one BlockTimeStamps that matches the filter.
     * @param {blockTimeStampsFindUniqueArgs} args - Arguments to find a BlockTimeStamps
     * @example
     * // Get one BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends blockTimeStampsFindUniqueArgs>(args: Prisma.SelectSubset<T, blockTimeStampsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__blockTimeStampsClient<runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one BlockTimeStamps that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {blockTimeStampsFindUniqueOrThrowArgs} args - Arguments to find a BlockTimeStamps
     * @example
     * // Get one BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends blockTimeStampsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, blockTimeStampsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__blockTimeStampsClient<runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first BlockTimeStamps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {blockTimeStampsFindFirstArgs} args - Arguments to find a BlockTimeStamps
     * @example
     * // Get one BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends blockTimeStampsFindFirstArgs>(args?: Prisma.SelectSubset<T, blockTimeStampsFindFirstArgs<ExtArgs>>): Prisma.Prisma__blockTimeStampsClient<runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first BlockTimeStamps that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {blockTimeStampsFindFirstOrThrowArgs} args - Arguments to find a BlockTimeStamps
     * @example
     * // Get one BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends blockTimeStampsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, blockTimeStampsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__blockTimeStampsClient<runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more BlockTimeStamps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {blockTimeStampsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.findMany()
     *
     * // Get first 10 BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const blockTimeStampsWithIdOnly = await prisma.blockTimeStamps.findMany({ select: { id: true } })
     *
     */
    findMany<T extends blockTimeStampsFindManyArgs>(args?: Prisma.SelectSubset<T, blockTimeStampsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a BlockTimeStamps.
     * @param {blockTimeStampsCreateArgs} args - Arguments to create a BlockTimeStamps.
     * @example
     * // Create one BlockTimeStamps
     * const BlockTimeStamps = await prisma.blockTimeStamps.create({
     *   data: {
     *     // ... data to create a BlockTimeStamps
     *   }
     * })
     *
     */
    create<T extends blockTimeStampsCreateArgs>(args: Prisma.SelectSubset<T, blockTimeStampsCreateArgs<ExtArgs>>): Prisma.Prisma__blockTimeStampsClient<runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many BlockTimeStamps.
     * @param {blockTimeStampsCreateManyArgs} args - Arguments to create many BlockTimeStamps.
     * @example
     * // Create many BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends blockTimeStampsCreateManyArgs>(args?: Prisma.SelectSubset<T, blockTimeStampsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many BlockTimeStamps and returns the data saved in the database.
     * @param {blockTimeStampsCreateManyAndReturnArgs} args - Arguments to create many BlockTimeStamps.
     * @example
     * // Create many BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many BlockTimeStamps and only return the `id`
     * const blockTimeStampsWithIdOnly = await prisma.blockTimeStamps.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends blockTimeStampsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, blockTimeStampsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a BlockTimeStamps.
     * @param {blockTimeStampsDeleteArgs} args - Arguments to delete one BlockTimeStamps.
     * @example
     * // Delete one BlockTimeStamps
     * const BlockTimeStamps = await prisma.blockTimeStamps.delete({
     *   where: {
     *     // ... filter to delete one BlockTimeStamps
     *   }
     * })
     *
     */
    delete<T extends blockTimeStampsDeleteArgs>(args: Prisma.SelectSubset<T, blockTimeStampsDeleteArgs<ExtArgs>>): Prisma.Prisma__blockTimeStampsClient<runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one BlockTimeStamps.
     * @param {blockTimeStampsUpdateArgs} args - Arguments to update one BlockTimeStamps.
     * @example
     * // Update one BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends blockTimeStampsUpdateArgs>(args: Prisma.SelectSubset<T, blockTimeStampsUpdateArgs<ExtArgs>>): Prisma.Prisma__blockTimeStampsClient<runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more BlockTimeStamps.
     * @param {blockTimeStampsDeleteManyArgs} args - Arguments to filter BlockTimeStamps to delete.
     * @example
     * // Delete a few BlockTimeStamps
     * const { count } = await prisma.blockTimeStamps.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends blockTimeStampsDeleteManyArgs>(args?: Prisma.SelectSubset<T, blockTimeStampsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more BlockTimeStamps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {blockTimeStampsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends blockTimeStampsUpdateManyArgs>(args: Prisma.SelectSubset<T, blockTimeStampsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more BlockTimeStamps and returns the data updated in the database.
     * @param {blockTimeStampsUpdateManyAndReturnArgs} args - Arguments to update many BlockTimeStamps.
     * @example
     * // Update many BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more BlockTimeStamps and only return the `id`
     * const blockTimeStampsWithIdOnly = await prisma.blockTimeStamps.updateManyAndReturn({
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
    updateManyAndReturn<T extends blockTimeStampsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, blockTimeStampsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one BlockTimeStamps.
     * @param {blockTimeStampsUpsertArgs} args - Arguments to update or create a BlockTimeStamps.
     * @example
     * // Update or create a BlockTimeStamps
     * const blockTimeStamps = await prisma.blockTimeStamps.upsert({
     *   create: {
     *     // ... data to create a BlockTimeStamps
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlockTimeStamps we want to update
     *   }
     * })
     */
    upsert<T extends blockTimeStampsUpsertArgs>(args: Prisma.SelectSubset<T, blockTimeStampsUpsertArgs<ExtArgs>>): Prisma.Prisma__blockTimeStampsClient<runtime.Types.Result.GetResult<Prisma.$blockTimeStampsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of BlockTimeStamps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {blockTimeStampsCountArgs} args - Arguments to filter BlockTimeStamps to count.
     * @example
     * // Count the number of BlockTimeStamps
     * const count = await prisma.blockTimeStamps.count({
     *   where: {
     *     // ... the filter for the BlockTimeStamps we want to count
     *   }
     * })
    **/
    count<T extends blockTimeStampsCountArgs>(args?: Prisma.Subset<T, blockTimeStampsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BlockTimeStampsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a BlockTimeStamps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockTimeStampsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlockTimeStampsAggregateArgs>(args: Prisma.Subset<T, BlockTimeStampsAggregateArgs>): Prisma.PrismaPromise<GetBlockTimeStampsAggregateType<T>>;
    /**
     * Group by BlockTimeStamps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {blockTimeStampsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends blockTimeStampsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: blockTimeStampsGroupByArgs['orderBy'];
    } : {
        orderBy?: blockTimeStampsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, blockTimeStampsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockTimeStampsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the blockTimeStamps model
     */
    readonly fields: blockTimeStampsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for blockTimeStamps.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__blockTimeStampsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the blockTimeStamps model
 */
export interface blockTimeStampsFieldRefs {
    readonly id: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly tokenDeployedsTimestamp: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly tokenDeployedsLastId: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly tokenGraduatedsTimestamp: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly tokenGraduatedsLastId: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly tokenBoughtsTimestamp: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly tokenBoughtsLastId: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly tokenSoldsTimestamp: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly tokenSoldsLastId: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly poolcreatedsTimestamp: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly poolcreatedsLastId: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly tokencreatedsTimestamp: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly tokencreatedLastId: Prisma.FieldRef<"blockTimeStamps", 'String'>;
    readonly updatedAt: Prisma.FieldRef<"blockTimeStamps", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"blockTimeStamps", 'DateTime'>;
}
/**
 * blockTimeStamps findUnique
 */
export type blockTimeStampsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
    /**
     * Filter, which blockTimeStamps to fetch.
     */
    where: Prisma.blockTimeStampsWhereUniqueInput;
};
/**
 * blockTimeStamps findUniqueOrThrow
 */
export type blockTimeStampsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
    /**
     * Filter, which blockTimeStamps to fetch.
     */
    where: Prisma.blockTimeStampsWhereUniqueInput;
};
/**
 * blockTimeStamps findFirst
 */
export type blockTimeStampsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
    /**
     * Filter, which blockTimeStamps to fetch.
     */
    where?: Prisma.blockTimeStampsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of blockTimeStamps to fetch.
     */
    orderBy?: Prisma.blockTimeStampsOrderByWithRelationInput | Prisma.blockTimeStampsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for blockTimeStamps.
     */
    cursor?: Prisma.blockTimeStampsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` blockTimeStamps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` blockTimeStamps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of blockTimeStamps.
     */
    distinct?: Prisma.BlockTimeStampsScalarFieldEnum | Prisma.BlockTimeStampsScalarFieldEnum[];
};
/**
 * blockTimeStamps findFirstOrThrow
 */
export type blockTimeStampsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
    /**
     * Filter, which blockTimeStamps to fetch.
     */
    where?: Prisma.blockTimeStampsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of blockTimeStamps to fetch.
     */
    orderBy?: Prisma.blockTimeStampsOrderByWithRelationInput | Prisma.blockTimeStampsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for blockTimeStamps.
     */
    cursor?: Prisma.blockTimeStampsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` blockTimeStamps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` blockTimeStamps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of blockTimeStamps.
     */
    distinct?: Prisma.BlockTimeStampsScalarFieldEnum | Prisma.BlockTimeStampsScalarFieldEnum[];
};
/**
 * blockTimeStamps findMany
 */
export type blockTimeStampsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
    /**
     * Filter, which blockTimeStamps to fetch.
     */
    where?: Prisma.blockTimeStampsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of blockTimeStamps to fetch.
     */
    orderBy?: Prisma.blockTimeStampsOrderByWithRelationInput | Prisma.blockTimeStampsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing blockTimeStamps.
     */
    cursor?: Prisma.blockTimeStampsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` blockTimeStamps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` blockTimeStamps.
     */
    skip?: number;
    distinct?: Prisma.BlockTimeStampsScalarFieldEnum | Prisma.BlockTimeStampsScalarFieldEnum[];
};
/**
 * blockTimeStamps create
 */
export type blockTimeStampsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
    /**
     * The data needed to create a blockTimeStamps.
     */
    data: Prisma.XOR<Prisma.blockTimeStampsCreateInput, Prisma.blockTimeStampsUncheckedCreateInput>;
};
/**
 * blockTimeStamps createMany
 */
export type blockTimeStampsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many blockTimeStamps.
     */
    data: Prisma.blockTimeStampsCreateManyInput | Prisma.blockTimeStampsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * blockTimeStamps createManyAndReturn
 */
export type blockTimeStampsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
    /**
     * The data used to create many blockTimeStamps.
     */
    data: Prisma.blockTimeStampsCreateManyInput | Prisma.blockTimeStampsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * blockTimeStamps update
 */
export type blockTimeStampsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
    /**
     * The data needed to update a blockTimeStamps.
     */
    data: Prisma.XOR<Prisma.blockTimeStampsUpdateInput, Prisma.blockTimeStampsUncheckedUpdateInput>;
    /**
     * Choose, which blockTimeStamps to update.
     */
    where: Prisma.blockTimeStampsWhereUniqueInput;
};
/**
 * blockTimeStamps updateMany
 */
export type blockTimeStampsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update blockTimeStamps.
     */
    data: Prisma.XOR<Prisma.blockTimeStampsUpdateManyMutationInput, Prisma.blockTimeStampsUncheckedUpdateManyInput>;
    /**
     * Filter which blockTimeStamps to update
     */
    where?: Prisma.blockTimeStampsWhereInput;
    /**
     * Limit how many blockTimeStamps to update.
     */
    limit?: number;
};
/**
 * blockTimeStamps updateManyAndReturn
 */
export type blockTimeStampsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
    /**
     * The data used to update blockTimeStamps.
     */
    data: Prisma.XOR<Prisma.blockTimeStampsUpdateManyMutationInput, Prisma.blockTimeStampsUncheckedUpdateManyInput>;
    /**
     * Filter which blockTimeStamps to update
     */
    where?: Prisma.blockTimeStampsWhereInput;
    /**
     * Limit how many blockTimeStamps to update.
     */
    limit?: number;
};
/**
 * blockTimeStamps upsert
 */
export type blockTimeStampsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
    /**
     * The filter to search for the blockTimeStamps to update in case it exists.
     */
    where: Prisma.blockTimeStampsWhereUniqueInput;
    /**
     * In case the blockTimeStamps found by the `where` argument doesn't exist, create a new blockTimeStamps with this data.
     */
    create: Prisma.XOR<Prisma.blockTimeStampsCreateInput, Prisma.blockTimeStampsUncheckedCreateInput>;
    /**
     * In case the blockTimeStamps was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.blockTimeStampsUpdateInput, Prisma.blockTimeStampsUncheckedUpdateInput>;
};
/**
 * blockTimeStamps delete
 */
export type blockTimeStampsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
    /**
     * Filter which blockTimeStamps to delete.
     */
    where: Prisma.blockTimeStampsWhereUniqueInput;
};
/**
 * blockTimeStamps deleteMany
 */
export type blockTimeStampsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which blockTimeStamps to delete
     */
    where?: Prisma.blockTimeStampsWhereInput;
    /**
     * Limit how many blockTimeStamps to delete.
     */
    limit?: number;
};
/**
 * blockTimeStamps without action
 */
export type blockTimeStampsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the blockTimeStamps
     */
    select?: Prisma.blockTimeStampsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the blockTimeStamps
     */
    omit?: Prisma.blockTimeStampsOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=blockTimeStamps.d.ts.map