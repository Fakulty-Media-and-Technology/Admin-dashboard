'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BarProps {
    transX: number;
}

const Bar: React.FC<BarProps> = ({ transX }) => {
    const BAR_WIDTH = 170;
    const [progress, setProgress] = useState(-BAR_WIDTH);

    useEffect(() => {
        // Update progress based on transX percentage
        setProgress(-BAR_WIDTH + (transX / 100) * BAR_WIDTH);
    }, [transX]);

    return (
        <div className="w-[170px] h-[5px] rounded bg-[#747474] overflow-hidden">
            {/* Animated Progress Bar */}
            <motion.div
                initial={{ translateX: -BAR_WIDTH }}
                animate={{ translateX: progress }}
                transition={{ duration: 1.5 }}
                className="h-1 w-[170px] bg-white rounded"
            />
        </div>
    );
};

export default Bar;