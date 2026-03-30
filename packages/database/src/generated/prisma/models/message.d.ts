import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model message
 *
 */
export type messageModel = runtime.Types.Result.DefaultSelection<Prisma.$messagePayload>;
export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
};
export type MessageMinAggregateOutputType = {
    id: string | null;
    message: string | null;
    userKey: string | null;
    coinId: string | null;
    referencedMessageId: string | null;
    dateTime: Date | null;
};
export type MessageMaxAggregateOutputType = {
    id: string | null;
    message: string | null;
    userKey: string | null;
    coinId: string | null;
    referencedMessageId: string | null;
    dateTime: Date | null;
};
export type MessageCountAggregateOutputType = {
    id: number;
    message: number;
    userKey: number;
    coinId: number;
    referencedMessageId: number;
    dateTime: number;
    _all: number;
};
export type MessageMinAggregateInputType = {
    id?: true;
    message?: true;
    userKey?: true;
    coinId?: true;
    referencedMessageId?: true;
    dateTime?: true;
};
export type MessageMaxAggregateInputType = {
    id?: true;
    message?: true;
    userKey?: true;
    coinId?: true;
    referencedMessageId?: true;
    dateTime?: true;
};
export type MessageCountAggregateInputType = {
    id?: true;
    message?: true;
    userKey?: true;
    coinId?: true;
    referencedMessageId?: true;
    dateTime?: true;
    _all?: true;
};
export type MessageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which message to aggregate.
     */
    where?: Prisma.messageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of messages to fetch.
     */
    orderBy?: Prisma.messageOrderByWithRelationInput | Prisma.messageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.messageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned messages
    **/
    _count?: true | MessageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType;
};
export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
    [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMessage[P]> : Prisma.GetScalarType<T[P], AggregateMessage[P]>;
};
export type messageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.messageWhereInput;
    orderBy?: Prisma.messageOrderByWithAggregationInput | Prisma.messageOrderByWithAggregationInput[];
    by: Prisma.MessageScalarFieldEnum[] | Prisma.MessageScalarFieldEnum;
    having?: Prisma.messageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageCountAggregateInputType | true;
    _min?: MessageMinAggregateInputType;
    _max?: MessageMaxAggregateInputType;
};
export type MessageGroupByOutputType = {
    id: string;
    message: string | null;
    userKey: string;
    coinId: string;
    referencedMessageId: string | null;
    dateTime: Date;
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
};
type GetMessageGroupByPayload<T extends messageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MessageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MessageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MessageGroupByOutputType[P]>;
}>>;
export type messageWhereInput = {
    AND?: Prisma.messageWhereInput | Prisma.messageWhereInput[];
    OR?: Prisma.messageWhereInput[];
    NOT?: Prisma.messageWhereInput | Prisma.messageWhereInput[];
    id?: Prisma.StringFilter<"message"> | string;
    message?: Prisma.StringNullableFilter<"message"> | string | null;
    userKey?: Prisma.StringFilter<"message"> | string;
    coinId?: Prisma.StringFilter<"message"> | string;
    referencedMessageId?: Prisma.StringNullableFilter<"message"> | string | null;
    dateTime?: Prisma.DateTimeFilter<"message"> | Date | string;
    coin?: Prisma.XOR<Prisma.CoinScalarRelationFilter, Prisma.coinWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.userWhereInput>;
    referencedImage?: Prisma.XOR<Prisma.MessageImageNullableScalarRelationFilter, Prisma.messageImageWhereInput> | null;
    referencedMessage?: Prisma.XOR<Prisma.MessageNullableScalarRelationFilter, Prisma.messageWhereInput> | null;
    referees?: Prisma.MessageListRelationFilter;
};
export type messageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    userKey?: Prisma.SortOrder;
    coinId?: Prisma.SortOrder;
    referencedMessageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    dateTime?: Prisma.SortOrder;
    coin?: Prisma.coinOrderByWithRelationInput;
    user?: Prisma.userOrderByWithRelationInput;
    referencedImage?: Prisma.messageImageOrderByWithRelationInput;
    referencedMessage?: Prisma.messageOrderByWithRelationInput;
    referees?: Prisma.messageOrderByRelationAggregateInput;
};
export type messageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.messageWhereInput | Prisma.messageWhereInput[];
    OR?: Prisma.messageWhereInput[];
    NOT?: Prisma.messageWhereInput | Prisma.messageWhereInput[];
    message?: Prisma.StringNullableFilter<"message"> | string | null;
    userKey?: Prisma.StringFilter<"message"> | string;
    coinId?: Prisma.StringFilter<"message"> | string;
    referencedMessageId?: Prisma.StringNullableFilter<"message"> | string | null;
    dateTime?: Prisma.DateTimeFilter<"message"> | Date | string;
    coin?: Prisma.XOR<Prisma.CoinScalarRelationFilter, Prisma.coinWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.userWhereInput>;
    referencedImage?: Prisma.XOR<Prisma.MessageImageNullableScalarRelationFilter, Prisma.messageImageWhereInput> | null;
    referencedMessage?: Prisma.XOR<Prisma.MessageNullableScalarRelationFilter, Prisma.messageWhereInput> | null;
    referees?: Prisma.MessageListRelationFilter;
}, "id">;
export type messageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    userKey?: Prisma.SortOrder;
    coinId?: Prisma.SortOrder;
    referencedMessageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    dateTime?: Prisma.SortOrder;
    _count?: Prisma.messageCountOrderByAggregateInput;
    _max?: Prisma.messageMaxOrderByAggregateInput;
    _min?: Prisma.messageMinOrderByAggregateInput;
};
export type messageScalarWhereWithAggregatesInput = {
    AND?: Prisma.messageScalarWhereWithAggregatesInput | Prisma.messageScalarWhereWithAggregatesInput[];
    OR?: Prisma.messageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.messageScalarWhereWithAggregatesInput | Prisma.messageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"message"> | string;
    message?: Prisma.StringNullableWithAggregatesFilter<"message"> | string | null;
    userKey?: Prisma.StringWithAggregatesFilter<"message"> | string;
    coinId?: Prisma.StringWithAggregatesFilter<"message"> | string;
    referencedMessageId?: Prisma.StringNullableWithAggregatesFilter<"message"> | string | null;
    dateTime?: Prisma.DateTimeWithAggregatesFilter<"message"> | Date | string;
};
export type messageCreateInput = {
    id?: string;
    message?: string | null;
    dateTime?: Date | string;
    coin: Prisma.coinCreateNestedOneWithoutMessagesInput;
    user: Prisma.userCreateNestedOneWithoutMessagesInput;
    referencedImage?: Prisma.messageImageCreateNestedOneWithoutMessageInput;
    referencedMessage?: Prisma.messageCreateNestedOneWithoutRefereesInput;
    referees?: Prisma.messageCreateNestedManyWithoutReferencedMessageInput;
};
export type messageUncheckedCreateInput = {
    id?: string;
    message?: string | null;
    userKey: string;
    coinId: string;
    referencedMessageId?: string | null;
    dateTime?: Date | string;
    referencedImage?: Prisma.messageImageUncheckedCreateNestedOneWithoutMessageInput;
    referees?: Prisma.messageUncheckedCreateNestedManyWithoutReferencedMessageInput;
};
export type messageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coin?: Prisma.coinUpdateOneRequiredWithoutMessagesNestedInput;
    user?: Prisma.userUpdateOneRequiredWithoutMessagesNestedInput;
    referencedImage?: Prisma.messageImageUpdateOneWithoutMessageNestedInput;
    referencedMessage?: Prisma.messageUpdateOneWithoutRefereesNestedInput;
    referees?: Prisma.messageUpdateManyWithoutReferencedMessageNestedInput;
};
export type messageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userKey?: Prisma.StringFieldUpdateOperationsInput | string;
    coinId?: Prisma.StringFieldUpdateOperationsInput | string;
    referencedMessageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referencedImage?: Prisma.messageImageUncheckedUpdateOneWithoutMessageNestedInput;
    referees?: Prisma.messageUncheckedUpdateManyWithoutReferencedMessageNestedInput;
};
export type messageCreateManyInput = {
    id?: string;
    message?: string | null;
    userKey: string;
    coinId: string;
    referencedMessageId?: string | null;
    dateTime?: Date | string;
};
export type messageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type messageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userKey?: Prisma.StringFieldUpdateOperationsInput | string;
    coinId?: Prisma.StringFieldUpdateOperationsInput | string;
    referencedMessageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageListRelationFilter = {
    every?: Prisma.messageWhereInput;
    some?: Prisma.messageWhereInput;
    none?: Prisma.messageWhereInput;
};
export type messageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MessageNullableScalarRelationFilter = {
    is?: Prisma.messageWhereInput | null;
    isNot?: Prisma.messageWhereInput | null;
};
export type messageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    userKey?: Prisma.SortOrder;
    coinId?: Prisma.SortOrder;
    referencedMessageId?: Prisma.SortOrder;
    dateTime?: Prisma.SortOrder;
};
export type messageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    userKey?: Prisma.SortOrder;
    coinId?: Prisma.SortOrder;
    referencedMessageId?: Prisma.SortOrder;
    dateTime?: Prisma.SortOrder;
};
export type messageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    userKey?: Prisma.SortOrder;
    coinId?: Prisma.SortOrder;
    referencedMessageId?: Prisma.SortOrder;
    dateTime?: Prisma.SortOrder;
};
export type MessageScalarRelationFilter = {
    is?: Prisma.messageWhereInput;
    isNot?: Prisma.messageWhereInput;
};
export type messageCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutUserInput, Prisma.messageUncheckedCreateWithoutUserInput> | Prisma.messageCreateWithoutUserInput[] | Prisma.messageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutUserInput | Prisma.messageCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.messageCreateManyUserInputEnvelope;
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
};
export type messageUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutUserInput, Prisma.messageUncheckedCreateWithoutUserInput> | Prisma.messageCreateWithoutUserInput[] | Prisma.messageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutUserInput | Prisma.messageCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.messageCreateManyUserInputEnvelope;
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
};
export type messageUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutUserInput, Prisma.messageUncheckedCreateWithoutUserInput> | Prisma.messageCreateWithoutUserInput[] | Prisma.messageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutUserInput | Prisma.messageCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.messageUpsertWithWhereUniqueWithoutUserInput | Prisma.messageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.messageCreateManyUserInputEnvelope;
    set?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    disconnect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    delete?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    update?: Prisma.messageUpdateWithWhereUniqueWithoutUserInput | Prisma.messageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.messageUpdateManyWithWhereWithoutUserInput | Prisma.messageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.messageScalarWhereInput | Prisma.messageScalarWhereInput[];
};
export type messageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutUserInput, Prisma.messageUncheckedCreateWithoutUserInput> | Prisma.messageCreateWithoutUserInput[] | Prisma.messageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutUserInput | Prisma.messageCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.messageUpsertWithWhereUniqueWithoutUserInput | Prisma.messageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.messageCreateManyUserInputEnvelope;
    set?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    disconnect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    delete?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    update?: Prisma.messageUpdateWithWhereUniqueWithoutUserInput | Prisma.messageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.messageUpdateManyWithWhereWithoutUserInput | Prisma.messageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.messageScalarWhereInput | Prisma.messageScalarWhereInput[];
};
export type messageCreateNestedManyWithoutCoinInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutCoinInput, Prisma.messageUncheckedCreateWithoutCoinInput> | Prisma.messageCreateWithoutCoinInput[] | Prisma.messageUncheckedCreateWithoutCoinInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutCoinInput | Prisma.messageCreateOrConnectWithoutCoinInput[];
    createMany?: Prisma.messageCreateManyCoinInputEnvelope;
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
};
export type messageUncheckedCreateNestedManyWithoutCoinInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutCoinInput, Prisma.messageUncheckedCreateWithoutCoinInput> | Prisma.messageCreateWithoutCoinInput[] | Prisma.messageUncheckedCreateWithoutCoinInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutCoinInput | Prisma.messageCreateOrConnectWithoutCoinInput[];
    createMany?: Prisma.messageCreateManyCoinInputEnvelope;
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
};
export type messageUpdateManyWithoutCoinNestedInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutCoinInput, Prisma.messageUncheckedCreateWithoutCoinInput> | Prisma.messageCreateWithoutCoinInput[] | Prisma.messageUncheckedCreateWithoutCoinInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutCoinInput | Prisma.messageCreateOrConnectWithoutCoinInput[];
    upsert?: Prisma.messageUpsertWithWhereUniqueWithoutCoinInput | Prisma.messageUpsertWithWhereUniqueWithoutCoinInput[];
    createMany?: Prisma.messageCreateManyCoinInputEnvelope;
    set?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    disconnect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    delete?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    update?: Prisma.messageUpdateWithWhereUniqueWithoutCoinInput | Prisma.messageUpdateWithWhereUniqueWithoutCoinInput[];
    updateMany?: Prisma.messageUpdateManyWithWhereWithoutCoinInput | Prisma.messageUpdateManyWithWhereWithoutCoinInput[];
    deleteMany?: Prisma.messageScalarWhereInput | Prisma.messageScalarWhereInput[];
};
export type messageUncheckedUpdateManyWithoutCoinNestedInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutCoinInput, Prisma.messageUncheckedCreateWithoutCoinInput> | Prisma.messageCreateWithoutCoinInput[] | Prisma.messageUncheckedCreateWithoutCoinInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutCoinInput | Prisma.messageCreateOrConnectWithoutCoinInput[];
    upsert?: Prisma.messageUpsertWithWhereUniqueWithoutCoinInput | Prisma.messageUpsertWithWhereUniqueWithoutCoinInput[];
    createMany?: Prisma.messageCreateManyCoinInputEnvelope;
    set?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    disconnect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    delete?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    update?: Prisma.messageUpdateWithWhereUniqueWithoutCoinInput | Prisma.messageUpdateWithWhereUniqueWithoutCoinInput[];
    updateMany?: Prisma.messageUpdateManyWithWhereWithoutCoinInput | Prisma.messageUpdateManyWithWhereWithoutCoinInput[];
    deleteMany?: Prisma.messageScalarWhereInput | Prisma.messageScalarWhereInput[];
};
export type messageCreateNestedOneWithoutRefereesInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutRefereesInput, Prisma.messageUncheckedCreateWithoutRefereesInput>;
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutRefereesInput;
    connect?: Prisma.messageWhereUniqueInput;
};
export type messageCreateNestedManyWithoutReferencedMessageInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutReferencedMessageInput, Prisma.messageUncheckedCreateWithoutReferencedMessageInput> | Prisma.messageCreateWithoutReferencedMessageInput[] | Prisma.messageUncheckedCreateWithoutReferencedMessageInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutReferencedMessageInput | Prisma.messageCreateOrConnectWithoutReferencedMessageInput[];
    createMany?: Prisma.messageCreateManyReferencedMessageInputEnvelope;
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
};
export type messageUncheckedCreateNestedManyWithoutReferencedMessageInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutReferencedMessageInput, Prisma.messageUncheckedCreateWithoutReferencedMessageInput> | Prisma.messageCreateWithoutReferencedMessageInput[] | Prisma.messageUncheckedCreateWithoutReferencedMessageInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutReferencedMessageInput | Prisma.messageCreateOrConnectWithoutReferencedMessageInput[];
    createMany?: Prisma.messageCreateManyReferencedMessageInputEnvelope;
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
};
export type messageUpdateOneWithoutRefereesNestedInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutRefereesInput, Prisma.messageUncheckedCreateWithoutRefereesInput>;
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutRefereesInput;
    upsert?: Prisma.messageUpsertWithoutRefereesInput;
    disconnect?: Prisma.messageWhereInput | boolean;
    delete?: Prisma.messageWhereInput | boolean;
    connect?: Prisma.messageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.messageUpdateToOneWithWhereWithoutRefereesInput, Prisma.messageUpdateWithoutRefereesInput>, Prisma.messageUncheckedUpdateWithoutRefereesInput>;
};
export type messageUpdateManyWithoutReferencedMessageNestedInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutReferencedMessageInput, Prisma.messageUncheckedCreateWithoutReferencedMessageInput> | Prisma.messageCreateWithoutReferencedMessageInput[] | Prisma.messageUncheckedCreateWithoutReferencedMessageInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutReferencedMessageInput | Prisma.messageCreateOrConnectWithoutReferencedMessageInput[];
    upsert?: Prisma.messageUpsertWithWhereUniqueWithoutReferencedMessageInput | Prisma.messageUpsertWithWhereUniqueWithoutReferencedMessageInput[];
    createMany?: Prisma.messageCreateManyReferencedMessageInputEnvelope;
    set?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    disconnect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    delete?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    update?: Prisma.messageUpdateWithWhereUniqueWithoutReferencedMessageInput | Prisma.messageUpdateWithWhereUniqueWithoutReferencedMessageInput[];
    updateMany?: Prisma.messageUpdateManyWithWhereWithoutReferencedMessageInput | Prisma.messageUpdateManyWithWhereWithoutReferencedMessageInput[];
    deleteMany?: Prisma.messageScalarWhereInput | Prisma.messageScalarWhereInput[];
};
export type messageUncheckedUpdateManyWithoutReferencedMessageNestedInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutReferencedMessageInput, Prisma.messageUncheckedCreateWithoutReferencedMessageInput> | Prisma.messageCreateWithoutReferencedMessageInput[] | Prisma.messageUncheckedCreateWithoutReferencedMessageInput[];
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutReferencedMessageInput | Prisma.messageCreateOrConnectWithoutReferencedMessageInput[];
    upsert?: Prisma.messageUpsertWithWhereUniqueWithoutReferencedMessageInput | Prisma.messageUpsertWithWhereUniqueWithoutReferencedMessageInput[];
    createMany?: Prisma.messageCreateManyReferencedMessageInputEnvelope;
    set?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    disconnect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    delete?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    connect?: Prisma.messageWhereUniqueInput | Prisma.messageWhereUniqueInput[];
    update?: Prisma.messageUpdateWithWhereUniqueWithoutReferencedMessageInput | Prisma.messageUpdateWithWhereUniqueWithoutReferencedMessageInput[];
    updateMany?: Prisma.messageUpdateManyWithWhereWithoutReferencedMessageInput | Prisma.messageUpdateManyWithWhereWithoutReferencedMessageInput[];
    deleteMany?: Prisma.messageScalarWhereInput | Prisma.messageScalarWhereInput[];
};
export type messageCreateNestedOneWithoutReferencedImageInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutReferencedImageInput, Prisma.messageUncheckedCreateWithoutReferencedImageInput>;
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutReferencedImageInput;
    connect?: Prisma.messageWhereUniqueInput;
};
export type messageUpdateOneRequiredWithoutReferencedImageNestedInput = {
    create?: Prisma.XOR<Prisma.messageCreateWithoutReferencedImageInput, Prisma.messageUncheckedCreateWithoutReferencedImageInput>;
    connectOrCreate?: Prisma.messageCreateOrConnectWithoutReferencedImageInput;
    upsert?: Prisma.messageUpsertWithoutReferencedImageInput;
    connect?: Prisma.messageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.messageUpdateToOneWithWhereWithoutReferencedImageInput, Prisma.messageUpdateWithoutReferencedImageInput>, Prisma.messageUncheckedUpdateWithoutReferencedImageInput>;
};
export type messageCreateWithoutUserInput = {
    id?: string;
    message?: string | null;
    dateTime?: Date | string;
    coin: Prisma.coinCreateNestedOneWithoutMessagesInput;
    referencedImage?: Prisma.messageImageCreateNestedOneWithoutMessageInput;
    referencedMessage?: Prisma.messageCreateNestedOneWithoutRefereesInput;
    referees?: Prisma.messageCreateNestedManyWithoutReferencedMessageInput;
};
export type messageUncheckedCreateWithoutUserInput = {
    id?: string;
    message?: string | null;
    coinId: string;
    referencedMessageId?: string | null;
    dateTime?: Date | string;
    referencedImage?: Prisma.messageImageUncheckedCreateNestedOneWithoutMessageInput;
    referees?: Prisma.messageUncheckedCreateNestedManyWithoutReferencedMessageInput;
};
export type messageCreateOrConnectWithoutUserInput = {
    where: Prisma.messageWhereUniqueInput;
    create: Prisma.XOR<Prisma.messageCreateWithoutUserInput, Prisma.messageUncheckedCreateWithoutUserInput>;
};
export type messageCreateManyUserInputEnvelope = {
    data: Prisma.messageCreateManyUserInput | Prisma.messageCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type messageUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.messageWhereUniqueInput;
    update: Prisma.XOR<Prisma.messageUpdateWithoutUserInput, Prisma.messageUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.messageCreateWithoutUserInput, Prisma.messageUncheckedCreateWithoutUserInput>;
};
export type messageUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.messageWhereUniqueInput;
    data: Prisma.XOR<Prisma.messageUpdateWithoutUserInput, Prisma.messageUncheckedUpdateWithoutUserInput>;
};
export type messageUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.messageScalarWhereInput;
    data: Prisma.XOR<Prisma.messageUpdateManyMutationInput, Prisma.messageUncheckedUpdateManyWithoutUserInput>;
};
export type messageScalarWhereInput = {
    AND?: Prisma.messageScalarWhereInput | Prisma.messageScalarWhereInput[];
    OR?: Prisma.messageScalarWhereInput[];
    NOT?: Prisma.messageScalarWhereInput | Prisma.messageScalarWhereInput[];
    id?: Prisma.StringFilter<"message"> | string;
    message?: Prisma.StringNullableFilter<"message"> | string | null;
    userKey?: Prisma.StringFilter<"message"> | string;
    coinId?: Prisma.StringFilter<"message"> | string;
    referencedMessageId?: Prisma.StringNullableFilter<"message"> | string | null;
    dateTime?: Prisma.DateTimeFilter<"message"> | Date | string;
};
export type messageCreateWithoutCoinInput = {
    id?: string;
    message?: string | null;
    dateTime?: Date | string;
    user: Prisma.userCreateNestedOneWithoutMessagesInput;
    referencedImage?: Prisma.messageImageCreateNestedOneWithoutMessageInput;
    referencedMessage?: Prisma.messageCreateNestedOneWithoutRefereesInput;
    referees?: Prisma.messageCreateNestedManyWithoutReferencedMessageInput;
};
export type messageUncheckedCreateWithoutCoinInput = {
    id?: string;
    message?: string | null;
    userKey: string;
    referencedMessageId?: string | null;
    dateTime?: Date | string;
    referencedImage?: Prisma.messageImageUncheckedCreateNestedOneWithoutMessageInput;
    referees?: Prisma.messageUncheckedCreateNestedManyWithoutReferencedMessageInput;
};
export type messageCreateOrConnectWithoutCoinInput = {
    where: Prisma.messageWhereUniqueInput;
    create: Prisma.XOR<Prisma.messageCreateWithoutCoinInput, Prisma.messageUncheckedCreateWithoutCoinInput>;
};
export type messageCreateManyCoinInputEnvelope = {
    data: Prisma.messageCreateManyCoinInput | Prisma.messageCreateManyCoinInput[];
    skipDuplicates?: boolean;
};
export type messageUpsertWithWhereUniqueWithoutCoinInput = {
    where: Prisma.messageWhereUniqueInput;
    update: Prisma.XOR<Prisma.messageUpdateWithoutCoinInput, Prisma.messageUncheckedUpdateWithoutCoinInput>;
    create: Prisma.XOR<Prisma.messageCreateWithoutCoinInput, Prisma.messageUncheckedCreateWithoutCoinInput>;
};
export type messageUpdateWithWhereUniqueWithoutCoinInput = {
    where: Prisma.messageWhereUniqueInput;
    data: Prisma.XOR<Prisma.messageUpdateWithoutCoinInput, Prisma.messageUncheckedUpdateWithoutCoinInput>;
};
export type messageUpdateManyWithWhereWithoutCoinInput = {
    where: Prisma.messageScalarWhereInput;
    data: Prisma.XOR<Prisma.messageUpdateManyMutationInput, Prisma.messageUncheckedUpdateManyWithoutCoinInput>;
};
export type messageCreateWithoutRefereesInput = {
    id?: string;
    message?: string | null;
    dateTime?: Date | string;
    coin: Prisma.coinCreateNestedOneWithoutMessagesInput;
    user: Prisma.userCreateNestedOneWithoutMessagesInput;
    referencedImage?: Prisma.messageImageCreateNestedOneWithoutMessageInput;
    referencedMessage?: Prisma.messageCreateNestedOneWithoutRefereesInput;
};
export type messageUncheckedCreateWithoutRefereesInput = {
    id?: string;
    message?: string | null;
    userKey: string;
    coinId: string;
    referencedMessageId?: string | null;
    dateTime?: Date | string;
    referencedImage?: Prisma.messageImageUncheckedCreateNestedOneWithoutMessageInput;
};
export type messageCreateOrConnectWithoutRefereesInput = {
    where: Prisma.messageWhereUniqueInput;
    create: Prisma.XOR<Prisma.messageCreateWithoutRefereesInput, Prisma.messageUncheckedCreateWithoutRefereesInput>;
};
export type messageCreateWithoutReferencedMessageInput = {
    id?: string;
    message?: string | null;
    dateTime?: Date | string;
    coin: Prisma.coinCreateNestedOneWithoutMessagesInput;
    user: Prisma.userCreateNestedOneWithoutMessagesInput;
    referencedImage?: Prisma.messageImageCreateNestedOneWithoutMessageInput;
    referees?: Prisma.messageCreateNestedManyWithoutReferencedMessageInput;
};
export type messageUncheckedCreateWithoutReferencedMessageInput = {
    id?: string;
    message?: string | null;
    userKey: string;
    coinId: string;
    dateTime?: Date | string;
    referencedImage?: Prisma.messageImageUncheckedCreateNestedOneWithoutMessageInput;
    referees?: Prisma.messageUncheckedCreateNestedManyWithoutReferencedMessageInput;
};
export type messageCreateOrConnectWithoutReferencedMessageInput = {
    where: Prisma.messageWhereUniqueInput;
    create: Prisma.XOR<Prisma.messageCreateWithoutReferencedMessageInput, Prisma.messageUncheckedCreateWithoutReferencedMessageInput>;
};
export type messageCreateManyReferencedMessageInputEnvelope = {
    data: Prisma.messageCreateManyReferencedMessageInput | Prisma.messageCreateManyReferencedMessageInput[];
    skipDuplicates?: boolean;
};
export type messageUpsertWithoutRefereesInput = {
    update: Prisma.XOR<Prisma.messageUpdateWithoutRefereesInput, Prisma.messageUncheckedUpdateWithoutRefereesInput>;
    create: Prisma.XOR<Prisma.messageCreateWithoutRefereesInput, Prisma.messageUncheckedCreateWithoutRefereesInput>;
    where?: Prisma.messageWhereInput;
};
export type messageUpdateToOneWithWhereWithoutRefereesInput = {
    where?: Prisma.messageWhereInput;
    data: Prisma.XOR<Prisma.messageUpdateWithoutRefereesInput, Prisma.messageUncheckedUpdateWithoutRefereesInput>;
};
export type messageUpdateWithoutRefereesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coin?: Prisma.coinUpdateOneRequiredWithoutMessagesNestedInput;
    user?: Prisma.userUpdateOneRequiredWithoutMessagesNestedInput;
    referencedImage?: Prisma.messageImageUpdateOneWithoutMessageNestedInput;
    referencedMessage?: Prisma.messageUpdateOneWithoutRefereesNestedInput;
};
export type messageUncheckedUpdateWithoutRefereesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userKey?: Prisma.StringFieldUpdateOperationsInput | string;
    coinId?: Prisma.StringFieldUpdateOperationsInput | string;
    referencedMessageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referencedImage?: Prisma.messageImageUncheckedUpdateOneWithoutMessageNestedInput;
};
export type messageUpsertWithWhereUniqueWithoutReferencedMessageInput = {
    where: Prisma.messageWhereUniqueInput;
    update: Prisma.XOR<Prisma.messageUpdateWithoutReferencedMessageInput, Prisma.messageUncheckedUpdateWithoutReferencedMessageInput>;
    create: Prisma.XOR<Prisma.messageCreateWithoutReferencedMessageInput, Prisma.messageUncheckedCreateWithoutReferencedMessageInput>;
};
export type messageUpdateWithWhereUniqueWithoutReferencedMessageInput = {
    where: Prisma.messageWhereUniqueInput;
    data: Prisma.XOR<Prisma.messageUpdateWithoutReferencedMessageInput, Prisma.messageUncheckedUpdateWithoutReferencedMessageInput>;
};
export type messageUpdateManyWithWhereWithoutReferencedMessageInput = {
    where: Prisma.messageScalarWhereInput;
    data: Prisma.XOR<Prisma.messageUpdateManyMutationInput, Prisma.messageUncheckedUpdateManyWithoutReferencedMessageInput>;
};
export type messageCreateWithoutReferencedImageInput = {
    id?: string;
    message?: string | null;
    dateTime?: Date | string;
    coin: Prisma.coinCreateNestedOneWithoutMessagesInput;
    user: Prisma.userCreateNestedOneWithoutMessagesInput;
    referencedMessage?: Prisma.messageCreateNestedOneWithoutRefereesInput;
    referees?: Prisma.messageCreateNestedManyWithoutReferencedMessageInput;
};
export type messageUncheckedCreateWithoutReferencedImageInput = {
    id?: string;
    message?: string | null;
    userKey: string;
    coinId: string;
    referencedMessageId?: string | null;
    dateTime?: Date | string;
    referees?: Prisma.messageUncheckedCreateNestedManyWithoutReferencedMessageInput;
};
export type messageCreateOrConnectWithoutReferencedImageInput = {
    where: Prisma.messageWhereUniqueInput;
    create: Prisma.XOR<Prisma.messageCreateWithoutReferencedImageInput, Prisma.messageUncheckedCreateWithoutReferencedImageInput>;
};
export type messageUpsertWithoutReferencedImageInput = {
    update: Prisma.XOR<Prisma.messageUpdateWithoutReferencedImageInput, Prisma.messageUncheckedUpdateWithoutReferencedImageInput>;
    create: Prisma.XOR<Prisma.messageCreateWithoutReferencedImageInput, Prisma.messageUncheckedCreateWithoutReferencedImageInput>;
    where?: Prisma.messageWhereInput;
};
export type messageUpdateToOneWithWhereWithoutReferencedImageInput = {
    where?: Prisma.messageWhereInput;
    data: Prisma.XOR<Prisma.messageUpdateWithoutReferencedImageInput, Prisma.messageUncheckedUpdateWithoutReferencedImageInput>;
};
export type messageUpdateWithoutReferencedImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coin?: Prisma.coinUpdateOneRequiredWithoutMessagesNestedInput;
    user?: Prisma.userUpdateOneRequiredWithoutMessagesNestedInput;
    referencedMessage?: Prisma.messageUpdateOneWithoutRefereesNestedInput;
    referees?: Prisma.messageUpdateManyWithoutReferencedMessageNestedInput;
};
export type messageUncheckedUpdateWithoutReferencedImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userKey?: Prisma.StringFieldUpdateOperationsInput | string;
    coinId?: Prisma.StringFieldUpdateOperationsInput | string;
    referencedMessageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referees?: Prisma.messageUncheckedUpdateManyWithoutReferencedMessageNestedInput;
};
export type messageCreateManyUserInput = {
    id?: string;
    message?: string | null;
    coinId: string;
    referencedMessageId?: string | null;
    dateTime?: Date | string;
};
export type messageUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coin?: Prisma.coinUpdateOneRequiredWithoutMessagesNestedInput;
    referencedImage?: Prisma.messageImageUpdateOneWithoutMessageNestedInput;
    referencedMessage?: Prisma.messageUpdateOneWithoutRefereesNestedInput;
    referees?: Prisma.messageUpdateManyWithoutReferencedMessageNestedInput;
};
export type messageUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coinId?: Prisma.StringFieldUpdateOperationsInput | string;
    referencedMessageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referencedImage?: Prisma.messageImageUncheckedUpdateOneWithoutMessageNestedInput;
    referees?: Prisma.messageUncheckedUpdateManyWithoutReferencedMessageNestedInput;
};
export type messageUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coinId?: Prisma.StringFieldUpdateOperationsInput | string;
    referencedMessageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type messageCreateManyCoinInput = {
    id?: string;
    message?: string | null;
    userKey: string;
    referencedMessageId?: string | null;
    dateTime?: Date | string;
};
export type messageUpdateWithoutCoinInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.userUpdateOneRequiredWithoutMessagesNestedInput;
    referencedImage?: Prisma.messageImageUpdateOneWithoutMessageNestedInput;
    referencedMessage?: Prisma.messageUpdateOneWithoutRefereesNestedInput;
    referees?: Prisma.messageUpdateManyWithoutReferencedMessageNestedInput;
};
export type messageUncheckedUpdateWithoutCoinInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userKey?: Prisma.StringFieldUpdateOperationsInput | string;
    referencedMessageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referencedImage?: Prisma.messageImageUncheckedUpdateOneWithoutMessageNestedInput;
    referees?: Prisma.messageUncheckedUpdateManyWithoutReferencedMessageNestedInput;
};
export type messageUncheckedUpdateManyWithoutCoinInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userKey?: Prisma.StringFieldUpdateOperationsInput | string;
    referencedMessageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type messageCreateManyReferencedMessageInput = {
    id?: string;
    message?: string | null;
    userKey: string;
    coinId: string;
    dateTime?: Date | string;
};
export type messageUpdateWithoutReferencedMessageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coin?: Prisma.coinUpdateOneRequiredWithoutMessagesNestedInput;
    user?: Prisma.userUpdateOneRequiredWithoutMessagesNestedInput;
    referencedImage?: Prisma.messageImageUpdateOneWithoutMessageNestedInput;
    referees?: Prisma.messageUpdateManyWithoutReferencedMessageNestedInput;
};
export type messageUncheckedUpdateWithoutReferencedMessageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userKey?: Prisma.StringFieldUpdateOperationsInput | string;
    coinId?: Prisma.StringFieldUpdateOperationsInput | string;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referencedImage?: Prisma.messageImageUncheckedUpdateOneWithoutMessageNestedInput;
    referees?: Prisma.messageUncheckedUpdateManyWithoutReferencedMessageNestedInput;
};
export type messageUncheckedUpdateManyWithoutReferencedMessageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userKey?: Prisma.StringFieldUpdateOperationsInput | string;
    coinId?: Prisma.StringFieldUpdateOperationsInput | string;
    dateTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type MessageCountOutputType
 */
