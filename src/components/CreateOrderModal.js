import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const CreateOrderModal = ({ isOpen, onClose, onSave }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    try {
      data.items = JSON.parse(data.items); // Ensure items are parsed correctly
    } catch (e) {
      alert('Items should be a valid JSON string.');
      return;
    }
    onSave(data); // Call the save handler
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="create-order-form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Customer ID</FormLabel>
              <Input {...register('customer_id', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Items (JSON format)</FormLabel>
              <Input {...register('items', { required: true })} />
              <FormHelperText>
                Enter items in JSON format. Example: {'[{"sku_id": 123, "price": 100, "quantity": 2}]'}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Paid</FormLabel>
              <Input type="checkbox" {...register('paid')} />
            </FormControl>
            <FormControl>
              <FormLabel>Invoice No</FormLabel>
              <Input {...register('invoice_no', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Invoice Date</FormLabel>
              <Input {...register('invoice_date', { required: true })} type="date" />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" form="create-order-form" type="submit">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateOrderModal;
  