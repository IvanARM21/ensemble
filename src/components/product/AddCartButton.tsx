import { useCartStore } from '@/store';
import { Product, ProductCart, Variant } from '@/interfaces';
import { toast } from 'react-toastify';

interface Props {
    setProductCart: React.Dispatch<React.SetStateAction<ProductCart>>
    sizesQuantity: number;
    productCart: ProductCart;
    variant: Variant;
    product: Product;
}

export const AddCartButton = ({sizesQuantity, productCart, variant, product} : Props) => {

  const addProduct = useCartStore(state => state.addProduct);

  const handleClick = () => {
    if(!(productCart.quantity > 0 && productCart.quantity <= sizesQuantity) || !variant || !product || !productCart.size) {
        toast.error("Could to add to cart, check if you have a size and quantity selected");
        return;
    }

    const productToStore = { 
      productId: product.id ?? "",
      variantId: productCart.variantId,
      slug: productCart.slug,
      name: product.name,
      price: variant.price,
      color: variant.color.label,
      image: variant.images[0].url,
      size: productCart.size,
      quantity: productCart.quantity,
      stock: productCart.stock
    } as ProductCart;

    addProduct(productToStore);
  }

  return (
    <>
        <div>

        <button
            type="button"
            className="btn-primary w-full flex justify-center items-center gap-3"
            onClick={handleClick}
            disabled={!(productCart.quantity > 0 && productCart.quantity <= sizesQuantity) || !productCart.size}
        >Add to cart</button>
        </div>
    </>
    
  )
}
