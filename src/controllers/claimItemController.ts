import { Request, Response } from 'express';
import responseStatus from '@app/core/responseStatus';
import claimItemRepo from '@app/database/repository/claimItemRepo';

const getClaimItems = async (req: Request, res: Response) => {
  const claimItems = await claimItemRepo.getClaimItems();
  res.status(responseStatus.SUCCESS).json(claimItems);
}

const claimItemController = {
  getClaimItems
}

export default claimItemController;