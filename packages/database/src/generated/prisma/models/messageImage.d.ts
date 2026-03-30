import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model messageImage
 *
 */
export type messageImageModel = runtime.Types.Result.DefaultSelection<Prisma.$messageImagePayload>;
export type AggregateMessageImage = {
    _count: MessageImageCountAggregateOutputType | null;
    _min: MessageImageMinAggregateOutputType | null;
    _max: MessageImageMaxAggregateOutputType | null;
};
export type MessageImageMinAggregateOutputType = {
    id: string | null;
    address: string | null;
    messageId: string | null;
};
export type MessageImageMaxAggregateOutputType = {
    id: string | null;
    address: string | null;
    messageId: string | null;
};
export type MessageImageCountAggregateOutputType = {
    id: number;
    address: number;
    messageId: number;
    _all: number;
};
export type MessageImageMinAggregateInputType = {
    id?: true;
    address?: true;
    messageId?: true;
};
export type MessageImageMaxAggregateInputType = {
    id?: true;
    address?: true;
    messageId?: true;
};
export type MessageImageCountAggregateInputType = {
    id?: true;
    address?: true;
    messageId?: true;
    _all?: true;
};
export type MessageImageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which messageImage to aggregate.
     */
    where?: Prisma.messageImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of messageImages to fetch.
     */
    orderBy?: Prisma.messageImageOrderByWithRelationInput | Prisma.messageImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.messageImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` messageImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` messageImages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned messageImages
    **/
    _count?: true | MessageImageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MessageImageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MessageImageMaxAggregateInputType;
};
export type GetMessageImageAggregateType<T extends MessageImageAggregateArgs> = {
    [P in keyof T & keyof AggregateMessageImage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMessageImage[P]> : Prisma.GetScalarType<T[P], AggregateMessageImage[P]>;
};
export type messageImageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.messageImageWhereInput;
    orderBy?: Prisma.messageImageOrderByWithAggregationInput | Prisma.messageImageOrderByWithAggregationInput[];
    by: Prisma.MessageImageScalarFieldEnum[] | Prisma.MessageImageScalarFieldEnum;
    having?: Prisma.messageImageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageImageCountAggregateInputType | true;
    _min?: MessageImageMinAggregateInputType;
    _max?: MessageImageMaxAggregateInputType;
};
export type MessageImageGroupByOutputType = {
    id: string;
    address: string;
    messageId: string;
    _count: MessageImageCountAggregateOutputType | null;
    _min: MessageImageMinAggregateOutputType | null;
    _max: MessageImageMaxAggregateOutputType | null;
};
type GetMessageImageGroupByPayload<T extends messageImageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MessageImageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MessageImageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MessageImageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MessageImageGroupByOutputType[P]>;
}>>;
export type messageImageWhereInput = {
    AND?: Prisma.messageImageWhereInput | Prisma.messageImageWhereInput[];
    OR?: Prisma.messageImageWhereInput[];
    NOT?: Prisma.messageImageWhereInput | Prisma.messageImageWhereInput[];
    id?: Prisma.StringFilter<"messageImage"> | string;
    address?: Prisma.StringFilter<"messageImage"> | string;
    messageId?: Prisma.StringFilter<"messageImage"> | string;
    message?: Prisma.XOR<Prisma.MessageScalarRelationFilter, Prisma.messageWhereInput>;
};
export type messageImageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    message?: Prisma.messageOrderByWithRelationInput;
};
export type messageImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    messageId?: string;
    AND?: Prisma.messageImageWhereInput | Prisma.messageImageWhereInput[];
    OR?: Prisma.messageImageWhereInput[];
    NOT?: Prisma.messageImageWhereInput | Prisma.messageImageWhereInput[];
    address?: Prisma.StringFilter<"messageImage"> | string;
    message?: Prisma.XOR<Prisma.MessageScalarRelationFilter, Prisma.messageWhereInput>;
}, "id" | "messageId">;
export type messageImageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    _count?: Prisma.messageImageCountOrderByAggregateInput;
    _max?: Prisma.messageImageMaxOrderByAggregateInput;
    _min?: Prisma.messageImageMinOrderByAggregateInput;
};
export type messageImageScalarWhereWithAggregatesInput = {
    AND?: Prisma.messageImageScalarWhereWithAggregatesInput | Prisma.messageImageScalarWhereWithAggregatesInput[];
    OR?: Prisma.messageImageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.messageImageScalarWhereWithAggregatesInput | Prisma.messageImageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"messageImage"> | string;
    address?: Prisma.StringWithAggregatesFilter<"messageImage"> | string;
    messageId?: Prisma.StringWithAggregatesFilter<"messageImage"> | string;
};
export type messageImageCreateInput = {
    id?: string;
    address: string;
    message: Prisma.messageCreateNestedOneWithoutReferencedImageInput;
};
export type messageImageUncheckedCreateInput = {
    id?: string;
    address: string;
    messageId: string;
};
export type messageImageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.messageUpdateOneRequiredWithoutReferencedImageNestedInput;
};
export type messageImageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type messageImageCreateManyInput = {
    id?: string;
    address: string;
    messageId: string;
};
export type messageImageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type messageImageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type MessageImageNullableScalarRelationFilter = {
    is?: Prisma.messageImageWhereInput | null;
    isNot?: Prisma.messageImageWhereInput | null;
};
export type messageImageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
};
export type messageImageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
};
export type messageImageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
};
export type messageImageCreateNestedOneWithoutMessageInput = {
    create?: Prisma.XOR<Prisma.messageImageCreateWithoutMessageInput, Prisma.messageImageUncheckedCreateWithoutMessageInput>;
    connectOrCreate?: Prisma.messageImageCreateOrConnectWithoutMessageInput;
    connect?: Prisma.messageImageWhereUniqueInput;
};
export type messageImageUncheckedCreateNestedOneWithoutMessageInput = {
    create?: Prisma.XOR<Prisma.messageImageCreateWithoutMessageInput, Prisma.messageImageUncheckedCreateWithoutMessageInput>;
    connectOrCreate?: Prisma.messageImageCreateOrConnectWithoutMessageInput;
    connect?: Prisma.messageImageWhereUniqueInput;
};
export type messageImageUpdateOneWithoutMessageNestedInput = {
    create?: Prisma.XOR<Prisma.messageImageCreateWithoutMessageInput, Prisma.messageImageUncheckedCreateWithoutMessageInput>;
    connectOrCreate?: Prisma.messageImageCreateOrConnectWithoutMessageInput;
    upsert?: Prisma.messageImageUpsertWithoutMessageInput;
    disconnect?: Prisma.messageImageWhereInput | boolean;
    delete?: Prisma.messageImageWhereInput | boolean;
    connect?: Prisma.messageImageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.messageImageUpdateToOneWithWhereWithoutMessageInput, Prisma.messageImageUpdateWithoutMessageInput>, Prisma.messageImageUncheckedUpdateWithoutMessageInput>;
};
export type messageImageUncheckedUpdateOneWithoutMessageNestedInput = {
    create?: Prisma.XOR<Prisma.messageImageCreateWithoutMessageInput, Prisma.messageImageUncheckedCreateWithoutMessageInput>;
    connectOrCreate?: Prisma.messageImageCreateOrConnectWithoutMessageInput;
    upsert?: Prisma.messageImageUpsertWithoutMessageInput;
    disconnect?: Prisma.messageImageWhereInput | boolean;
    delete?: Prisma.messageImageWhereInput | boolean;
    connect?: Prisma.messageImageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.messageImageUpdateToOneWithWhereWithoutMessageInput, Prisma.messageImageUpdateWithoutMessageInput>, Prisma.messageImageUncheckedUpdateWithoutMessageInput>;
};
export type messageImageCreateWithoutMessageInput = {
    id?: string;
    address: string;
};
export type messageImageUncheckedCreateWithoutMessageInput = {
    id?: string;
    address: string;
};
export type messageImageCreateOrConnectWithoutMessageInput = {
    where: Prisma.messageImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.messageImageCreateWithoutMessageInput, Prisma.messageImageUncheckedCreateWithoutMessageInput>;
};
export type messageImageUpsertWithoutMessageInput = {
    update: Prisma.XOR<Prisma.messageImageUpdateWithoutMessageInput, Prisma.messageImageUncheckedUpdateWithoutMessageInput>;
    create: Prisma.XOR<Prisma.messageImageCreateWithoutMessageInput, Prisma.messageImageUncheckedCreateWithoutMessageInput>;
    where?: Prisma.messageImageWhereInput;
};
export type messageImageUpdateToOneWithWhereWithoutMessageInput = {
    where?: Prisma.messageImageWhereInput;
    data: Prisma.XOR<Prisma.messageImageUpdateWithoutMessageInput, Prisma.messageImageUncheckedUpdateWithoutMessageInput>;
};
export type messageImageUpdateWithoutMessageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type messageImageUncheckedUpdateWithoutMessageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type messageImageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    address?: boolean;
    messageId?: boolean;
    message?: boolean | Prisma.messageDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["messageImage"]>;
