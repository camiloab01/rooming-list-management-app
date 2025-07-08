const roomStatusMap: Record<string, string> = {
  received: 'Active',
  completed: 'Closed',
  archived: 'Cancelled',
}

export const roomStatusMapper = (status: string): string =>
  roomStatusMap[status] ?? ''
