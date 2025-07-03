//TODO: Refactor this
export const roomStatusMapper = (status: string): string => {
  let mappedStatus = ''
  switch (status) {
    case 'received':
      mappedStatus = 'Active'
      break
    case 'completed':
      mappedStatus = 'Closed'
      break
    case 'archived':
      mappedStatus = 'Cancelled'
      break
  }
  return mappedStatus
}
