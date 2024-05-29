import { useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, IconButton } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import CreateOrderModal from './CreateOrderModal';
import EditOrderModal from './EditOrderModal';

const fetchActiveOrders = async () => {
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
      paid: false,
      invoice_no: 'Invoice - 122212121',
      invoice_date: '2024-05-07'
    },
    // Add more orders if needed
  ];
};

const ActiveOrders = () => {
  const queryClient = useQueryClient();
  const { data: orders, isLoading } = useQuery('activeOrders', fetchActiveOrders);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  const handleCreateOrder = (newOrder) => {
    // Mimic API call to create order
    const updatedOrders = [...orders, newOrder];
    queryClient.setQueryData('activeOrders', updatedOrders);
    setIsCreateModalOpen(false);
  };

  const handleEditOrder = (updatedOrder) => {
    // Mimic API call to update order
    const updatedOrders = orders.map((order) => 
      order.invoice_no === updatedOrder.invoice_no ? updatedOrder : order
    );
    queryClient.setQueryData('activeOrders', updatedOrders);
    setEditOrder(null);
  };

  const handleEditModalOpen = (order) => {
    setEditOrder(order);
  };

  const handleEditModalClose = () => {
    setEditOrder(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Button leftIcon={<AddIcon />} onClick={() => setIsCreateModalOpen(true)}>
        Sale Order
      </Button>
      <CreateOrderModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSave={handleCreateOrder} />

      <Table>
        <Thead>
          <Tr>
            <Th>Customer ID</Th>
            <Th>Items</Th>
            <Th>Invoice No</Th>
            <Th>Invoice Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.invoice_no}>
              <Td>{order.customer_id}</Td>
              <Td>{order.items.map(item => `SKU: ${item.sku_id}, Qty: ${item.quantity}`).join(', ')}</Td>
              <Td>{order.invoice_no}</Td>
              <Td>{order.invoice_date}</Td>
              <Td>
                <IconButton icon={<EditIcon />} onClick={() => handleEditModalOpen(order)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
      {editOrder && (
        <EditOrderModal 
          isOpen={Boolean(editOrder)} 
          onClose={handleEditModalClose} 
          order={editOrder} 
          onSave={handleEditOrder} 
        />
      )}
    </div>
  );
};

export default ActiveOrders;
