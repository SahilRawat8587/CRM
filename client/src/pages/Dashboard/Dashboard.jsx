import { logout } from '@/redux/slices/authSlice';
import { formatDate } from '@/utils/constant';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='min-h-screen bg-[#F4EFCA] flex items-center justify-center'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className='max-w-lg w-full mx-auto mt-10 p-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-300'
            >
                <h2 className='text-3xl font-bold mb-6 text-center text-[#F66435]'>
                    Dashboard
                </h2>
                <div className='space-y-6'>
                    <motion.div
                        className='p-6 bg-[#F66435] bg-opacity-20 rounded-lg border border-gray-300'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className='text-xl font-semibold text-[#F66435] mb-3'>Profile Information</h3>
                        <p className='text-gray-800'><span className='font-bold'>Name:</span> {user.username}</p>
                        <p className='text-gray-800'><span className='font-bold'>Email:</span> {user.email}</p>
                    </motion.div>
                    <motion.div
                        className='p-6 bg-[#F66435] bg-opacity-20 rounded-lg border border-gray-300'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className='text-xl font-semibold text-[#F66435] mb-3'>Account Activity</h3>
                        <p className='text-gray-800'>
                            <span className='font-bold'>Joined:</span> {new Date(user.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                        <p className='text-gray-800'>
                            <span className='font-bold'>Last Login:</span> {formatDate(user.updatedAt)}
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className='mt-6'
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className='w-full py-3 px-4 bg-[#F66435] text-white font-bold rounded-lg shadow-lg hover:bg-[#e55b2e] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#F66435] focus:ring-offset-2 focus:ring-offset-[#F4EFCA]'
                    >
                        Logout
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
