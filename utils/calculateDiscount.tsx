export const calculateDiscount = (price: number, discount: number, new_price: number): Boolean => {
  let result: Boolean

  if(price === new_price){
    result = false;
  }

  if(new_price > price) {
    result = false;
  }

  if(new_price < price && discount > 0){
    result = true
  }

  return result;
}
