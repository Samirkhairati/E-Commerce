import UserOrderCard from "../../components/UserOrderCard";
import { useGetUserOrdersQuery } from "../../actions/api/ordersApiSlice";
import { useEffect } from "react";

const UserOrders = () => {
  const { data: orders, refetch, error, isLoading } = useGetUserOrdersQuery();


  useEffect(() => {
    refetch();
    console.log((orders));
  }, [refetch, orders]);

  return (
    <>
      <div className='w-full p-8 flex flex-col space-y-10'>
        { isLoading ?`Loading...` : error ? `Error: ${error.message}` :
         orders.map((order, index) => {
            return <UserOrderCard key={index} order={order} />
         })      
         }
      </div>
    </>
  );
};

export default UserOrders;
