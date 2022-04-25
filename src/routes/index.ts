import responseStatus from "@app/core/responseStatus";
import express from "express";
import claimItemRoute from "./claimItemRoute";
import expenseClaimRoute from "./expenseClaimRoute";
import userRoute from "./userRoute";

const router = express.Router();

router.use('/ping', (req, res) => {
    res.status(responseStatus.SUCCESS).json({message: 'Ping success'});
});
router.use('/user', userRoute);
router.use('/expenseClaim', expenseClaimRoute);
router.use('/claimItem', claimItemRoute);

export default router;