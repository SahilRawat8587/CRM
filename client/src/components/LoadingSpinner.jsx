import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className='min-h-screen bg-gradient-to-r from-[#F66435] to-[#FFFFFF] flex items-center justify-center relative overflow-hidden'>
            {/* Enhanced Loading Spinner */}
            <motion.div
                className='w-16 h-16 border-4 border-t-4 border-t-[#F66435] border-[#F66435]/25 rounded-full'
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default LoadingSpinner;