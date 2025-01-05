import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from '../Shared/Container';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Card from './Card';

const Plants = () => {
  const { data, isLoading } = useQuery({
    key: ['FloraSphere'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/flora`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;


  return (
    <Container>
      {data && data.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {data.map(flora => (
            <Card key={flora._id} flora={flora} />
          ))}
        </div>
      ) : (
        <p>No data Available</p>
      )}
    </Container>
  );
};

export default Plants;
