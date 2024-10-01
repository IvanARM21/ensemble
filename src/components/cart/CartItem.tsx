
import { CartActions } from './CartActions';
import { CartInfo } from './CartInfo';
import { calculateDiscount, currencyFormat} from '@/utils'
import { ProductCart } from '@/interfaces'


interface Props {
    item: ProductCart;
}

export const CartItem = ({item} : Props) => {
  return (
    <div className="flex gap-2 justify-between py-10 border-b first-of-type:border-t">
        <div className="flex gap-4">
            <CartInfo 
                item={item}
            />
        </div>
        <div className="flex flex-col justify-between items-end">
            <div className="flex flex-col-reverse sm:flex-row gap-5 items-end sm:items-start">
                <CartActions 
                    item={item}
                />
            </div>
            <p className="sm:text-xl text-gray-700"><span>{currencyFormat((item.price-calculateDiscount(item.price, 0))*item.quantity)}</span></p>
        </div>
        
    </div>
  )
}
