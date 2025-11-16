import PropertyDetail from "@/components/property/PropertyDetail";
import { PROPERTYLISTINGSAMPLE } from "@/constants/index";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!property) {
    return <p>Property not found</p>;
  }

  // const property = PROPERTYLISTINGSAMPLE.find((item) => item.name === id);

  if (!property) return <p>Property not found</p>;

  return (
    <div className="">
      <PropertyDetail property={property} />
    </div>
  );
}
