import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { createProduct } from "@/actions";
import { useProductStore } from "@/store";
import { Alert, SpinnerWithBg } from "@/components";
import { INITIAL_ALERT } from "@/constants";
import { StepHeader } from "../StepHeader";

export const ProductSave = () => {

  const router = useRouter();  
  const { reset, product } = useProductStore();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(INITIAL_ALERT);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if(!hasMounted) {
        setHasMounted(true);
        saveProduct();
    }
  }, [hasMounted]);

  console.log(product);

  const saveProduct = async () => {
    setLoading(true);

    // Execute the action according to the type
    const result = await createProduct(product);

    setLoading(false);
    setAlert({...result});

    // Handle redirections and update state according to the result
    setTimeout(() => {
        if(!result.error && result.id) {
            router.replace(`/dashboard/products/show/${result.id}`);
            setTimeout(() => {
                reset();
            }, 100);
        }
    }, 3000);
  }

  return (
    <>
        <StepHeader title="Save product" description="Here we save the product you have created." />

        {loading &&
            <SpinnerWithBg />
        }

        {alert.message && (
            <Alert {...alert} />
        )}
    </>
  )
}