export type messageImageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    address?: boolean;
    messageId?: boolean;
    message?: boolean | Prisma.messageDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["messageImage"]>;
export type messageImageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    address?: boolean;
    messageId?: boolean;
    message?: boolean | Prisma.messageDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["messageImage"]>;
export type messageImageSelectScalar = {
    id?: boolean;
    address?: boolean;
    messageId?: boolean;
};
export type messageImageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "address" | "messageId", ExtArgs["result"]["messageImage"]>;
export type messageImageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.messageDefaultArgs<ExtArgs>;
};
export type messageImageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.messageDefaultArgs<ExtArgs>;
};
export type messageImageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.messageDefaultArgs<ExtArgs>;
};
export type $messageImagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "messageImage";
    objects: {
        message: Prisma.$messagePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        address: string;
        messageId: string;
    }, ExtArgs["result"]["messageImage"]>;
    composites: {};
};
export type messageImageGetPayload<S extends boolean | null | undefined | messageImageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$messageImagePayload, S>;
export type messageImageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<messageImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MessageImageCountAggregateInputType | true;
};
export interface messageImageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['messageImage'];
        meta: {
            name: 'messageImage';
        };
    };
    /**
     * Find zero or one MessageImage that matches the filter.
     * @param {messageImageFindUniqueArgs} args - Arguments to find a MessageImage
     * @example
     * // Get one MessageImage
     * const messageImage = await prisma.messageImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends messageImageFindUniqueArgs>(args: Prisma.SelectSubset<T, messageImageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__messageImageClient<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MessageImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {messageImageFindUniqueOrThrowArgs} args - Arguments to find a MessageImage
     * @example
     * // Get one MessageImage
     * const messageImage = await prisma.messageImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends messageImageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, messageImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__messageImageClient<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MessageImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageImageFindFirstArgs} args - Arguments to find a MessageImage
     * @example
     * // Get one MessageImage
     * const messageImage = await prisma.messageImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends messageImageFindFirstArgs>(args?: Prisma.SelectSubset<T, messageImageFindFirstArgs<ExtArgs>>): Prisma.Prisma__messageImageClient<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MessageImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageImageFindFirstOrThrowArgs} args - Arguments to find a MessageImage
     * @example
     * // Get one MessageImage
     * const messageImage = await prisma.messageImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends messageImageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, messageImageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__messageImageClient<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MessageImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageImages
     * const messageImages = await prisma.messageImage.findMany()
     *
     * // Get first 10 MessageImages
     * const messageImages = await prisma.messageImage.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const messageImageWithIdOnly = await prisma.messageImage.findMany({ select: { id: true } })
     *
     */
    findMany<T extends messageImageFindManyArgs>(args?: Prisma.SelectSubset<T, messageImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MessageImage.
     * @param {messageImageCreateArgs} args - Arguments to create a MessageImage.
     * @example
     * // Create one MessageImage
     * const MessageImage = await prisma.messageImage.create({
     *   data: {
     *     // ... data to create a MessageImage
     *   }
     * })
     *
     */
    create<T extends messageImageCreateArgs>(args: Prisma.SelectSubset<T, messageImageCreateArgs<ExtArgs>>): Prisma.Prisma__messageImageClient<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MessageImages.
     * @param {messageImageCreateManyArgs} args - Arguments to create many MessageImages.
     * @example
     * // Create many MessageImages
     * const messageImage = await prisma.messageImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends messageImageCreateManyArgs>(args?: Prisma.SelectSubset<T, messageImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MessageImages and returns the data saved in the database.
     * @param {messageImageCreateManyAndReturnArgs} args - Arguments to create many MessageImages.
     * @example
     * // Create many MessageImages
     * const messageImage = await prisma.messageImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MessageImages and only return the `id`
     * const messageImageWithIdOnly = await prisma.messageImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends messageImageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, messageImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MessageImage.
     * @param {messageImageDeleteArgs} args - Arguments to delete one MessageImage.
     * @example
     * // Delete one MessageImage
     * const MessageImage = await prisma.messageImage.delete({
     *   where: {
     *     // ... filter to delete one MessageImage
     *   }
     * })
     *
     */
    delete<T extends messageImageDeleteArgs>(args: Prisma.SelectSubset<T, messageImageDeleteArgs<ExtArgs>>): Prisma.Prisma__messageImageClient<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MessageImage.
     * @param {messageImageUpdateArgs} args - Arguments to update one MessageImage.
     * @example
     * // Update one MessageImage
     * const messageImage = await prisma.messageImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends messageImageUpdateArgs>(args: Prisma.SelectSubset<T, messageImageUpdateArgs<ExtArgs>>): Prisma.Prisma__messageImageClient<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MessageImages.
     * @param {messageImageDeleteManyArgs} args - Arguments to filter MessageImages to delete.
     * @example
     * // Delete a few MessageImages
     * const { count } = await prisma.messageImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends messageImageDeleteManyArgs>(args?: Prisma.SelectSubset<T, messageImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MessageImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageImages
     * const messageImage = await prisma.messageImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends messageImageUpdateManyArgs>(args: Prisma.SelectSubset<T, messageImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MessageImages and returns the data updated in the database.
     * @param {messageImageUpdateManyAndReturnArgs} args - Arguments to update many MessageImages.
     * @example
     * // Update many MessageImages
     * const messageImage = await prisma.messageImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MessageImages and only return the `id`
     * const messageImageWithIdOnly = await prisma.messageImage.updateManyAndReturn({
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
    updateManyAndReturn<T extends messageImageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, messageImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MessageImage.
     * @param {messageImageUpsertArgs} args - Arguments to update or create a MessageImage.
     * @example
     * // Update or create a MessageImage
     * const messageImage = await prisma.messageImage.upsert({
     *   create: {
     *     // ... data to create a MessageImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageImage we want to update
     *   }
     * })
     */
    upsert<T extends messageImageUpsertArgs>(args: Prisma.SelectSubset<T, messageImageUpsertArgs<ExtArgs>>): Prisma.Prisma__messageImageClient<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MessageImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageImageCountArgs} args - Arguments to filter MessageImages to count.
     * @example
     * // Count the number of MessageImages
     * const count = await prisma.messageImage.count({
     *   where: {
     *     // ... the filter for the MessageImages we want to count
     *   }
     * })
    **/
    count<T extends messageImageCountArgs>(args?: Prisma.Subset<T, messageImageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MessageImageCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MessageImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MessageImageAggregateArgs>(args: Prisma.Subset<T, MessageImageAggregateArgs>): Prisma.PrismaPromise<GetMessageImageAggregateType<T>>;
    /**
     * Group by MessageImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageImageGroupByArgs} args - Group by arguments.
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
    groupBy<T extends messageImageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: messageImageGroupByArgs['orderBy'];
    } : {
        orderBy?: messageImageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, messageImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the messageImage model
     */
    readonly fields: messageImageFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for messageImage.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__messageImageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    message<T extends Prisma.messageDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.messageDefaultArgs<ExtArgs>>): Prisma.Prisma__messageClient<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the messageImage model
 */
export interface messageImageFieldRefs {
    readonly id: Prisma.FieldRef<"messageImage", 'String'>;
    readonly address: Prisma.FieldRef<"messageImage", 'String'>;
    readonly messageId: Prisma.FieldRef<"messageImage", 'String'>;
}
/**
 * messageImage findUnique
 */
export type messageImageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageInclude<ExtArgs> | null;
    /**
     * Filter, which messageImage to fetch.
     */
    where: Prisma.messageImageWhereUniqueInput;
};
/**
 * messageImage findUniqueOrThrow
 */
export type messageImageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageInclude<ExtArgs> | null;
    /**
     * Filter, which messageImage to fetch.
     */
    where: Prisma.messageImageWhereUniqueInput;
};
/**
 * messageImage findFirst
 */
export type messageImageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageInclude<ExtArgs> | null;
    /**
     * Filter, which messageImage to fetch.
     */
    where?: Prisma.messageImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of messageImages to fetch.
     */
    orderBy?: Prisma.messageImageOrderByWithRelationInput | Prisma.messageImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for messageImages.
     */
    cursor?: Prisma.messageImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` messageImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` messageImages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of messageImages.
     */
    distinct?: Prisma.MessageImageScalarFieldEnum | Prisma.MessageImageScalarFieldEnum[];
};
/**
 * messageImage findFirstOrThrow
 */
export type messageImageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageInclude<ExtArgs> | null;
    /**
     * Filter, which messageImage to fetch.
     */
    where?: Prisma.messageImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of messageImages to fetch.
     */
    orderBy?: Prisma.messageImageOrderByWithRelationInput | Prisma.messageImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for messageImages.
     */
    cursor?: Prisma.messageImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` messageImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` messageImages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of messageImages.
     */
    distinct?: Prisma.MessageImageScalarFieldEnum | Prisma.MessageImageScalarFieldEnum[];
};
/**
 * messageImage findMany
 */
export type messageImageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageInclude<ExtArgs> | null;
    /**
     * Filter, which messageImages to fetch.
     */
    where?: Prisma.messageImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of messageImages to fetch.
     */
    orderBy?: Prisma.messageImageOrderByWithRelationInput | Prisma.messageImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing messageImages.
     */
    cursor?: Prisma.messageImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` messageImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` messageImages.
     */
    skip?: number;
    distinct?: Prisma.MessageImageScalarFieldEnum | Prisma.MessageImageScalarFieldEnum[];
};
/**
 * messageImage create
 */
