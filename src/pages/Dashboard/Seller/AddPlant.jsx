import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import AddPlantForm from '../../../components/Form/AddPlantForm';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { imageUpload } from '../.././../API/utils';
const AddPlant = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [uploadButtontext, setUpButtonText] = useState({
    name: 'Upload image',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      image: imageUrl,
      seller,
    };
    try {
      await axiosSecure.post('/Flora', plantData);
      toast.success('Data added SuccessFully');
      e.target.reset();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        setUpButtonText={setUpButtonText}
        uploadButtontext={uploadButtontext}
        loading={loading}
      />
    </div>
  );
};

export default AddPlant;
