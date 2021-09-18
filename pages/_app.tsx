import { AppProps } from 'next/app';
import Image from 'next/image'
import * as React from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css'
import profilePic from '../public/Images/augurio.png'
import AppContext from '../context';


const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppContext>
      <div className="bg-green-100">
        <div className="py-4 w-5/6 bg-white mx-auto">
          <div className="w-full flex justify-center">
            <Image
              src={profilePic}
              alt="Augurio"
              className="object-center object-cover group-hover:opacity-75 rounded-full"
              width={100}
              height={100}
            />
          </div>
          <h1 className="text-center block uppercase my-4 text-2xl md:text-4xl">auguriosc</h1>
          <h2 className="text-center block text-gray-600 text-sm md:text-lg">Home & Garden Website</h2>
          <h3 className="text-center block text-gray-600 text-sm md:text-lg">Variedad de Articulos Plasticos y Fibra de Vidrio, Parrilleros, parrillas y más!</h3>
        </div>
        <Component {...pageProps} />
      </div>
    </AppContext>

  )
};

export default App;
