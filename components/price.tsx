import { Money } from 'lib/shopify/types';

const DEFAULT_CURRENCY_CODE = 'USD';

export default function Price({
  amount,
  currencyCode = DEFAULT_CURRENCY_CODE,
  ...props
}: Money & {
  currencyCode?: string;
  [key: string]: any;
}) {
  const value = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(parseFloat(amount));

  return <span {...props}>{value}</span>;
}
