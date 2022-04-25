import claimItemController from "@app/controllers/claimItemController";
import checkAuth from "@app/middlewares/checkAuth";
import express from "express";

const router = express.Router();

router.get('/getClaimItems', checkAuth, claimItemController.getClaimItems);

export default router;