import Image from 'next/image';
import { Shiba } from './components/shiba';
import Base from './components/base';
import MyThreeComponent from './components/ThreeScene';
export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-0'>
      <div className='h-screen w-screen'>
        {/* <MyThreeComponent /> */}
        <Base />
      </div>
    </main>
  );
}
