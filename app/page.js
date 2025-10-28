import Blogs from '@/app/components/Blogs'
import TypedJs from './components/TypedJs';

export default function Home() {

  return (
    <div className='padding-inLine px-4 lg:px-0 relative flex flex-col gap-16'>
      <div className='grid gap-2'>
          <h1 className='text-4xl md:text-6xl'>Stop guessing. Start fixing.</h1>
          <span className='text-2xl md:text-4xl h-15'><TypedJs/></span>
      </div>
      <div className="flex gap-8">
          <Blogs/>
      </div>
    </div>
  );
}
