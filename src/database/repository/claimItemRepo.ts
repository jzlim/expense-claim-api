import ClaimItem, { ClaimItemModel} from "../model/ClaimItem";

const getClaimItems = async (): Promise<ClaimItem> => {
  try {
    const claimItems = await ClaimItemModel.find({ isDeleted: false }).lean<ClaimItem>();
    return claimItems;
  } catch (error) {
    throw error;
  }
}

const claimItemRepo = {
  getClaimItems
}

export default claimItemRepo;