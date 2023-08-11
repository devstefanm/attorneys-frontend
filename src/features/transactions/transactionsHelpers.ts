export const mapTypeToBorderColor = (type: string) => {
  switch (type) {
    case 'payment':
      return '#93c5fd';
    case 'fee':
      return '#fde047';
    case 'legal_fee':
      return '#f97316';
    default:
      return '#6b7280';
  }
};
