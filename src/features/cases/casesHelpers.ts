export const mapStatusToBorderColor = (status: string): string => {
  switch (status) {
    case 'active':
      return '#22c55e';
    case 'closed':
      return '#9ca3af';
    default:
      return '';
  }
};