export type messageImageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageInclude<ExtArgs> | null;
    /**
     * The data needed to create a messageImage.
     */
    data: Prisma.XOR<Prisma.messageImageCreateInput, Prisma.messageImageUncheckedCreateInput>;
};
/**
 * messageImage createMany
 */
export type messageImageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many messageImages.
     */
    data: Prisma.messageImageCreateManyInput | Prisma.messageImageCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * messageImage createManyAndReturn
 */
export type messageImageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * The data used to create many messageImages.
     */
    data: Prisma.messageImageCreateManyInput | Prisma.messageImageCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * messageImage update
 */
export type messageImageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageInclude<ExtArgs> | null;
    /**
     * The data needed to update a messageImage.
     */
    data: Prisma.XOR<Prisma.messageImageUpdateInput, Prisma.messageImageUncheckedUpdateInput>;
    /**
     * Choose, which messageImage to update.
     */
    where: Prisma.messageImageWhereUniqueInput;
};
/**
 * messageImage updateMany
 */
export type messageImageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update messageImages.
     */
    data: Prisma.XOR<Prisma.messageImageUpdateManyMutationInput, Prisma.messageImageUncheckedUpdateManyInput>;
    /**
     * Filter which messageImages to update
     */
    where?: Prisma.messageImageWhereInput;
    /**
     * Limit how many messageImages to update.
     */
    limit?: number;
};
/**
 * messageImage updateManyAndReturn
 */
