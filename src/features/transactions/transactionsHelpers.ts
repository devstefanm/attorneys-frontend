export const mapTypeToBorderColor = (type: string) => {
  switch (type) {
    case 'payment':
      return 'blue-300';
    case 'fee':
      return 'yellow-300';
    case 'legal_fee':
      return 'orange-500';
    default:
      return 'gray-500';
  }
};
