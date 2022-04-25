import expenseClaimController from "@app/controllers/expenseClaimController";
import checkAuth from "@app/middlewares/checkAuth";
import express from "express";

const router = express.Router();

router.post('/getAllExpenseClaims', checkAuth, expenseClaimController.getAllExpenseClaims);
router.post('/getExpenseClaimById', checkAuth, expenseClaimController.getExpenseClaimById);
router.post('/deleteExpenseClaim', checkAuth, expenseClaimController.deleteExpenseClaim);
router.post('/saveExpenseClaim', checkAuth, expenseClaimController.saveExpenseClaim);

export default router;