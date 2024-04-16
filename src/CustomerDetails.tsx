import React from 'react';
import PhotoGrid from './PhotoGrid';

interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
  photos: string[];
}

interface CustomerDetailsProps {
  customer: Customer | null;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  if (!customer) {
    return <div>Please select a customer</div>;
  }

  return (
    <div className="customer-details">
     <h2 style={{ textAlign: 'center' }}>{customer.name}</h2>
      <h3 style={{ textAlign: 'center' }}>{customer.title}</h3>
      <p style={{ textAlign: 'center' }}>{customer.address}</p>
      <PhotoGrid photos={customer.photos} />
    </div>
  );
};

export default CustomerDetails;
