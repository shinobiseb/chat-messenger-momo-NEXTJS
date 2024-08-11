import { signInProps } from '@/types/types';
import GoogleIcon from '../public/GoogleIcon';

export default function Form( {setSignedIn, signInState} : signInProps ) {


  return (
    <div className="bg-orange w-11/12 h-60 rounded-xl flex flex-col justify-around items-center py-12 drop-shadow-md">
      <form className='flex flex-col h-2/3 justify-between' action="http://localhost:3000/api/users" method='post'>
        <input className='rounded-md' type="text" placeholder='User'/>
        <input className='rounded-md' type="text" placeholder='Password'/>
        <input type="submit" value="Create"/>
      </form>
    </div>
  );
}