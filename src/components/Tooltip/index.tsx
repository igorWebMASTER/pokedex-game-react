import React from 'react';

import TooltipErrorImg from '../../assets/images/tooltipError.png';
import SearchTooltipImg from '../../assets/images/searchTooltip.png';
import SearchingTooltipImg from '../../assets/images/searchingTooltip.png';

import * as S from './styles'
import { motion } from 'framer-motion';


interface TooltipProps {
  type?: string;
  loading: boolean;
  status: string;
}

export function Tooltip({  loading, status }: TooltipProps) {
  if(loading) {
      return (
          <>
            <S.TooltipContainer status={status}>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <img src={SearchingTooltipImg} alt="" />
              </motion.div>
            </S.TooltipContainer>
      </>
      )
  }
 
 if(status === 'available') {
    return (
        <>
          <S.TooltipContainer>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
             <img src={SearchTooltipImg} alt="" />
            </motion.div>
          </S.TooltipContainer>
        </>
    )
 }

 if(status === 'out'){ 
   return(  <>
        <S.TooltipContainer>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
           <img src={TooltipErrorImg} alt="" />
         </motion.div>
       </S.TooltipContainer>
    </>)
  }

  return null;
}
