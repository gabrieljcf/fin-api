declare namespace Express {
  interface Statement {
    transactionId: string,
    description: string
    amount: number
    createdAt: Date
    type: string
  }
  export interface Request {
    customer: {
      id: string
      name: string
      cpf: string
      statement: Statement[]
    }
  }
}