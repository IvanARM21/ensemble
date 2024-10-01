import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Size } from '@/interfaces';
import { createSize, updateSize } from '@/actions';
import { useSizeStore } from '@/store';
import { Alert, SpinnerWithBg } from '@/components';
import { StepHeader } from '../StepHeader';
import { INITIAL_ALERT } from '@/constants';

interface Props {
  sizes: Size[];
  type: "new" | "edit";
}

export const SaveSize = ({ sizes, type }: Props) => {

  const router = useRouter();
  const { reset, size } = useSizeStore();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(INITIAL_ALERT);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      saveSizes();
    }
  }, [hasMounted]);

  const saveSizes = async () => {
    setLoading(true);

    // Execute the action according to the type
    const result = type === "new" 
      ? await createSize(sizes) 
      : await updateSize(sizes, size.id);
    setLoading(false); 
    setAlert(result);

    // Handle redirections and update state according to the result
    setTimeout(() => {
      if(!result.error) {
        router.replace("/dashboard/sizes");
        setTimeout(() => {
          reset();
        }, 100);
      }
    }, 3000);
  }

  return (
    <>
        <StepHeader title="Save size" description="Here we save the sizes you have created."/>
        
        {loading && (
          <SpinnerWithBg />
        )}

        {alert.message && (
          <Alert {...alert} />
        )}
    </>
  );
};