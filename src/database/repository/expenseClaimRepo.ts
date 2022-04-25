import ExpenseClaim, { ExpenseClaimModel} from "../model/ExpenseClaim";

// GetAllExpenseClaims
const getAllExpenseClaims = async (userId: string): Promise<ExpenseClaim[]> => {
  try {
    const expenseClaims = await ExpenseClaimModel.find({ userId, isDeleted: false })
                                .lean<ExpenseClaim[]>();

    // calculate total amount
    if (expenseClaims.length) {
      expenseClaims.forEach(expenseClaim => {
        if (expenseClaim?.expenseClaimLines?.length) {
          expenseClaim.totalAmount = expenseClaim.expenseClaimLines.reduce((prev, item) => prev + item.totalAmount, 0);
        }
      })
    }

    return expenseClaims;
  } catch (error) {
    throw error;
  }
}

// GetExpenseClaimById
const getExpenseClaimById = async (expenseClaimId: string): Promise<ExpenseClaim> => {
  try {
    const expenseClaim = await ExpenseClaimModel.findOne({ _id: expenseClaimId, isDeleted: false })
                               .populate('ExpenseClaimLine')
                               .lean<ExpenseClaim>();
    return expenseClaim;
  } catch (error) {
    throw error;
  }
}

// DeleteExpenseClaim
const deleteExpenseClaim = async (expenseClaimId: string): Promise<ExpenseClaim> => {
  try {
    const expenseClaim = await getExpenseClaimById(expenseClaimId);
    if (!expenseClaim || !expenseClaim?._id) {
      throw new Error('No Expense Claim found.');
    }
    const deletedExpenseClaim = await ExpenseClaimModel.findByIdAndUpdate(expenseClaim._id, {
      $set: {
        isDeleted: true,
        updatedAt: new Date()
      }
    }).lean();
    return deletedExpenseClaim as ExpenseClaim;
  } catch (error) {
    throw error;
  }
}


// SaveExpenseClaim (assume any modification on line won’t updated until clicking on Save in Expense Claim itself)
const saveExpenseClaim = async (expenseClaim: ExpenseClaim): Promise<ExpenseClaim> => {
  try {
    // assume there's only create new case
    const now = new Date();
    expenseClaim.createdAt = now;
    expenseClaim.updatedAt = now;
    const createdExpenseClaim = await ExpenseClaimModel.create(expenseClaim);
    return {
      _id: createdExpenseClaim._id,
      claimDate: createdExpenseClaim.claimDate,
      bankAccountName: createdExpenseClaim.bankAccountName,
      bankAccountNumber: createdExpenseClaim.bankAccountNumber,
      bankCode: createdExpenseClaim.bankCode,
      expenseClaimLines: createdExpenseClaim.expenseClaimLines
    } as ExpenseClaim;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

const expenseClaimRepo = {
  getAllExpenseClaims,
  getExpenseClaimById,
  deleteExpenseClaim,
  saveExpenseClaim
}

export default expenseClaimRepo;