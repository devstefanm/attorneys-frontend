export const mapStatusToBorderColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'green-500';
    case 'closed':
      return 'gray-400';
    default:
      return '';
  }
};