export type MessageCountOutputType = {
    referees: number;
};
export type MessageCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    referees?: boolean | MessageCountOutputTypeCountRefereesArgs;
};
/**
 * MessageCountOutputType without action
 */
export type MessageCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageCountOutputType
     */
    select?: Prisma.MessageCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * MessageCountOutputType without action
 */
export type MessageCountOutputTypeCountRefereesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.messageWhereInput;
};
export type messageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    message?: boolean;
    userKey?: boolean;
    coinId?: boolean;
    referencedMessageId?: boolean;
    dateTime?: boolean;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    referencedImage?: boolean | Prisma.message$referencedImageArgs<ExtArgs>;
    referencedMessage?: boolean | Prisma.message$referencedMessageArgs<ExtArgs>;
    referees?: boolean | Prisma.message$refereesArgs<ExtArgs>;
    _count?: boolean | Prisma.MessageCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["message"]>;
export type messageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    message?: boolean;
    userKey?: boolean;
    coinId?: boolean;
    referencedMessageId?: boolean;
    dateTime?: boolean;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    referencedMessage?: boolean | Prisma.message$referencedMessageArgs<ExtArgs>;
}, ExtArgs["result"]["message"]>;
export type messageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    message?: boolean;
    userKey?: boolean;
    coinId?: boolean;
    referencedMessageId?: boolean;
    dateTime?: boolean;
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    referencedMessage?: boolean | Prisma.message$referencedMessageArgs<ExtArgs>;
}, ExtArgs["result"]["message"]>;
export type messageSelectScalar = {
    id?: boolean;
    message?: boolean;
    userKey?: boolean;
    coinId?: boolean;
    referencedMessageId?: boolean;
    dateTime?: boolean;
};
export type messageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "message" | "userKey" | "coinId" | "referencedMessageId" | "dateTime", ExtArgs["result"]["message"]>;
export type messageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    referencedImage?: boolean | Prisma.message$referencedImageArgs<ExtArgs>;
    referencedMessage?: boolean | Prisma.message$referencedMessageArgs<ExtArgs>;
    referees?: boolean | Prisma.message$refereesArgs<ExtArgs>;
    _count?: boolean | Prisma.MessageCountOutputTypeDefaultArgs<ExtArgs>;
};
export type messageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    referencedMessage?: boolean | Prisma.message$referencedMessageArgs<ExtArgs>;
};
export type messageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coin?: boolean | Prisma.coinDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.userDefaultArgs<ExtArgs>;
    referencedMessage?: boolean | Prisma.message$referencedMessageArgs<ExtArgs>;
};
export type $messagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "message";
    objects: {
        coin: Prisma.$coinPayload<ExtArgs>;
        user: Prisma.$userPayload<ExtArgs>;
        referencedImage: Prisma.$messageImagePayload<ExtArgs> | null;
        referencedMessage: Prisma.$messagePayload<ExtArgs> | null;
        referees: Prisma.$messagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        message: string | null;
        userKey: string;
        coinId: string;
        referencedMessageId: string | null;
        dateTime: Date;
    }, ExtArgs["result"]["message"]>;
    composites: {};
};
export type messageGetPayload<S extends boolean | null | undefined | messageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$messagePayload, S>;
export type messageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<messageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MessageCountAggregateInputType | true;
};
export interface messageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['message'];
        meta: {
            name: 'message';
        };
    };
    /**
     * Find zero or one Message that matches the filter.
     * @param {messageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends messageFindUniqueArgs>(args: Prisma.SelectSubset<T, messageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__messageClient<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {messageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends messageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, messageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__messageClient<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends messageFindFirstArgs>(args?: Prisma.SelectSubset<T, messageFindFirstArgs<ExtArgs>>): Prisma.Prisma__messageClient<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends messageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, messageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__messageClient<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     *
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     *
     */
    findMany<T extends messageFindManyArgs>(args?: Prisma.SelectSubset<T, messageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Message.
     * @param {messageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     *
     */
    create<T extends messageCreateArgs>(args: Prisma.SelectSubset<T, messageCreateArgs<ExtArgs>>): Prisma.Prisma__messageClient<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Messages.
     * @param {messageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends messageCreateManyArgs>(args?: Prisma.SelectSubset<T, messageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Messages and returns the data saved in the database.
     * @param {messageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends messageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, messageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Message.
     * @param {messageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     *
     */
    delete<T extends messageDeleteArgs>(args: Prisma.SelectSubset<T, messageDeleteArgs<ExtArgs>>): Prisma.Prisma__messageClient<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Message.
     * @param {messageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends messageUpdateArgs>(args: Prisma.SelectSubset<T, messageUpdateArgs<ExtArgs>>): Prisma.Prisma__messageClient<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Messages.
     * @param {messageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends messageDeleteManyArgs>(args?: Prisma.SelectSubset<T, messageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends messageUpdateManyArgs>(args: Prisma.SelectSubset<T, messageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {messageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
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
    updateManyAndReturn<T extends messageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, messageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Message.
     * @param {messageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends messageUpsertArgs>(args: Prisma.SelectSubset<T, messageUpsertArgs<ExtArgs>>): Prisma.Prisma__messageClient<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends messageCountArgs>(args?: Prisma.Subset<T, messageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MessageCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MessageAggregateArgs>(args: Prisma.Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>;
    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messageGroupByArgs} args - Group by arguments.
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
    groupBy<T extends messageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: messageGroupByArgs['orderBy'];
    } : {
        orderBy?: messageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, messageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the message model
     */
    readonly fields: messageFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for message.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__messageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    coin<T extends Prisma.coinDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.coinDefaultArgs<ExtArgs>>): Prisma.Prisma__coinClient<runtime.Types.Result.GetResult<Prisma.$coinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.userDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.userDefaultArgs<ExtArgs>>): Prisma.Prisma__userClient<runtime.Types.Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    referencedImage<T extends Prisma.message$referencedImageArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.message$referencedImageArgs<ExtArgs>>): Prisma.Prisma__messageImageClient<runtime.Types.Result.GetResult<Prisma.$messageImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    referencedMessage<T extends Prisma.message$referencedMessageArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.message$referencedMessageArgs<ExtArgs>>): Prisma.Prisma__messageClient<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    referees<T extends Prisma.message$refereesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.message$refereesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$messagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the message model
 */
export interface messageFieldRefs {
    readonly id: Prisma.FieldRef<"message", 'String'>;
    readonly message: Prisma.FieldRef<"message", 'String'>;
    readonly userKey: Prisma.FieldRef<"message", 'String'>;
    readonly coinId: Prisma.FieldRef<"message", 'String'>;
    readonly referencedMessageId: Prisma.FieldRef<"message", 'String'>;
    readonly dateTime: Prisma.FieldRef<"message", 'DateTime'>;
}
/**
 * message findUnique
 */
export type messageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which message to fetch.
     */
    where: Prisma.messageWhereUniqueInput;
};
/**
 * message findUniqueOrThrow
 */
export type messageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which message to fetch.
     */
    where: Prisma.messageWhereUniqueInput;
};
/**
 * message findFirst
 */
export type messageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which message to fetch.
     */
    where?: Prisma.messageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of messages to fetch.
     */
    orderBy?: Prisma.messageOrderByWithRelationInput | Prisma.messageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for messages.
     */
    cursor?: Prisma.messageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of messages.
     */
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
/**
 * message findFirstOrThrow
 */
export type messageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which message to fetch.
     */
    where?: Prisma.messageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of messages to fetch.
     */
    orderBy?: Prisma.messageOrderByWithRelationInput | Prisma.messageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for messages.
     */
    cursor?: Prisma.messageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of messages.
     */
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
/**
 * message findMany
 */
export type messageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which messages to fetch.
     */
    where?: Prisma.messageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of messages to fetch.
     */
    orderBy?: Prisma.messageOrderByWithRelationInput | Prisma.messageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing messages.
     */
    cursor?: Prisma.messageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` messages.
     */
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
/**
 * message create
 */
export type messageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a message.
     */
    data: Prisma.XOR<Prisma.messageCreateInput, Prisma.messageUncheckedCreateInput>;
};
/**
 * message createMany
 */
export type messageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many messages.
     */
    data: Prisma.messageCreateManyInput | Prisma.messageCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * message createManyAndReturn
 */
export type messageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the message
     */
    select?: Prisma.messageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the message
     */
    omit?: Prisma.messageOmit<ExtArgs> | null;
    /**
     * The data used to create many messages.
     */
    data: Prisma.messageCreateManyInput | Prisma.messageCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * message update
 */
export type messageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a message.
     */
    data: Prisma.XOR<Prisma.messageUpdateInput, Prisma.messageUncheckedUpdateInput>;
    /**
     * Choose, which message to update.
     */
    where: Prisma.messageWhereUniqueInput;
};
/**
 * message updateMany
 */
export type messageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update messages.
     */
    data: Prisma.XOR<Prisma.messageUpdateManyMutationInput, Prisma.messageUncheckedUpdateManyInput>;
    /**
     * Filter which messages to update
     */
    where?: Prisma.messageWhereInput;
    /**
     * Limit how many messages to update.
     */
    limit?: number;
};
/**
 * message updateManyAndReturn
 */
export type messageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the message
     */
    select?: Prisma.messageSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the message
     */
    omit?: Prisma.messageOmit<ExtArgs> | null;
    /**
     * The data used to update messages.
     */
    data: Prisma.XOR<Prisma.messageUpdateManyMutationInput, Prisma.messageUncheckedUpdateManyInput>;
    /**
     * Filter which messages to update
     */
    where?: Prisma.messageWhereInput;
    /**
     * Limit how many messages to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.messageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * message upsert
 */
export type messageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the message to update in case it exists.
     */
    where: Prisma.messageWhereUniqueInput;
    /**
     * In case the message found by the `where` argument doesn't exist, create a new message with this data.
     */
    create: Prisma.XOR<Prisma.messageCreateInput, Prisma.messageUncheckedCreateInput>;
    /**
     * In case the message was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.messageUpdateInput, Prisma.messageUncheckedUpdateInput>;
};
/**
 * message delete
 */
export type messageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which message to delete.
     */
    where: Prisma.messageWhereUniqueInput;
};
/**
 * message deleteMany
 */
export type messageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which messages to delete
     */
    where?: Prisma.messageWhereInput;
    /**
     * Limit how many messages to delete.
     */
    limit?: number;
};
/**
 * message.referencedImage
 */
export type message$referencedImageArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.messageImageWhereInput;
};
/**
 * message.referencedMessage
 */
export type message$referencedMessageArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * message.referees
 */
export type message$refereesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * message without action
 */
export type messageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=message.d.ts.map