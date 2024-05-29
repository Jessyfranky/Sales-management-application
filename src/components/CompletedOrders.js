import { useQuery } from 'react-query'; // Import from 'react-query' instead of '@tanstack/react-query'
import { Table, Tr, Td } from '@chakra-ui/react';

const fetchCompletedOrders = async () => {
  // Mimic API call
  return [
    {
      customer_id: 11908,
      items: [
        {
          sku_id: 220,
          price: 12,
          quantity: 12
        }
      ],
      paid: true,
      invoice_no: 'Invoice - 1212121',
      invoice_date: '2024-05-07'
    },
  ];
};

const CompletedOrders = () => {
  const { data, isLoading } = useQuery({
    queryKey: 'completedOrders',
    queryFn: fetchCompletedOrders
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table>
      {data.map((order) => (
        <Tr key={order.invoice_no}>
          <Td>{order.customer_id}</Td>
          <Td>{order.items.map(item => `SKU: ${item.sku_id}, Qty: ${item.quantity}`).join(', ')}</Td>
          <Td>{order.invoice_no}</Td>
          <Td>{order.invoice_date}</Td>
        </Tr>
      ))}
    </Table>
  );
};

export default CompletedOrders;
