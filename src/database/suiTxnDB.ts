import { query } from "../database/index";

export async function createTransaction(objectId: string, sender: string, receiver: string, amount: number, tokenType: string) {
    await query(
        `INSERT INTO SuiTxn (object_id, sender, receiver, amount, token_type, status) VALUES (?, ?, ?, ?, ?, 'pending')`,
        [objectId, sender, receiver, amount, tokenType]
    );
}

export async function getTransactionByReply(replyId: string) {
    const result = await query(
        `SELECT object_id FROM transaction_reply_mapping WHERE reply_id = ?`,
        [replyId]
    );
    if (result.length === 0) {
        throw new Error("No transaction found for this reply.");
    }
    const transaction = await query(
        `SELECT * FROM SuiTxn WHERE object_id = ?`,
        [result[0].object_id]
    );
    return transaction.length > 0 ? transaction[0] : null;
}

export async function updateTransactionStatus(objectId: string, status: string) {
    await query(
        `UPDATE SuiTxn SET status = ? WHERE object_id = ?`,
        [status, objectId]
    );
}

export async function claimTransaction(receiver: string, object_id: string) {
    const transaction = await query(
        `SELECT * FROM SuiTxn WHERE object_id = ? AND receiver = ? AND status = 'pending'`,
        [object_id, receiver]
    );

    if (transaction.length === 0) {
        throw new Error("No pending transaction found or unauthorized access.");
    }

    await updateTransactionStatus(object_id, "claimed");

    return { success: true, message: "Transaction claimed successfully." };
}