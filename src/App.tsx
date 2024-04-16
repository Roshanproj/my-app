import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerList from './CustomerList';
import CustomerDetails from './CustomerDetails';

interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
  photos: string[];
}

const App: React.FC = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data: any[] = await response.json();
      const fetchedCustomers: Customer[] = data.map(user => ({
        id: user.id,
        name: user.name,
        title: user.company.name,
        address: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
        photos: Array.from({ length: 9 }, (_, index) => `https://source.unsplash.com/random/100x100?sig=${user.id + index}`)
      }));
      setCustomers(fetchedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const selectedCustomer = selectedCustomerId ? customers.find(customer => customer.id === selectedCustomerId) : null;

  return (
    <div className="app">
      <CustomerList
        customers={customers}
        selectedCustomerId={selectedCustomerId}
        onSelectCustomer={setSelectedCustomerId}
      />
      <CustomerDetails customer={selectedCustomer || null} /> 
    </div>
  );
};

export default App;
