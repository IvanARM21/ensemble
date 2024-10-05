import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { createCategory, updateCategory } from '@/actions';
import { useCategoryStore } from '@/store';
import { Alert, SpinnerWithBg } from '@/components'
import { INITIAL_ALERT } from '@/constants';
import { StepHeader } from '../StepHeader'

export const CategorySave = () => {

  const router = useRouter();
  const { reset, category, type } = useCategoryStore();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(INITIAL_ALERT);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if(!hasMounted) {
      setHasMounted(true);
      saveCategory();
    }
  }, [hasMounted]);

  const saveCategory = async () => {
    setLoading(true);

    // Execute the action according to the type
    const formData = new FormData();
    if(category.id) formData.append("id", category.id);
    formData.append("label", category.label);
    formData.append("slug", category.slug);
    formData.append("gender", category.gender ?? "");
    formData.append("type", category.type ?? "");
    formData.append("image", category.image ?? "");

    console.log(formData.get("image"));
    const result = type === "new" 
      ? await createCategory(formData) 
      : await updateCategory(formData);
    
    setLoading(false);
    setAlert(result);

    // Handle redirections and update state according to the result
    setTimeout(() => {
      if(!result.error) {
        router.replace("/dashboard/categories");
        setTimeout(() => {
          reset();
        }, 100);
      }
    }, 3000);
  }

  
  

  return (
    <>
      <StepHeader title="Save category" description="Here we save the category you have created." />
    
      {loading && 
         <SpinnerWithBg />
      }
      
      {alert.message && (
        <Alert {...alert} />
      )}
    </>
  )
}
