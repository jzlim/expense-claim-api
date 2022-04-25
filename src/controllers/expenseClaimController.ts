import { Request, Response } from 'express';
import responseStatus from '@app/core/responseStatus';
import expenseClaimRepo from '@app/database/repository/expenseClaimRepo';

const getAllExpenseClaims = async (req: Request, res: Response) => {
  const expenseClaims = await expenseClaimRepo.getAllExpenseClaims(req.body.userId);
  res.status(responseStatus.SUCCESS).json(expenseClaims);
}

const getExpenseClaimById = async (req: Request, res: Response) => {
  const expenseClaim = await expenseClaimRepo.getExpenseClaimById(req.body.expenseClaimId);
  res.status(responseStatus.SUCCESS).json(expenseClaim);
}

const deleteExpenseClaim = async (req: Request, res: Response) => {
  const deletedExpenseClaim = await expenseClaimRepo.deleteExpenseClaim(req.body.expenseClaimId);
  if (deletedExpenseClaim) {
    res.status(responseStatus.SUCCESS).json(deletedExpenseClaim);
  } else {
    res.status(responseStatus.INTERNAL_ERROR);
  }
}

const saveExpenseClaim = async (req: Request, res: Response) => {
  const savedExpenseClaim = await expenseClaimRepo.saveExpenseClaim(req.body.expenseClaim);
  if (!!savedExpenseClaim) {
    res.status(responseStatus.SUCCESS).json(savedExpenseClaim);
  } else {
    res.status(responseStatus.INTERNAL_ERROR);
  }
}

const expenseClaimController = {
  getAllExpenseClaims,
  getExpenseClaimById,
  deleteExpenseClaim,
  saveExpenseClaim
}

export default expenseClaimController;