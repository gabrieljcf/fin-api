interface Statement {
  transactionId: string,
  description: string
  amount: number
  createdAt: Date
  type: string
}

export interface Customers {
  id: string
  name: string
  cpf: string
  statement: Statement[]
}