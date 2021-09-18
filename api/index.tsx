import axios from "axios";
import { Product } from "../types/Product";
import Papa from 'papaparse'


const list = async (): Promise<Product[]> => {
  return axios.get(
    process.env.NEXT_PUBLIC_SHEETS,
    { responseType: 'blob' }
  )
    .then(res => new Promise<Product[]>((resolve, reject) => Papa.parse(res.data, {
      header: true,
      complete: results => {
        const product = results.data as Product[]

        return resolve(product.map(item => ({
          ...item,
          price: Number(item.price),
          discount: Number(item.discount),
          stock: Number(item.stock),
          new_price: Number(item.new_price)
        })))
      },
      error: error => reject(error.message)
    })
    ))
};

module.exports = {
  list
};