import { Request, Response } from "express";
import { router } from "./SingleRouter";
import { prisma } from "@repo/database/client";

const PAGE_SIZE = 20;

router.get("/comments/:coinAddress", async (req: Request, res: Response) => {
    try {
        const { coinAddress } = req.params;
        const page = Math.max(1, Number(req.query.page) || 1);
        const sortOrder = (req.query.sort as string)?.toLowerCase() === "oldest" ? "oldest" : "newest";

        // Validate coin exists
        const coin = await prisma.coin.findFirst({
            where: { address: coinAddress as string }
        });

        if (!coin) {
            res.status(404).json({
                success: false,
                message: "Coin not found"
            });
            
            return;
        }

       

        // Calculate pagination
        const skip = (page - 1) * PAGE_SIZE;

        // Fetch total count
        const totalComments = await (prisma as any).message.count({
            where: {
                coinId: coinAddress as string,
                referencedMessageId: null 
            }
        });

        // Fetch comments with pagination
        const comments = await (prisma as any).message.findMany({
            where: {
                coinId: coinAddress as string,
                referencedMessageId: null 
            },
            include: {
                user: {
                    select: {
                        publicKey: true,
                        name: true
                    }
                },
                referencedImage: true,
                referees: {
                    take: 5,
                    include: {
                        user: {
                            select: {
                                publicKey: true,
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                dateTime: sortOrder === "oldest" ? "asc" : "desc"
            },
            skip,
            take: PAGE_SIZE
        });

        const totalPages = Math.ceil(totalComments / PAGE_SIZE);

        res.status(200).json({
            success: true,
            data: {
                comments,
                pagination: {
                    currentPage: page,
                    pageSize: PAGE_SIZE,
                    totalComments,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1
                },
                sortOrder
            }
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching comments"
        });
    }
});





router.get("/comments/replies/:messageId", async (req: Request, res: Response) => {
    try {
        const { messageId } = req.params;
        const page = Math.max(1, Number(req.query.page) || 1);
        const sortOrder = (req.query.sort as string)?.toLowerCase() === "oldest" ? "oldest" : "newest";

        // Validate parent message exists
        const parentMessage = await (prisma as any).message.findUnique({
            where: { id: messageId }
        });

        if (!parentMessage) {
            res.status(404).json({
                success: false,
                message: "Parent message not found"
            });
            return;
        }

        // Calculate pagination
        const skip = (page - 1) * PAGE_SIZE;

        // Fetch total count of replies
        const totalReplies = await (prisma as any).message.count({
            where: {
                referencedMessageId: messageId
            }
        });

        // Fetch replies with pagination
        const replies = await (prisma as any).message.findMany({
            where: {
                referencedMessageId: messageId
            },
            include: {
                user: {
                    select: {
                        publicKey: true,
                        name: true
                    }
                },
                referencedImage: true,
                referees: {
                    take: 5,
                    include: {
                        user: {
                            select: {
                                publicKey: true,
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                dateTime: sortOrder === "oldest" ? "asc" : "desc"
            },
            skip,
            take: PAGE_SIZE
        });

        const totalPages = Math.ceil(totalReplies / PAGE_SIZE);

        res.status(200).json({
            success: true,
            data: {
                replies,
                pagination: {
                    currentPage: page,
                    pageSize: PAGE_SIZE,
                    totalReplies,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1
                },
                sortOrder
            }
        });
    } catch (error) {
        console.error("Error fetching replies:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching replies"
        });
    }
});

