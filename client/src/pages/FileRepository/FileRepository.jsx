import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/DataTable";
import { getAllFiles } from '@/redux/slices/fileSlice';


const FileRepository = () => {
    const { user } = useSelector((store) => store.auth);
    const { files } = useSelector((store) => store.file);
    
    // const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
      // getData().then(setData);
      dispatch(getAllFiles());
    }, [dispatch]);

  return (
    <div className='min-h-screen flex-col bg-[#F4EFCA] flex items-center justify-center container mx-auto py-10'>
      <div className='text-center mb-4 w-full px-8'>
        <h1 className='text-2xl font-bold  text-left'>Welcome, {user.username}!</h1>
        {user.role === 'admin' && <p className='text-sm text-gray-600'>You have administrative access.</p>}
      </div>
      {console.log(files)}
      <DataTable columns={columns} data={files} />
    </div>
  )
}

export default FileRepository