// src/pages/SaleOrdersPage.js
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ActiveOrders from '../components/ActiveOrders';
import CompletedOrders from '../components/CompletedOrders';
import ThemeToggle from '../components/ThemeToogle';

const SaleOrdersPage = () => {
  return (
    <div>
      <ThemeToggle />
      <Tabs>
        <TabList>
          <Tab>Active Orders</Tab>
          <Tab>Completed Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ActiveOrders />
          </TabPanel>
          <TabPanel>
            <CompletedOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default SaleOrdersPage;
