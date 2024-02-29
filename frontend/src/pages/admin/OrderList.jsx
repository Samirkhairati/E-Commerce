import OrderCard from "../../components/OrderCard";
import { useGetAllOrdersQuery } from "../../actions/api/ordersApiSlice";
import { useEffect } from "react";

const AdminOrders = () => {
  const { data: orders, refetch, error, isLoading } = useGetAllOrdersQuery();


  useEffect(() => {
    refetch();
    console.log((orders));
  }, [refetch, orders]);

  return (
    <>
      <div className='w-full p-8 flex flex-col space-y-10'>
        { isLoading ?`Loading...` : error ? `Error: ${error.message}` :
         orders.map((order, index) => {
            return <OrderCard key={index} order={order} />
         })      
         }
      </div>
    </>
  );
};

export default AdminOrders;