export type messageImageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * The data used to update messageImages.
     */
    data: Prisma.XOR<Prisma.messageImageUpdateManyMutationInput, Prisma.messageImageUncheckedUpdateManyInput>;
    /**
     * Filter which messageImages to update
     */
    where?: Prisma.messageImageWhereInput;
    /**
     * Limit how many messageImages to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * messageImage upsert
 */
export type messageImageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageInclude<ExtArgs> | null;
    /**
     * The filter to search for the messageImage to update in case it exists.
     */
    where: Prisma.messageImageWhereUniqueInput;
    /**
     * In case the messageImage found by the `where` argument doesn't exist, create a new messageImage with this data.
     */
    create: Prisma.XOR<Prisma.messageImageCreateInput, Prisma.messageImageUncheckedCreateInput>;
    /**
     * In case the messageImage was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.messageImageUpdateInput, Prisma.messageImageUncheckedUpdateInput>;
};
/**
 * messageImage delete
 */
export type messageImageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageInclude<ExtArgs> | null;
    /**
     * Filter which messageImage to delete.
     */
    where: Prisma.messageImageWhereUniqueInput;
};
/**
 * messageImage deleteMany
 */
export type messageImageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which messageImages to delete
     */
    where?: Prisma.messageImageWhereInput;
    /**
     * Limit how many messageImages to delete.
     */
    limit?: number;
};
/**
 * messageImage without action
 */
export type messageImageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messageImage
     */
    select?: Prisma.messageImageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the messageImage
     */
    omit?: Prisma.messageImageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageImageInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=messageImage.d.ts.map